<script lang="ts" setup>
import { ref } from 'vue';

import {
  ElAlert,
  ElCard,
  ElCol,
  ElRow,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

const routeExample = ref(`// 文件位置: src/router/routes/modules/xxx.ts
import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:settings',      // 菜单图标(iconify图标名)
      order: 100,                    // 菜单排序，数字越小越靠前
      title: $t('menu.system'),      // 菜单标题(支持i18n)
    },
    name: 'System',                  // 路由名称(唯一)
    path: '/system',                 // 路由路径
    children: [                      // 子路由(子菜单)
      {
        name: 'UserManage',
        path: '/system/user',
        component: () => import('#/views/system/user/index.vue'),
        meta: {
          icon: 'lucide:user',
          title: '用户管理',
        },
      },
    ],
  },
];

export default routes;`);

const multiLevelExample = ref(`// 三级菜单示例
const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:settings',
      title: '系统管理',
    },
    name: 'System',
    path: '/system',
    children: [
      {
        name: 'UserManage',
        path: '/system/user',
        meta: {
          icon: 'lucide:user',
          title: '用户管理',
        },
        children: [
          {
            name: 'UserList',
            path: '/system/user/list',
            component: () => import('#/views/system/user/list.vue'),
            meta: { title: '用户列表' },
          },
          {
            name: 'UserRole',
            path: '/system/user/role',
            component: () => import('#/views/system/user/role.vue'),
            meta: { title: '角色分配' },
          },
        ],
      },
      {
        name: 'MenuManage',
        path: '/system/menu',
        component: () => import('#/views/system/menu/index.vue'),
        meta: {
          icon: 'lucide:menu',
          title: '菜单管理',
        },
      },
    ],
  },
];`);

const metaFields = ref([
  { field: 'title', type: 'string', desc: '菜单/页面标题，支持 $t() 国际化' },
  { field: 'icon', type: 'string', desc: '菜单图标，使用 iconify 图标名称' },
  { field: 'order', type: 'number', desc: '菜单排序，数字越小越靠前' },
  {
    field: 'hideInMenu',
    type: 'boolean',
    desc: '隐藏菜单项(路由仍可访问)，适用于详情页等',
  },
  {
    field: 'hideInTab',
    type: 'boolean',
    desc: '隐藏标签页，不在页签栏显示',
  },
  { field: 'keepAlive', type: 'boolean', desc: '页面缓存，切换时保持组件状态' },
  {
    field: 'affixTab',
    type: 'boolean',
    desc: '固定标签页，不可关闭(如首页)',
  },
  {
    field: 'badge',
    type: 'string',
    desc: '菜单标记文本(如 "New"、"Beta")',
  },
  {
    field: 'badgeType',
    type: 'string',
    desc: '标记类型: "dot" 显示小圆点',
  },
  {
    field: 'ignoreAccess',
    type: 'boolean',
    desc: '忽略权限验证，无需登录即可访问',
  },
  {
    field: 'authority',
    type: 'string[]',
    desc: '允许访问的角色列表(前端权限模式)',
  },
]);

const stepsToAdd = ref([
  '1. 在 src/router/routes/modules/ 下新建路由文件（如 system.ts）',
  '2. 在 src/views/ 下创建对应的页面组件（如 views/system/user/index.vue）',
  '3. 路由文件 export default routes 即可自动注册（基于 import.meta.glob 自动扫描）',
  '4. 无需手动在任何地方 import 路由文件，框架会自动加载 modules/ 下所有 .ts 文件',
]);
</script>

<template>
  <div class="p-5">
    <h2 class="mb-5 text-xl font-semibold">菜单与路由配置指南</h2>

    <ElAlert
      :closable="false"
      class="mb-4"
      title="核心机制"
      type="info"
      description="路由文件放在 src/router/routes/modules/ 目录下，框架通过 import.meta.glob 自动扫描加载，无需手动注册。每个路由文件 export default 一个 RouteRecordRaw[] 数组即可。"
    />

    <ElRow :gutter="16">
      <ElCol :span="24">
        <ElCard class="mb-4" header="添加菜单的步骤">
          <ol class="list-inside list-decimal space-y-2">
            <li v-for="step in stepsToAdd" :key="step">{{ step }}</li>
          </ol>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElCard class="mb-4" header="基础路由配置示例">
      <pre class="code-block"><code>{{ routeExample }}</code></pre>
    </ElCard>

    <ElCard class="mb-4" header="多级菜单示例（三级）">
      <pre class="code-block"><code>{{ multiLevelExample }}</code></pre>
      <ElAlert
        :closable="false"
        class="mt-3"
        type="warning"
        description="多级菜单中，只有叶子节点（最深层级）才需要配置 component，父级节点只需配置 meta 和 children。"
      />
    </ElCard>

    <ElCard class="mb-4" header="路由 meta 字段说明">
      <ElTable :data="metaFields" border stripe>
        <ElTableColumn label="字段" prop="field" width="160">
          <template #default="scope">
            <ElTag size="small">{{ scope.row.field }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="类型" prop="type" width="120" />
        <ElTableColumn label="说明" prop="desc" />
      </ElTable>
    </ElCard>

    <ElCard header="常见场景">
      <div class="space-y-3">
        <div>
          <h4 class="font-bold">场景1: 详情页（不显示在菜单中）</h4>
          <pre
            class="mt-2 code-block"
          ><code>{
  name: 'UserDetail',
  path: '/system/user/detail/:id',
  component: () => import('#/views/system/user/detail.vue'),
  meta: {
    hideInMenu: true,          // 不显示在侧边栏
    title: '用户详情',
    activePath: '/system/user', // 高亮"用户管理"菜单项
  },
}</code></pre>
        </div>

        <div>
          <h4 class="font-bold">场景2: 外链菜单（打开外部网站）</h4>
          <pre
            class="mt-2 code-block"
          ><code>{
  name: 'ExternalDoc',
  path: '/external/doc',
  component: IFrameView,
  meta: {
    icon: 'lucide:book-open',
    link: 'https://doc.example.com',  // 外链地址
    title: '项目文档',
  },
}</code></pre>
        </div>

        <div>
          <h4 class="font-bold">场景3: 固定首页标签</h4>
          <pre
            class="mt-2 code-block"
          ><code>{
  name: 'Home',
  path: '/home',
  component: () => import('#/views/home/index.vue'),
  meta: {
    affixTab: true,   // 固定在标签栏，不可关闭
    icon: 'lucide:home',
    title: '首页',
  },
}</code></pre>
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
