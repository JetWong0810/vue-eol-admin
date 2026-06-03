<script lang="ts" setup>
import { computed, ref } from 'vue';

import {
  ElAlert,
  ElButton,
  ElCard,
  ElCol,
  ElDivider,
  ElRadio,
  ElRadioGroup,
  ElRow,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

type Role = 'admin' | 'editor' | 'user';

const currentRole = ref<Role>('admin');

const permissions: Record<Role, string[]> = {
  admin: ['view', 'create', 'edit', 'delete', 'export', 'import', 'audit'],
  editor: ['view', 'create', 'edit', 'export'],
  user: ['view'],
};

const currentPermissions = computed(() => permissions[currentRole.value]);

function hasPermission(perm: string) {
  return currentPermissions.value.includes(perm);
}

const tableData = [
  { id: 1, name: '商品A', status: 'on' },
  { id: 2, name: '商品B', status: 'off' },
  { id: 3, name: '商品C', status: 'on' },
];
</script>

<template>
  <div class="p-5">
    <ElAlert
      class="mb-4"
      show-icon
      title="本页面演示前端按钮/功能级权限控制。通过切换角色查看不同权限下 UI 的变化。"
      type="info"
    />

    <ElCard class="mb-4">
      <template #header>
        <span class="text-base font-medium">切换角色</span>
      </template>
      <div class="flex items-center gap-4">
        <span class="text-sm">当前角色：</span>
        <ElRadioGroup v-model="currentRole">
          <ElRadio value="admin">超级管理员</ElRadio>
          <ElRadio value="editor">编辑者</ElRadio>
          <ElRadio value="user">普通用户</ElRadio>
        </ElRadioGroup>
      </div>
      <ElDivider />
      <div>
        <span class="mr-2 text-sm">拥有权限：</span>
        <ElTag v-for="p in currentPermissions" :key="p" class="mr-2 mb-1" size="small" type="success">
          {{ p }}
        </ElTag>
      </div>
    </ElCard>

    <ElRow :gutter="16">
      <ElCol :md="12" :xs="24">
        <ElCard class="mb-4">
          <template #header>
            <span class="text-base font-medium">按钮级权限</span>
          </template>
          <p class="mb-4 text-sm text-[var(--el-text-color-secondary)]">
            根据当前角色权限，动态显示/隐藏操作按钮
          </p>
          <div class="flex flex-wrap gap-3">
            <ElButton v-if="hasPermission('view')" type="primary">查看</ElButton>
            <ElButton v-if="hasPermission('create')" type="success">新增</ElButton>
            <ElButton v-if="hasPermission('edit')" type="warning">编辑</ElButton>
            <ElButton v-if="hasPermission('delete')" type="danger">删除</ElButton>
            <ElButton v-if="hasPermission('export')">导出</ElButton>
            <ElButton v-if="hasPermission('import')">导入</ElButton>
            <ElButton v-if="hasPermission('audit')" type="info">审核</ElButton>
          </div>
        </ElCard>
      </ElCol>
      <ElCol :md="12" :xs="24">
        <ElCard class="mb-4">
          <template #header>
            <span class="text-base font-medium">禁用模式</span>
          </template>
          <p class="mb-4 text-sm text-[var(--el-text-color-secondary)]">
            无权限时按钮禁用而非隐藏（适合让用户知道功能存在但无权访问）
          </p>
          <div class="flex flex-wrap gap-3">
            <ElButton :disabled="!hasPermission('create')" type="success">新增</ElButton>
            <ElButton :disabled="!hasPermission('edit')" type="warning">编辑</ElButton>
            <ElButton :disabled="!hasPermission('delete')" type="danger">删除</ElButton>
            <ElButton :disabled="!hasPermission('export')">导出</ElButton>
            <ElButton :disabled="!hasPermission('import')">导入</ElButton>
            <ElButton :disabled="!hasPermission('audit')" type="info">审核</ElButton>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElCard>
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-base font-medium">表格操作列权限</span>
          <div class="flex gap-2">
            <ElButton v-if="hasPermission('create')" type="primary" size="small">新增</ElButton>
            <ElButton v-if="hasPermission('export')" size="small">导出</ElButton>
          </div>
        </div>
      </template>
      <ElTable :data="tableData" stripe>
        <ElTableColumn label="ID" prop="id" width="80" />
        <ElTableColumn label="名称" prop="name" />
        <ElTableColumn label="状态" prop="status" width="100">
          <template #default="{ row }">
            <ElTag :type="row.status === 'on' ? 'success' : 'info'" size="small">
              {{ row.status === 'on' ? '上架' : '下架' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn fixed="right" label="操作" width="200">
          <template #default>
            <ElButton v-if="hasPermission('view')" link type="primary">查看</ElButton>
            <ElButton v-if="hasPermission('edit')" link type="primary">编辑</ElButton>
            <ElButton v-if="hasPermission('delete')" link type="danger">删除</ElButton>
            <ElButton v-if="hasPermission('audit')" link type="warning">审核</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>
