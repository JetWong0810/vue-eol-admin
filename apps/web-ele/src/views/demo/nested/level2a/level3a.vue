<script lang="ts" setup>
import { ElAlert, ElBreadcrumb, ElBreadcrumbItem, ElCard } from 'element-plus';
</script>

<template>
  <div class="p-5">
    <ElCard>
      <template #header>
        <span class="text-base font-medium">三级菜单 - 菜单 3-1</span>
      </template>
      <ElBreadcrumb class="mb-4" separator="/">
        <ElBreadcrumbItem>组件案例</ElBreadcrumbItem>
        <ElBreadcrumbItem>三级菜单</ElBreadcrumbItem>
        <ElBreadcrumbItem>菜单 2-1</ElBreadcrumbItem>
        <ElBreadcrumbItem>菜单 3-1</ElBreadcrumbItem>
      </ElBreadcrumb>
      <ElAlert
        show-icon
        title="这是一个三级菜单页面，演示多级路由嵌套。当前路径：/demo/nested/level2a/level3a"
        type="success"
      />
      <div class="mt-4 rounded-md bg-[var(--el-fill-color-lighter)] p-4">
        <p class="text-sm text-[var(--el-text-color-secondary)]">
          多级菜单的使用场景：当业务模块较多时，可以通过多级菜单进行归类。
          路由配置中通过 children 嵌套子路由实现。
        </p>
      </div>
    </ElCard>
  </div>
</template>
