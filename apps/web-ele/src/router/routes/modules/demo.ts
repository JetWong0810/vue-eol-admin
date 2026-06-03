import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:app-window',
      order: 15,
      title: '组件案例',
    },
    name: 'Demo',
    path: '/demo',
    children: [
      {
        name: 'DemoTable',
        path: '/demo/table',
        component: () => import('#/views/demo/table/index.vue'),
        meta: {
          icon: 'lucide:table',
          title: '列表案例',
        },
      },
      {
        name: 'DemoFilter',
        path: '/demo/filter',
        component: () => import('#/views/demo/filter/index.vue'),
        meta: {
          icon: 'lucide:filter',
          title: '筛选案例',
        },
      },
      {
        name: 'DemoForm',
        path: '/demo/form',
        component: () => import('#/views/demo/form/index.vue'),
        meta: {
          icon: 'lucide:file-edit',
          title: '表单案例',
        },
      },
      {
        name: 'DemoDetail',
        path: '/demo/detail',
        component: () => import('#/views/demo/detail/index.vue'),
        meta: {
          icon: 'lucide:file-text',
          title: '详情案例',
        },
      },
      {
        name: 'DemoDialog',
        path: '/demo/dialog',
        component: () => import('#/views/demo/dialog/index.vue'),
        meta: {
          icon: 'lucide:square-stack',
          title: '弹窗案例',
        },
      },
      {
        name: 'DemoPermission',
        path: '/demo/permission',
        component: () => import('#/views/demo/permission/index.vue'),
        meta: {
          icon: 'lucide:shield-check',
          title: '权限控制',
        },
      },
      {
        name: 'DemoApi',
        path: '/demo/api',
        component: () => import('#/views/demo/api/index.vue'),
        meta: {
          icon: 'lucide:cloud',
          title: '接口调用',
        },
      },
      {
        name: 'DemoNested',
        path: '/demo/nested',
        meta: {
          icon: 'lucide:layers',
          title: '三级菜单',
        },
        children: [
          {
            name: 'DemoNestedLevel2a',
            path: '/demo/nested/level2a',
            meta: {
              icon: 'lucide:file',
              title: '菜单 2-1',
            },
            children: [
              {
                name: 'DemoNestedLevel3a',
                path: '/demo/nested/level2a/level3a',
                component: () =>
                  import('#/views/demo/nested/level2a/level3a.vue'),
                meta: {
                  icon: 'lucide:file',
                  title: '菜单 3-1',
                },
              },
              {
                name: 'DemoNestedLevel3b',
                path: '/demo/nested/level2a/level3b',
                component: () =>
                  import('#/views/demo/nested/level2a/level3b.vue'),
                meta: {
                  icon: 'lucide:file',
                  title: '菜单 3-2',
                },
              },
            ],
          },
          {
            name: 'DemoNestedLevel2b',
            path: '/demo/nested/level2b',
            component: () => import('#/views/demo/nested/level2b/index.vue'),
            meta: {
              icon: 'lucide:file',
              title: '菜单 2-2',
            },
          },
        ],
      },
    ],
  },
];

export default routes;
