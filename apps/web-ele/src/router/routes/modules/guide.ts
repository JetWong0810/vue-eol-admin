import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:book-open',
      order: 10,
      title: '开发指南',
    },
    name: 'Guide',
    path: '/guide',
    children: [
      {
        name: 'GuideStructure',
        path: '/guide/structure',
        component: () => import('#/views/guide/structure/index.vue'),
        meta: {
          icon: 'lucide:folder-tree',
          title: '目录结构',
        },
      },
      {
        name: 'GuideQuickStart',
        path: '/guide/quickstart',
        component: () => import('#/views/guide/quickstart/index.vue'),
        meta: {
          icon: 'lucide:rocket',
          title: '快速开始',
        },
      },
      {
        name: 'GuideConvention',
        path: '/guide/convention',
        component: () => import('#/views/guide/convention/index.vue'),
        meta: {
          icon: 'lucide:file-check',
          title: '项目规范',
        },
      },
      {
        name: 'GuideMenu',
        path: '/guide/menu',
        component: () => import('#/views/guide/menu/index.vue'),
        meta: {
          icon: 'lucide:menu',
          title: '菜单与路由',
        },
      },
      {
        name: 'GuidePermission',
        path: '/guide/permission',
        component: () => import('#/views/guide/permission/index.vue'),
        meta: {
          icon: 'lucide:shield',
          title: '权限控制',
        },
      },
      {
        name: 'GuideRequest',
        path: '/guide/request',
        component: () => import('#/views/guide/request/index.vue'),
        meta: {
          icon: 'lucide:globe',
          title: 'HTTP请求',
        },
      },
      {
        name: 'GuideComponents',
        path: '/guide/components',
        component: () => import('#/views/guide/components/index.vue'),
        meta: {
          icon: 'lucide:blocks',
          title: '组件使用',
        },
      },
      {
        name: 'GuideLinks',
        path: '/guide/links',
        component: () => import('#/views/guide/links/index.vue'),
        meta: {
          icon: 'lucide:external-link',
          title: '相关链接',
        },
      },
    ],
  },
];

export default routes;
