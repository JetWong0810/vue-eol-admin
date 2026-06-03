<script lang="ts" setup>
import { ref } from 'vue';

import {
  ElAlert,
  ElButton,
  ElCard,
  ElCol,
  ElDivider,
  ElMessage,
  ElRow,
  ElTag,
} from 'element-plus';

import { requestClient } from '#/api/request';

const loading = ref(false);
const responseData = ref<any>(null);

async function testRequest() {
  loading.value = true;
  try {
    const data = await requestClient.get('/user/info');
    responseData.value = data;
    ElMessage.success('请求成功');
  } catch (error: any) {
    responseData.value = { error: error?.message || error };
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="p-5">
    <h2 class="mb-5 text-xl font-semibold">HTTP 请求指南</h2>

    <ElAlert
      :closable="false"
      class="mb-4"
      title="请求架构"
      type="info"
      description="项目基于 Axios 封装了 RequestClient，提供统一的拦截器、错误处理、Token 刷新等能力。业务代码只需导入 requestClient 即可发起请求。"
    />

    <!-- 架构图 -->
    <ElCard class="mb-4" header="请求流程">
      <pre class="code-block"><code>
┌──────────────────────────────────────────────────────────────┐
│  请求流程                                                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  业务代码 → requestClient.get/post()                         │
│      ↓                                                       │
│  请求拦截器: 自动注入 Authorization 头 + Accept-Language      │
│      ↓                                                       │
│  Axios 发出 HTTP 请求                                        │
│      ↓                                                       │
│  响应拦截器(按顺序):                                          │
│    1. defaultResponseInterceptor: 解析响应体，提取 data 字段   │
│    2. authenticateResponseInterceptor: 401时自动刷新Token      │
│    3. errorMessageResponseInterceptor: 错误提示(ElMessage)     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
      </code></pre>
    </ElCard>

    <ElRow :gutter="16">
      <ElCol :span="12">
        <ElCard class="mb-4" header="Step 1: 定义 API 接口">
          <pre class="code-block"><code>// 文件位置: src/api/system/user.ts
import { requestClient } from '#/api/request';

// 定义接口类型
export interface UserInfo {
  id: number;
  username: string;
  realName: string;
  roles: string[];
}

export interface UserListParams {
  page: number;
  pageSize: number;
  keyword?: string;
}

export interface PageResult&lt;T&gt; {
  list: T[];
  total: number;
}

/** 获取用户列表 */
export function getUserListApi(params: UserListParams) {
  return requestClient.get&lt;PageResult&lt;UserInfo&gt;&gt;(
    '/system/user/list',
    { params },
  );
}

/** 创建用户 */
export function createUserApi(data: Partial&lt;UserInfo&gt;) {
  return requestClient.post('/system/user', data);
}

/** 更新用户 */
export function updateUserApi(id: number, data: Partial&lt;UserInfo&gt;) {
  return requestClient.put(\`/system/user/\${id}\`, data);
}

/** 删除用户 */
export function deleteUserApi(id: number) {
  return requestClient.delete(\`/system/user/\${id}\`);
}</code></pre>
        </ElCard>
      </ElCol>

      <ElCol :span="12">
        <ElCard class="mb-4" header="Step 2: 在页面中使用">
          <pre class="code-block"><code>&lt;script setup&gt;
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import {
  getUserListApi,
  deleteUserApi,
} from '#/api/system/user';

const loading = ref(false);
const userList = ref([]);
const total = ref(0);

async function loadUsers() {
  loading.value = true;
  try {
    const res = await getUserListApi({
      page: 1,
      pageSize: 10,
    });
    userList.value = res.list;
    total.value = res.total;
  } catch (error) {
    // 错误已被全局拦截器处理(ElMessage提示)
    // 这里可以做额外逻辑，如重置状态
    console.error('加载失败:', error);
  } finally {
    loading.value = false;
  }
}

async function handleDelete(id: number) {
  try {
    await deleteUserApi(id);
    ElMessage.success('删除成功');
    loadUsers(); // 刷新列表
  } catch {
    // 错误提示已由全局处理
  }
}

onMounted(() => loadUsers());
&lt;/script&gt;</code></pre>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElDivider content-position="left">请求配置详解</ElDivider>

    <ElCard class="mb-4" header="requestClient 配置 (src/api/request.ts)">
      <pre class="code-block"><code>import { RequestClient } from '@vben/request';

// 创建请求实例
const client = new RequestClient({
  baseURL: apiURL,          // 从环境变量获取, 如 /api
  timeout: 10000,           // 超时时间 10s
  responseReturn: 'data',   // 响应返回模式(见下方说明)
});

// 响应返回模式:
// 'raw'  → 返回完整 AxiosResponse (含 headers, status 等)
// 'body' → 返回响应体 { code, data, message }
// 'data' → 直接返回 data 字段 (推荐，最简洁)</code></pre>

      <ElAlert
        :closable="false"
        class="mt-3"
        type="warning"
        title="responseReturn 模式区别"
      >
        <template #default>
          <p>
            <ElTag size="small">raw</ElTag> 适合需要读取响应头的场景（如文件下载）
          </p>
          <p>
            <ElTag size="small">body</ElTag> 适合需要自行判断 code 的场景
          </p>
          <p>
            <ElTag size="small">data</ElTag>
            推荐使用，自动校验 code===0，直接返回业务数据
          </p>
        </template>
      </ElAlert>
    </ElCard>

    <ElCard class="mb-4" header="错误处理机制">
      <div class="space-y-3">
        <div>
          <h4 class="font-bold">全局错误处理（已内置，无需额外编写）</h4>
          <pre class="mt-2 code-block"><code>// 已在 src/api/request.ts 中配置:
client.addResponseInterceptor(
  errorMessageResponseInterceptor((msg, error) => {
    const responseData = error?.response?.data ?? {};
    const errorMessage = responseData?.error
      ?? responseData?.message ?? '';
    ElMessage.error(errorMessage || msg);
  }),
);

// 错误码对应提示(内置):
// 400 → 请求错误
// 401 → 未授权(自动跳转登录/刷新Token)
// 403 → 拒绝访问
// 404 → 请求地址不存在
// 500 → 服务器内部错误
// 503 → 服务不可用</code></pre>
        </div>

        <div>
          <h4 class="font-bold">Token 自动刷新</h4>
          <pre class="mt-2 code-block"><code>// 当接口返回 401 时:
// 1. 自动调用 /auth/refresh 刷新 token
// 2. 用新 token 重新发起之前失败的请求
// 3. 刷新失败 → 清除 token → 跳转登录页

// 配置项:
// preferences.app.enableRefreshToken = true  (默认开启)
// preferences.app.loginExpiredMode = 'modal' (弹窗重登)
//                                  = 'page'  (跳转登录页)</code></pre>
        </div>

        <div>
          <h4 class="font-bold">业务层错误处理（按需）</h4>
          <pre class="mt-2 code-block"><code>// 方式1: try-catch 捕获
try {
  const data = await createUserApi(formData);
  ElMessage.success('创建成功');
} catch (error: any) {
  // 全局拦截器已经 ElMessage.error 了
  // 这里做额外逻辑即可
  if (error?.code === 10001) {
    // 特定业务错误码处理
  }
}

// 方式2: 不处理，让全局拦截器自动弹提示
await deleteUserApi(id); // 失败自动弹 ElMessage.error</code></pre>
        </div>
      </div>
    </ElCard>

    <ElCard class="mb-4" header="文件上传/下载">
      <pre class="code-block"><code>import { requestClient } from '#/api/request';

// 文件上传
async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return requestClient.upload('/upload', { data: formData });
}

// 文件下载
async function downloadFile(id: number) {
  return requestClient.download(\`/file/download/\${id}\`, {
    fileName: 'export.xlsx',
  });
}</code></pre>
    </ElCard>

    <ElDivider content-position="left">Mock 接口服务</ElDivider>

    <ElCard class="mb-4" header="Mock 机制说明">
      <ElAlert
        :closable="false"
        class="mb-3"
        type="info"
        title="项目使用 Nitro (h3) 作为本地 Mock 服务，位于 apps/backend-mock/ 目录。开发环境下设置 VITE_NITRO_MOCK=true 会自动启动 Mock 服务，前端请求 /api/* 会被代理到 Mock 服务。"
      />
      <pre v-pre class="code-block"><code>
┌────────────────────────────────────────────────────────────┐
│  Mock 工作流程                                              │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  前端请求 /api/user/info                                   │
│      ↓                                                     │
│  Vite dev server 代理 (vite.config.ts proxy)               │
│      ↓                                                     │
│  apps/backend-mock/ Nitro 服务                             │
│      ↓                                                     │
│  匹配文件: api/user/info.ts → 返回模拟数据                  │
│                                                            │
│  关闭 Mock: .env.development 中设置 VITE_NITRO_MOCK=false  │
│  然后修改 VITE_GLOB_API_URL 为真实后端地址                   │
│                                                            │
└────────────────────────────────────────────────────────────┘
      </code></pre>
    </ElCard>

    <ElCard class="mb-4" header="Mock 目录结构">
      <pre v-pre class="code-block"><code>apps/backend-mock/
├── api/                        # 接口文件 (路径即路由)
│   ├── auth/
│   │   ├── login.post.ts       # POST /api/auth/login
│   │   ├── logout.post.ts      # POST /api/auth/logout
│   │   ├── refresh.post.ts     # POST /api/auth/refresh
│   │   └── codes.ts            # GET  /api/auth/codes
│   ├── user/
│   │   └── info.ts             # GET  /api/user/info
│   ├── menu/
│   │   └── all.ts              # GET  /api/menu/all
│   ├── table/
│   │   └── list.ts             # GET  /api/table/list
│   └── system/
│       ├── user/list.ts        # GET  /api/system/user/list
│       └── dept/list.ts        # GET  /api/system/dept/list
├── middleware/
│   └── 1.api.ts                # 全局中间件 (Token 校验)
├── utils/
│   ├── response.ts             # 响应工具 (useResponseSuccess 等)
│   ├── mock-data.ts            # 模拟用户数据
│   ├── jwt-utils.ts            # JWT Token 生成/验证
│   └── cookie-utils.ts         # Cookie 操作
└── nitro.config.ts             # Nitro 配置 (CORS 等)</code></pre>
    </ElCard>

    <ElCard class="mb-4" header="新增一个 Mock 接口 (示例)">
      <div class="space-y-4">
        <div>
          <h4 class="font-bold">
            步骤1: 创建接口文件
            <ElTag class="ml-2" size="small" type="info">
              文件路径 = 接口路径
            </ElTag>
          </h4>
          <pre v-pre class="mt-2 code-block"><code>// apps/backend-mock/api/order/list.ts
// 文件路径 api/order/list.ts → 接口地址 GET /api/order/list

import { eventHandler, getQuery } from 'h3';
import { verifyAccessToken } from '~/utils/jwt-utils';
import {
  unAuthorizedResponse,
  usePageResponseSuccess,
} from '~/utils/response';

// 模拟数据
const mockOrders = [
  { id: 1, orderNo: 'ORD-2024001', status: 'pending', amount: 299.00, createdAt: '2024-03-01' },
  { id: 2, orderNo: 'ORD-2024002', status: 'shipped', amount: 599.00, createdAt: '2024-03-02' },
  { id: 3, orderNo: 'ORD-2024003', status: 'completed', amount: 199.00, createdAt: '2024-03-03' },
  // ...更多数据
];

export default eventHandler(async (event) => {
  // 验证 Token (需要登录才能访问的接口)
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  // 获取查询参数
  const { page, pageSize } = getQuery(event);

  // 返回分页数据
  return usePageResponseSuccess(page ?? '1', pageSize ?? '10', mockOrders);
});</code></pre>
        </div>

        <div>
          <h4 class="font-bold">步骤2: POST 接口写法 (文件名加 .post 后缀)</h4>
          <pre v-pre class="mt-2 code-block"><code>// apps/backend-mock/api/order/create.post.ts
// 文件名 create.post.ts → POST /api/order/create

import { defineEventHandler, readBody } from 'h3';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse, useResponseSuccess } from '~/utils/response';

export default defineEventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  // 读取请求体
  const body = await readBody(event);
  console.log('创建订单:', body);

  // 返回成功
  return useResponseSuccess({ id: Date.now(), ...body });
});</code></pre>
        </div>

        <div>
          <h4 class="font-bold">步骤3: 动态路由参数</h4>
          <pre v-pre class="mt-2 code-block"><code>// apps/backend-mock/api/order/[id].ts
// [id] 为动态参数 → GET /api/order/123

import { defineEventHandler, getRouterParam } from 'h3';
import { useResponseSuccess } from '~/utils/response';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  return useResponseSuccess({ id, orderNo: `ORD-${id}`, status: 'pending' });
});

// apps/backend-mock/api/order/[id].delete.ts
// → DELETE /api/order/123</code></pre>
        </div>
      </div>
    </ElCard>

    <ElCard class="mb-4" header="Mock 响应工具函数">
      <pre v-pre class="code-block"><code>// apps/backend-mock/utils/response.ts 提供以下工具:

// 成功响应 → { code: 0, data: T, message: 'ok' }
useResponseSuccess(data)

// 分页成功响应 → { code: 0, data: { items: T[], total: number }, message: 'ok' }
usePageResponseSuccess(page, pageSize, list)

// 错误响应 → { code: -1, data: null, message: string }
useResponseError(message)

// 403 响应
forbiddenResponse(event, message)

// 401 响应
unAuthorizedResponse(event)</code></pre>
    </ElCard>

    <ElCard class="mb-4" header="文件命名与 HTTP 方法对应">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b">
            <th class="p-2 text-left">文件名</th>
            <th class="p-2 text-left">HTTP 方法</th>
            <th class="p-2 text-left">接口路径</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="p-2"><code>api/order/list.ts</code></td>
            <td class="p-2">GET</td>
            <td class="p-2">/api/order/list</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>api/order/create.post.ts</code></td>
            <td class="p-2">POST</td>
            <td class="p-2">/api/order/create</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>api/order/[id].put.ts</code></td>
            <td class="p-2">PUT</td>
            <td class="p-2">/api/order/:id</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>api/order/[id].delete.ts</code></td>
            <td class="p-2">DELETE</td>
            <td class="p-2">/api/order/:id</td>
          </tr>
          <tr>
            <td class="p-2"><code>api/order/[id].ts</code></td>
            <td class="p-2">GET</td>
            <td class="p-2">/api/order/:id</td>
          </tr>
        </tbody>
      </table>
    </ElCard>

    <ElCard class="mb-4" header="切换为真实后端接口">
      <pre v-pre class="code-block"><code># .env.development

# 关闭 Mock 服务
VITE_NITRO_MOCK=false

# 修改接口地址为真实后端
VITE_GLOB_API_URL=http://your-backend:8080/api</code></pre>
      <ElAlert
        :closable="false"
        class="mt-3"
        type="warning"
        title="切换后端地址后重启 dev 服务生效。开发阶段建议先用 Mock 联调页面，后端接口就绪后再切换。"
      />
    </ElCard>

    <ElDivider content-position="left">实时测试</ElDivider>

    <ElCard header="测试请求">
      <ElButton :loading="loading" type="primary" @click="testRequest">
        发起 GET /user/info 请求
      </ElButton>
      <div v-if="responseData" class="mt-3">
        <p class="mb-1 font-bold">响应结果:</p>
        <pre class="code-block"><code>{{ JSON.stringify(responseData, null, 2) }}</code></pre>
      </div>
    </ElCard>
  </div>
</template>

<style scoped>
.code-block {
  overflow: auto;
  border-radius: 6px;
  border: 1px solid var(--el-border-color-lighter);
  background-color: var(--el-fill-color-lighter);
  padding: 12px 16px;
  font-size: 13px;
  line-height: 1.6;
}
</style>
