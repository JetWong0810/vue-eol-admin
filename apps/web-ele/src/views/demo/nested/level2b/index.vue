<script lang="ts" setup>
import { ElAlert, ElBreadcrumb, ElBreadcrumbItem, ElCard } from 'element-plus';
</script>

<template>
  <div class="p-5">
    <ElCard>
      <template #header>
        <span class="text-base font-medium">三级菜单 - 菜单 2-2</span>
      </template>
      <ElBreadcrumb class="mb-4" separator="/">
        <ElBreadcrumbItem>组件案例</ElBreadcrumbItem>
        <ElBreadcrumbItem>三级菜单</ElBreadcrumbItem>
        <ElBreadcrumbItem>菜单 2-2</ElBreadcrumbItem>
      </ElBreadcrumb>
      <ElAlert
        show-icon
        title="这是一个没有三级子菜单的二级页面。当前路径：/demo/nested/level2b"
        type="info"
      />
      <div class="mt-4 rounded-md bg-[var(--el-fill-color-lighter)] p-4">
        <p class="text-sm text-[var(--el-text-color-secondary)]">
          并非所有二级菜单都需要三级子菜单。可根据实际业务需要灵活配置。
          本页直接作为叶子节点渲染内容。
        </p>
      </div>
    </ElCard>
  </div>
</template>
