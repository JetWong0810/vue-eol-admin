<script lang="ts" setup>
import { computed } from 'vue';

import { useAccess } from '@vben/access';

import {
  ElAlert,
  ElButton,
  ElCard,
  ElCol,
  ElDivider,
  ElRow,
  ElTag,
} from 'element-plus';

const { accessMode, hasAccessByCodes, hasAccessByRoles } = useAccess();

const hasAdminRole = computed(() => hasAccessByRoles(['admin']));
const hasUserCode = computed(() => hasAccessByCodes(['USER:READ']));
</script>

<template>
  <div class="p-5">
    <h2 class="mb-5 text-xl font-semibold">权限控制指南</h2>

    <ElAlert
      :closable="false"
      class="mb-4"
      title="权限模式"
      type="info"
    >
      <template #default>
        <p>
          当前权限模式:
          <ElTag type="success">{{ accessMode }}</ElTag>
        </p>
        <p class="mt-1">
          支持三种模式: <strong>frontend</strong>(前端角色控制) /
          <strong>backend</strong>(后端菜单控制) /
          <strong>mixed</strong>(混合模式)
        </p>
      </template>
    </ElAlert>

    <!-- 权限架构说明 -->
    <ElCard class="mb-4" header="权限架构概览">
      <pre class="code-block"><code>
┌─────────────────────────────────────────────────────────┐
│  权限控制流程                                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. 用户登录 → 获取 accessToken                         │
│  2. 路由守卫拦截 → 检查 token 是否存在                   │
│  3. 获取用户信息(角色roles) + 权限码(accessCodes)         │
│  4. 根据权限模式生成可访问路由和菜单                      │
│                                                         │
│  前端模式: route.meta.authority 匹配用户 roles           │
│  后端模式: 调用 /menu/all 接口获取路由表                  │
│  混合模式: 前后端路由合并                                │
│                                                         │
└─────────────────────────────────────────────────────────┘
      </code></pre>
    </ElCard>

    <ElRow :gutter="16">
      <ElCol :span="12">
        <ElCard class="mb-4" header="方式一: 路由级权限 (meta.authority)">
          <p class="mb-2 text-[var(--el-text-color-secondary)]">
            在路由 meta 中配置 authority 字段，只有拥有对应角色的用户才能看到该菜单
          </p>
          <pre class="code-block"><code>// 前端权限模式下，限制角色访问
{
  name: 'AdminPage',
  path: '/admin/settings',
  component: () => import('#/views/admin/settings.vue'),
  meta: {
    title: '系统设置',
    // 只有 admin 和 super 角色可见
    authority: ['admin', 'super'],
  },
}

// 没有 authority 字段的路由 → 所有登录用户可见</code></pre>
        </ElCard>
      </ElCol>

      <ElCol :span="12">
        <ElCard class="mb-4" header="方式二: 后端菜单接口">
          <p class="mb-2 text-[var(--el-text-color-secondary)]">
            后端模式下，菜单完全由接口返回，前端无需配置 authority
          </p>
          <pre class="code-block"><code>// 后端返回的菜单数据格式:
[
  {
    "name": "System",
    "path": "/system",
    "meta": {
      "title": "系统管理",
      "icon": "lucide:settings"
    },
    "children": [
      {
        "name": "UserManage",
        "path": "/system/user",
        // component 对应 views 下的文件路径
        "component": "/system/user/index",
        "meta": { "title": "用户管理" }
      }
    ]
  }
]

// 接口地址: GET /menu/all
// 文件位置: src/api/core/menu.ts</code></pre>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElDivider content-position="left">按钮级权限控制</ElDivider>

    <!-- 按钮级权限 -->
    <ElCard class="mb-4" header="方式一: v-access 指令">
      <p class="mb-3 text-[var(--el-text-color-secondary)]">
        使用 v-access 指令控制元素显示/隐藏，元素会被直接从 DOM 中移除
      </p>
      <pre class="code-block"><code>&lt;!-- 基于角色控制: 只有 admin 角色可见 --&gt;
