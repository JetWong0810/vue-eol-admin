<script lang="ts" setup>
import { ElAlert, ElBreadcrumb, ElBreadcrumbItem, ElCard } from 'element-plus';
</script>

<template>
  <div class="p-5">
    <ElCard>
      <template #header>
        <span class="text-base font-medium">三级菜单 - 菜单 3-2</span>
      </template>
      <ElBreadcrumb class="mb-4" separator="/">
        <ElBreadcrumbItem>组件案例</ElBreadcrumbItem>
        <ElBreadcrumbItem>三级菜单</ElBreadcrumbItem>
        <ElBreadcrumbItem>菜单 2-1</ElBreadcrumbItem>
        <ElBreadcrumbItem>菜单 3-2</ElBreadcrumbItem>
      </ElBreadcrumb>
      <ElAlert
        show-icon
        title="这是另一个三级菜单页面。当前路径：/demo/nested/level2a/level3b"
        type="warning"
      />
      <div class="mt-4 rounded-md bg-[var(--el-fill-color-lighter)] p-4">
        <p class="text-sm text-[var(--el-text-color-secondary)]">
          同一个二级菜单下可以有多个三级页面。
          菜单的 icon、title、order 等信息通过路由的 meta 字段配置。
        </p>
      </div>
    </ElCard>
  </div>
</template>
