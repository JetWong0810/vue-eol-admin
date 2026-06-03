<script lang="ts" setup>
import { ref } from 'vue';

import {
  ElButton,
  ElCard,
  ElInput,
  ElMessage,
  ElMessageBox,
  ElOption,
  ElPagination,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

const loading = ref(false);
const searchForm = ref({ keyword: '', status: '' });
const tableData = ref([
  { id: 1, username: 'admin', realName: '管理员', role: 'admin', dept: '技术部', status: 1, createTime: '2024-01-01' },
  { id: 2, username: 'zhangsan', realName: '张三', role: 'user', dept: '产品部', status: 1, createTime: '2024-02-15' },
  { id: 3, username: 'lisi', realName: '李四', role: 'user', dept: '设计部', status: 0, createTime: '2024-03-20' },
  { id: 4, username: 'wangwu', realName: '王五', role: 'editor', dept: '运营部', status: 1, createTime: '2024-04-10' },
]);
const total = ref(4);
const currentPage = ref(1);
const pageSize = ref(10);

function handleSearch() {
  ElMessage.info('搜索功能待对接后端接口');
}

function handleAdd() {
  ElMessage.info('新增用户功能待对接后端接口');
}

function handleEdit(row: any) {
  ElMessage.info(`编辑用户: ${row.realName}`);
}

function handleDelete(row: any) {
  ElMessageBox.confirm(`确定删除用户「${row.realName}」吗？`, '提示', {
    type: 'warning',
  }).then(() => {
    ElMessage.success('删除成功（模拟）');
  }).catch(() => {});
}
</script>

<template>
  <div class="p-5">
    <ElCard class="mb-4">
      <div class="flex items-center gap-3">
        <ElInput
          v-model="searchForm.keyword"
          clearable
          placeholder="用户名/姓名"
          style="width: 200px"
        />
        <ElSelect
          v-model="searchForm.status"
          clearable
          placeholder="状态"
          style="width: 120px"
        >
          <ElOption label="启用" value="1" />
          <ElOption label="停用" value="0" />
        </ElSelect>
        <ElButton type="primary" @click="handleSearch">搜索</ElButton>
        <ElButton @click="searchForm = { keyword: '', status: '' }">
          重置
        </ElButton>
        <div class="flex-1" />
        <ElButton type="primary" @click="handleAdd">新增用户</ElButton>
      </div>
    </ElCard>

    <ElCard>
      <ElTable v-loading="loading" :data="tableData" stripe>
        <ElTableColumn label="用户名" prop="username" width="120" />
        <ElTableColumn label="姓名" prop="realName" width="100" />
        <ElTableColumn label="角色" prop="role" width="100">
          <template #default="{ row }">
            <ElTag v-if="row.role === 'admin'" type="danger">管理员</ElTag>
            <ElTag v-else-if="row.role === 'editor'">编辑者</ElTag>
            <ElTag v-else type="info">普通用户</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="部门" prop="dept" width="120" />
        <ElTableColumn label="状态" prop="status" width="80">
          <template #default="{ row }">
            <ElTag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '启用' : '停用' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="创建时间" prop="createTime" width="150" />
        <ElTableColumn fixed="right" label="操作" width="160">
          <template #default="{ row }">
            <ElButton link type="primary" @click="handleEdit(row)">
              编辑
            </ElButton>
            <ElButton link type="danger" @click="handleDelete(row)">
              删除
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>

      <div class="mt-4 flex justify-end">
        <ElPagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          background
          layout="total, sizes, prev, pager, next"
        />
      </div>
    </ElCard>
  </div>
</template>
