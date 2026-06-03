<script lang="ts" setup>
import { ElAlert, ElCard, ElDivider, ElTag } from 'element-plus';
</script>

<template>
  <div class="p-5">
    <h2 class="mb-5 text-xl font-semibold">项目规范</h2>

    <ElAlert
      :closable="false"
      class="mb-4"
      title="本页面说明项目的目录规范、命名约定、代码风格等，帮助团队保持一致的开发风格"
      type="info"
    />

    <!-- 目录结构 -->
    <ElCard class="mb-4" header="目录结构规范 (apps/web-ele/src/)">
      <pre class="code-block"><code>src/
├── adapter/              # UI组件适配层 (表单/表格组件注册)
├── api/                  # 接口定义目录
│   ├── request.ts        # 请求实例配置 (拦截器/错误处理)
│   ├── core/             # 核心接口 (登录/用户/菜单)
│   └── system/           # 业务模块接口 (按模块分文件夹)
│       ├── user.ts
│       └── role.ts
├── layouts/              # 布局相关
├── locales/              # 国际化语言包
│   └── langs/
│       ├── zh-CN/        # 中文
│       └── en-US/        # 英文
├── router/               # 路由配置
│   ├── access.ts         # 权限路由生成
│   ├── guard.ts          # 路由守卫
│   └── routes/
│       └── modules/      # 路由模块 (自动扫描加载)
│           ├── dashboard.ts
│           └── system.ts
├── store/                # Pinia 状态管理
├── views/                # 页面组件
│   ├── _core/            # 核心页面 (登录/404/403)
│   ├── guide/            # 开发指南页
│   └── system/           # 业务模块页面
│       ├── user/
│       │   ├── index.vue     # 列表页
│       │   └── detail.vue    # 详情页
│       └── role/
│           └── index.vue
└── preferences.ts        # 应用偏好设置覆盖</code></pre>
    </ElCard>

    <!-- 命名规范 -->
    <ElCard class="mb-4" header="命名规范">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b">
            <th class="p-2 text-left">类型</th>
            <th class="p-2 text-left">规范</th>
            <th class="p-2 text-left">示例</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="p-2">文件夹</td>
            <td class="p-2">kebab-case (短横线)</td>
            <td class="p-2"><code>user-manage/</code></td>
          </tr>
          <tr class="border-b">
            <td class="p-2">Vue 组件文件</td>
            <td class="p-2">kebab-case 或 index.vue</td>
            <td class="p-2"><code>user-list.vue</code> 或 <code>index.vue</code></td>
          </tr>
          <tr class="border-b">
            <td class="p-2">TS/JS 文件</td>
            <td class="p-2">kebab-case</td>
            <td class="p-2"><code>use-pagination.ts</code></td>
          </tr>
          <tr class="border-b">
            <td class="p-2">路由 name</td>
            <td class="p-2">PascalCase (大驼峰)</td>
            <td class="p-2"><code>UserManage</code></td>
          </tr>
          <tr class="border-b">
            <td class="p-2">路由 path</td>
            <td class="p-2">kebab-case</td>
            <td class="p-2"><code>/system/user-manage</code></td>
          </tr>
          <tr class="border-b">
            <td class="p-2">组件名 (defineOptions)</td>
            <td class="p-2">PascalCase</td>
            <td class="p-2"><code>UserListPage</code></td>
          </tr>
          <tr class="border-b">
            <td class="p-2">API 函数</td>
            <td class="p-2">camelCase + Api 后缀</td>
            <td class="p-2"><code>getUserListApi</code></td>
          </tr>
          <tr class="border-b">
            <td class="p-2">Composable</td>
            <td class="p-2">use 前缀 + camelCase</td>
            <td class="p-2"><code>usePagination</code></td>
          </tr>
          <tr>
            <td class="p-2">常量</td>
            <td class="p-2">UPPER_SNAKE_CASE</td>
            <td class="p-2"><code>MAX_PAGE_SIZE</code></td>
          </tr>
        </tbody>
      </table>
    </ElCard>

    <ElDivider content-position="left">新增业务模块标准流程</ElDivider>

    <!-- 新增模块流程 -->
    <ElCard class="mb-4" header="新增一个业务模块的完整流程 (以「订单管理」为例)">
      <div class="space-y-4">
        <div>
          <h4 class="font-bold">Step 1: 定义接口 (src/api/order/)</h4>
          <pre class="code-block mt-2"><code>// src/api/order/index.ts