&lt;ElButton v-access:role="['admin']"&gt;删除用户&lt;/ElButton&gt;

&lt;!-- 基于权限码控制: 需要 USER:DELETE 权限码 --&gt;
&lt;ElButton v-access:code="['USER:DELETE']"&gt;删除用户&lt;/ElButton&gt;

&lt;!-- 多个权限码(满足任意一个即可) --&gt;
&lt;ElButton v-access:code="['USER:DELETE', 'ADMIN:ALL']"&gt;
  删除用户
&lt;/ElButton&gt;</code></pre>

      <ElDivider />
      <p class="font-bold">实时演示 (使用 v-if + hasAccessByRoles 等效展示):</p>
      <div class="mt-2 space-x-2">
        <ElButton v-if="hasAdminRole" type="danger">
          管理员可见按钮(admin角色)
        </ElButton>
        <ElButton v-if="hasAccessByRoles(['user'])" type="primary">
          普通用户可见按钮(user角色)
        </ElButton>
        <ElTag>当前角色是否包含admin: {{ hasAdminRole }}</ElTag>
      </div>
    </ElCard>

    <ElCard class="mb-4" header="方式二: AccessControl 组件">
      <p class="mb-3 text-[var(--el-text-color-secondary)]">
        使用组件包裹需要权限控制的内容，更灵活
      </p>
      <pre class="code-block"><code>&lt;script setup&gt;
import { AccessControl } from '@vben/access';
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- 基于角色 --&gt;
  &lt;AccessControl :codes="['admin']" type="role"&gt;
    &lt;ElButton type="danger"&gt;仅管理员可见&lt;/ElButton&gt;
  &lt;/AccessControl&gt;

  &lt;!-- 基于权限码 --&gt;
  &lt;AccessControl :codes="['USER:CREATE']" type="code"&gt;
    &lt;ElButton type="primary"&gt;新增用户&lt;/ElButton&gt;
  &lt;/AccessControl&gt;
&lt;/template&gt;</code></pre>
    </ElCard>

    <ElCard class="mb-4" header="方式三: useAccess 组合函数">
      <p class="mb-3 text-[var(--el-text-color-secondary)]">
        在 JS/TS 逻辑中判断权限，适合条件渲染或流程控制
      </p>
      <pre class="code-block"><code>&lt;script setup&gt;
import { useAccess } from '@vben/access';

const { hasAccessByRoles, hasAccessByCodes } = useAccess();

// 判断角色
const canDelete = hasAccessByRoles(['admin', 'super']);

// 判断权限码
const canExport = hasAccessByCodes(['DATA:EXPORT']);
&lt;/script&gt;

&lt;template&gt;
  &lt;ElButton v-if="canDelete" type="danger"&gt;删除&lt;/ElButton&gt;
  &lt;ElButton v-if="canExport"&gt;导出数据&lt;/ElButton&gt;
&lt;/template&gt;</code></pre>

      <ElDivider />
      <p class="font-bold">实时演示:</p>
      <div class="mt-2">
        <p>
          hasAccessByRoles(['admin']): <ElTag>{{ hasAdminRole }}</ElTag>
        </p>
        <p class="mt-1">
          hasAccessByCodes(['USER:READ']): <ElTag>{{ hasUserCode }}</ElTag>
        </p>
      </div>
    </ElCard>

    <ElCard header="权限码的获取与存储">
      <pre class="code-block"><code>// 1. 登录成功后获取权限码 (src/store/auth.ts)
const { accessToken } = await loginApi(params);
const [userInfo, accessCodes] = await Promise.all([
  fetchUserInfo(),
  getAccessCodesApi(),  // GET /auth/codes → ['USER:READ', 'USER:CREATE', ...]
]);
accessStore.setAccessCodes(accessCodes);

// 2. 权限码存储在 accessStore 中，持久化到 localStorage
// 3. v-access 指令和 useAccess() 都从 accessStore 读取权限码进行判断</code></pre>
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
