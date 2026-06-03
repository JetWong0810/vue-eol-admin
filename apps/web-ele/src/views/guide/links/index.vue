<script lang="ts" setup>
import { IconifyIcon } from '@vben/icons';
import { ElCard, ElCol, ElRow } from 'element-plus';

const links = [
  {
    title: '框架文档',
    desc: 'Vben Admin 官方文档，包含完整的使用指南和配置参考',
    url: 'https://doc.vben.pro',
    icon: 'lucide:book-open-text',
  },
  {
    title: '官方预览',
    desc: 'Vben Admin 在线预览，查看各种功能和组件效果',
    url: 'https://www.vben.pro',
    icon: 'lucide:monitor',
  },
  {
    title: 'GitHub 仓库',
    desc: '源码仓库，查看最新更新、提交 Issue',
    url: 'https://github.com/vbenjs/vue-vben-admin',
    icon: 'mdi:github',
  },
  {
    title: 'Element Plus',
    desc: '组件库文档，查询组件 API、属性和事件',
    url: 'https://element-plus.org/zh-CN/',
    icon: 'ep:element-plus',
  },
  {
    title: 'Vue 3',
    desc: 'Vue.js 3 官方文档，Composition API 等',
    url: 'https://cn.vuejs.org/',
    icon: 'logos:vue',
  },
  {
    title: 'Iconify 图标库',
    desc: '图标搜索平台，查找 iconify 图标名称',
    url: 'https://icon-sets.iconify.design/',
    icon: 'line-md:iconify1',
  },
  {
    title: 'Tailwind CSS',
    desc: 'Tailwind CSS 文档，查询工具类名称和用法',
    url: 'https://tailwindcss.com/docs',
    icon: 'devicon:tailwindcss',
  },
  {
    title: 'VxeTable',
    desc: '高性能表格组件文档，API 和示例',
    url: 'https://vxetable.cn/',
    icon: 'lucide:table',
  },
  {
    title: 'Pinia',
    desc: 'Vue 状态管理库，Store 定义和使用方式',
    url: 'https://pinia.vuejs.org/zh/',
    icon: 'logos:pinia',
  },
  {
    title: 'Vue Router',
    desc: 'Vue 路由管理，路由守卫、动态路由等',
    url: 'https://router.vuejs.org/zh/',
    icon: 'logos:vue',
  },
];

function openLink(url: string) {
  window.open(url, '_blank');
}
</script>

<template>
  <div class="p-5">
    <h2 class="mb-5 text-xl font-semibold">相关链接</h2>

    <ElRow :gutter="16">
      <ElCol
        v-for="item in links"
        :key="item.url"
        :lg="8"
        :md="12"
        :sm="24"
        :xs="24"
      >
        <ElCard
          class="link-card mb-4 cursor-pointer"
          shadow="hover"
          @click="openLink(item.url)"
        >
          <div class="flex items-start gap-3">
            <div class="flex size-9 shrink-0 items-center justify-center rounded-md bg-[var(--el-color-primary-light-9)] text-lg text-[var(--el-color-primary)]">
              <IconifyIcon :icon="item.icon" />
            </div>
            <div class="min-w-0 flex-1">
              <h4 class="flex items-center gap-1.5 text-sm font-semibold">
                {{ item.title }}
                <IconifyIcon
                  class="text-xs opacity-40"
                  icon="lucide:external-link"
                />
              </h4>
              <p class="mt-1 text-xs leading-relaxed text-[var(--el-text-color-secondary)]">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<style scoped>
.link-card {
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.link-card:hover {
  transform: translateY(-2px);
}
</style>
