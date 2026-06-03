<script lang="ts" setup>
import { ref } from 'vue';

import {
  ElButton,
  ElCard,
  ElMessage,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

const loading = ref(false);
const tableData = ref([
  {
    id: 1,
    name: '概览',
    icon: 'lucide:layout-dashboard',
    path: '/dashboard',
    type: 'directory',
    sort: 1,
    status: 1,
    children: [
      { id: 11, name: '分析页', icon: 'lucide:area-chart', path: '/analytics', type: 'menu', sort: 1, status: 1 },
      { id: 12, name: '工作台', icon: 'carbon:workspace', path: '/workspace', type: 'menu', sort: 2, status: 1 },
    ],
  },
  {
    id: 2,
    name: '系统管理',
    icon: 'lucide:settings',
    path: '/system',
    type: 'directory',
    sort: 20,
    status: 1,
    children: [
      { id: 21, name: '用户管理', icon: 'lucide:user', path: '/system/user', type: 'menu', sort: 1, status: 1 },
      { id: 22, name: '角色管理', icon: 'lucide:users', path: '/system/role', type: 'menu', sort: 2, status: 1 },
      { id: 23, name: '菜单管理', icon: 'lucide:menu', path: '/system/menu', type: 'menu', sort: 3, status: 1 },
      { id: 24, name: '部门管理', icon: 'lucide:building-2', path: '/system/dept', type: 'menu', sort: 4, status: 1 },
    ],
  },
  {
    id: 3,
    name: '开发指南',
    icon: 'lucide:book-open',
    path: '/guide',
    type: 'directory',
    sort: 10,
    status: 1,
    children: [
      { id: 31, name: '目录结构', icon: 'lucide:folder-tree', path: '/guide/structure', type: 'menu', sort: 1, status: 1 },
      { id: 32, name: '快速开始', icon: 'lucide:rocket', path: '/guide/quickstart', type: 'menu', sort: 2, status: 1 },
    ],
  },
]);

function handleAdd() {
  ElMessage.info('新增菜单功能待对接后端接口');
}

function handleEdit(row: any) {
  ElMessage.info(`编辑菜单: ${row.name}`);
}
</script>

<template>
  <div class="p-5">
    <ElCard>
      <template #header>
        <div class="flex items-center justify-between">
          <span>菜单列表</span>
          <ElButton type="primary" @click="handleAdd">新增菜单</ElButton>
        </div>
      </template>

      <ElTable
        v-loading="loading"
        :data="tableData"
        :default-expand-all="true"
        row-key="id"
        stripe
      >
        <ElTableColumn label="菜单名称" prop="name" width="200" />
        <ElTableColumn label="图标" prop="icon" width="180">
          <template #default="{ row }">
            <code class="text-xs">{{ row.icon }}</code>
          </template>
        </ElTableColumn>
        <ElTableColumn label="路径" prop="path" width="200" />
        <ElTableColumn label="类型" prop="type" width="100">
          <template #default="{ row }">
            <ElTag v-if="row.type === 'directory'" type="warning">目录</ElTag>
            <ElTag v-else-if="row.type === 'menu'" type="success">菜单</ElTag>
            <ElTag v-else type="info">按钮</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="排序" prop="sort" width="80" />
        <ElTableColumn label="状态" prop="status" width="80">
          <template #default="{ row }">
            <ElTag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '启用' : '停用' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn fixed="right" label="操作" width="160">
          <template #default="{ row }">
            <ElButton link type="primary" @click="handleEdit(row)">
              编辑
            </ElButton>
            <ElButton link type="primary" @click="handleAdd">
              新增子级
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>