import { requestClient } from '#/api/request';

export interface OrderInfo {
  id: number;
  orderNo: string;
  status: 'cancelled' | 'completed' | 'pending' | 'shipped';
  amount: number;
  createdAt: string;
}

export interface OrderListParams {
  page: number;
  pageSize: number;
  status?: string;
  keyword?: string;
}

export function getOrderListApi(params: OrderListParams) {
  return requestClient.get('/order/list', { params });
}

export function getOrderDetailApi(id: number) {
  return requestClient.get&lt;OrderInfo&gt;(\`/order/\${id}\`);
}

export function updateOrderStatusApi(id: number, status: string) {
  return requestClient.put(\`/order/\${id}/status\`, { status });
}</code></pre>
        </div>

        <div>
          <h4 class="font-bold">Step 2: 创建页面 (src/views/order/)</h4>
          <!-- v-pre prevents Vue from parsing {{ }} inside code examples -->
          <pre v-pre class="code-block mt-2"><code>&lt;!-- src/views/order/index.vue --&gt;
&lt;script lang="ts" setup&gt;
import { ref, onMounted } from 'vue';
import {
  ElButton,
  ElCard,
  ElMessage,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';
import { getOrderListApi, updateOrderStatusApi } from '#/api/order';

const loading = ref(false);
const orderList = ref([]);

async function loadOrders() {
  loading.value = true;
  try {
    const res = await getOrderListApi({ page: 1, pageSize: 20 });
    orderList.value = res.list;
  } finally {
    loading.value = false;
  }
}

async function handleShip(id: number) {
  await updateOrderStatusApi(id, 'shipped');
  ElMessage.success('发货成功');
  loadOrders();
}

onMounted(() =&gt; loadOrders());
&lt;/script&gt;

&lt;template&gt;
  &lt;div class="p-4"&gt;
    &lt;ElCard&gt;
      &lt;ElTable v-loading="loading" :data="orderList"&gt;
        &lt;ElTableColumn prop="orderNo" label="订单号" /&gt;
        &lt;ElTableColumn prop="amount" label="金额" /&gt;
        &lt;ElTableColumn prop="status" label="状态"&gt;
          &lt;template #default="scope"&gt;
            &lt;ElTag&gt;{{ scope.row.status }}&lt;/ElTag&gt;
          &lt;/template&gt;
        &lt;/ElTableColumn&gt;
        &lt;ElTableColumn label="操作"&gt;
          &lt;template #default="scope"&gt;
            &lt;ElButton size="small" @click="handleShip(scope.row.id)"&gt;
              发货
            &lt;/ElButton&gt;
          &lt;/template&gt;
        &lt;/ElTableColumn&gt;
      &lt;/ElTable&gt;
    &lt;/ElCard&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
        </div>

        <div>
          <h4 class="font-bold">Step 3: 配置路由 (src/router/routes/modules/order.ts)</h4>
          <pre class="code-block mt-2"><code>import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:shopping-cart',
      order: 20,
      title: '订单管理',
    },
    name: 'Order',
    path: '/order',
    children: [
      {
        name: 'OrderList',
        path: '/order/list',
        component: () => import('#/views/order/index.vue'),
        meta: {
          icon: 'lucide:list',
          title: '订单列表',
        },
      },
      {
        name: 'OrderDetail',
        path: '/order/detail/:id',
        component: () => import('#/views/order/detail.vue'),
        meta: {
          hideInMenu: true,
          title: '订单详情',
          activePath: '/order/list',
        },
      },
    ],
  },
];

export default routes;</code></pre>
        </div>

        <div>
          <ElAlert
            :closable="false"
            type="success"
            title="完成！保存文件后菜单栏自动出现「订单管理」，无需任何额外注册步骤。"
          />
        </div>
      </div>
    </ElCard>

    <ElDivider content-position="left">Git 提交规范</ElDivider>

    <ElCard class="mb-4" header="Commit 消息规范 (Conventional Commits)">
      <pre class="code-block"><code># 格式
&lt;type&gt;(&lt;scope&gt;): &lt;subject&gt;

# 常用 type
feat:     新功能
fix:      修复 bug
docs:     文档变更
style:    代码格式 (不影响逻辑)
refactor: 重构 (非新功能、非修复)
perf:     性能优化
test:     添加测试
chore:    构建过程或辅助工具变动

# 示例
feat(order): 添加订单列表页面
fix(auth): 修复 token 刷新后重复请求问题
refactor(api): 统一接口返回类型定义</code></pre>

      <ElAlert
        :closable="false"
        class="mt-3"
        type="info"
        title="使用 pnpm commit 命令可交互式生成规范的 commit 消息 (基于 czg 工具)"
      />
    </ElCard>

    <ElDivider content-position="left">代码风格</ElDivider>

    <ElCard class="mb-4" header="Vue 组件编写规范">
      <pre class="code-block"><code>&lt;!-- 推荐的组件结构 --&gt;
&lt;script lang="ts" setup&gt;
// 1. 类型导入
import type { UserInfo } from '#/api/system/user';

// 2. Vue/第三方库导入
import { computed, onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';

// 3. 内部模块导入
import { getUserListApi } from '#/api/system/user';

// 4. Props/Emits 定义
interface Props {
  userId?: number;
}
const props = withDefaults(defineProps&lt;Props&gt;(), {
  userId: 0,
});
const emit = defineEmits&lt;{
  success: [];
}&gt;();

// 5. 响应式数据
const loading = ref(false);
const dataList = ref&lt;UserInfo[]&gt;([]);

// 6. 计算属性
const isEmpty = computed(() =&gt; dataList.value.length === 0);

// 7. 方法
async function loadData() {
  loading.value = true;
  try {
    dataList.value = await getUserListApi({ page: 1, pageSize: 10 });
  } finally {
    loading.value = false;
  }
}

// 8. 生命周期
onMounted(() =&gt; loadData());
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- 模板内容 --&gt;
&lt;/template&gt;</code></pre>
    </ElCard>

    <ElCard class="mb-4" header="Import 路径别名">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b">
            <th class="p-2 text-left">别名</th>
            <th class="p-2 text-left">实际路径</th>
            <th class="p-2 text-left">用途</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="p-2"><code>#/</code></td>
            <td class="p-2">apps/web-ele/src/</td>
            <td class="p-2">当前应用内部引用</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>@vben/</code></td>
            <td class="p-2">packages/ 下的各个包</td>
            <td class="p-2">框架提供的公共能力</td>
          </tr>
          <tr>
            <td class="p-2"><code>@vben-core/</code></td>
            <td class="p-2">packages/@core/ 下的包</td>
            <td class="p-2">核心底层能力</td>
          </tr>
        </tbody>
      </table>
      <pre class="mt-3 code-block"><code>// 正确
import { getUserListApi } from '#/api/system/user';
import { useAccess } from '@vben/access';
import { requestClient } from '#/api/request';

// 错误 (不要用相对路径跨层级引用)
import { getUserListApi } from '../../../api/system/user';</code></pre>
    </ElCard>

    <ElCard header="样式编写规范">
      <div class="space-y-3">
        <div>
          <h4 class="font-bold">优先使用 Tailwind CSS</h4>
          <pre class="code-block mt-2"><code>&lt;!-- 推荐: Tailwind CSS 工具类 --&gt;
&lt;div class="flex items-center gap-2 rounded-lg bg-white p-4 shadow"&gt;
  &lt;span class="text-lg font-bold text-gray-800"&gt;标题&lt;/span&gt;
&lt;/div&gt;

&lt;!-- 需要复杂样式时使用 scoped style --&gt;
&lt;style scoped&gt;
.custom-chart {
  /* 只在 Tailwind 无法满足时使用 */
}
&lt;/style&gt;</code></pre>
        </div>

        <div>
          <h4 class="font-bold">Element Plus 组件样式覆盖</h4>
          <pre class="code-block mt-2"><code>&lt;!-- 使用 :deep() 穿透 scoped 样式 --&gt;
&lt;style scoped&gt;
:deep(.el-table__header) {
  background-color: #f5f7fa;
}
&lt;/style&gt;</code></pre>
        </div>
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
