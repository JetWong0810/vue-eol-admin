<script lang="ts" setup>
import { ref } from 'vue';

import {
  ElButton,
  ElCard,
  ElMessage,
  ElMessageBox,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

const loading = ref(false);
const tableData = ref([
  { id: 1, name: 'admin', label: '超级管理员', status: 1, remark: '拥有所有权限', createTime: '2024-01-01' },
  { id: 2, name: 'editor', label: '编辑者', status: 1, remark: '可编辑内容，不可管理用户', createTime: '2024-01-01' },
  { id: 3, name: 'user', label: '普通用户', status: 1, remark: '仅查看权限', createTime: '2024-01-01' },
  { id: 4, name: 'guest', label: '访客', status: 0, remark: '受限的只读访问', createTime: '2024-02-10' },
]);

function handleAdd() {
  ElMessage.info('新增角色功能待对接后端接口');
}

function handleEdit(row: any) {
  ElMessage.info(`编辑角色: ${row.label}`);
}

function handlePermission(row: any) {
  ElMessage.info(`分配权限: ${row.label}`);
}

function handleDelete(row: any) {
  ElMessageBox.confirm(`确定删除角色「${row.label}」吗？`, '提示', {
    type: 'warning',
  }).then(() => {
    ElMessage.success('删除成功（模拟）');
  }).catch(() => {});
}
</script>

<template>
  <div class="p-5">
    <ElCard>
      <template #header>
        <div class="flex items-center justify-between">
          <span>角色列表</span>
          <ElButton type="primary" @click="handleAdd">新增角色</ElButton>
        </div>
      </template>

      <ElTable v-loading="loading" :data="tableData" stripe>
        <ElTableColumn label="角色标识" prop="name" width="120" />
        <ElTableColumn label="角色名称" prop="label" width="140" />
        <ElTableColumn label="状态" prop="status" width="80">
          <template #default="{ row }">
            <ElTag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '启用' : '停用' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="备注" prop="remark" />
        <ElTableColumn label="创建时间" prop="createTime" width="150" />
        <ElTableColumn fixed="right" label="操作" width="200">
          <template #default="{ row }">
            <ElButton link type="primary" @click="handlePermission(row)">
              权限
            </ElButton>
            <ElButton link type="primary" @click="handleEdit(row)">
              编辑
            </ElButton>
            <ElButton link type="danger" @click="handleDelete(row)">
              删除
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>
