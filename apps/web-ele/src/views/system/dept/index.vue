<script lang="ts" setup>
import { ref } from 'vue';

import {
  ElButton,
  ElCard,
  ElInput,
  ElMessage,
  ElMessageBox,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

const loading = ref(false);
const keyword = ref('');
const tableData = ref([
  {
    id: 1,
    name: '总公司',
    leader: '张总',
    phone: '13800000001',
    sort: 1,
    status: 1,
    createTime: '2024-01-01',
    children: [
      {
        id: 10,
        name: '技术部',
        leader: '李工',
        phone: '13800000010',
        sort: 1,
        status: 1,
        createTime: '2024-01-01',
        children: [
          { id: 101, name: '前端组', leader: '王前', phone: '13800000101', sort: 1, status: 1, createTime: '2024-01-15' },
          { id: 102, name: '后端组', leader: '赵后', phone: '13800000102', sort: 2, status: 1, createTime: '2024-01-15' },
        ],
      },
      {
        id: 11,
        name: '产品部',
        leader: '陈产',
        phone: '13800000011',
        sort: 2,
        status: 1,
        createTime: '2024-01-01',
      },
      {
        id: 12,
        name: '设计部',
        leader: '周设',
        phone: '13800000012',
        sort: 3,
        status: 1,
        createTime: '2024-02-01',
      },
      {
        id: 13,
        name: '运营部',
        leader: '吴运',
        phone: '13800000013',
        sort: 4,
        status: 0,
        createTime: '2024-03-01',
      },
    ],
  },
]);

function handleSearch() {
  ElMessage.info('搜索功能待对接后端接口');
}

function handleAdd() {
  ElMessage.info('新增部门功能待对接后端接口');
}

function handleEdit(row: any) {
  ElMessage.info(`编辑部门: ${row.name}`);
}

function handleDelete(row: any) {
  ElMessageBox.confirm(`确定删除部门「${row.name}」吗？`, '提示', {
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
          <div class="flex items-center gap-3">
            <ElInput
              v-model="keyword"
              clearable
              placeholder="部门名称"
              style="width: 200px"
            />
            <ElButton type="primary" @click="handleSearch">搜索</ElButton>
          </div>
          <ElButton type="primary" @click="handleAdd">新增部门</ElButton>
        </div>
      </template>

      <ElTable
        v-loading="loading"
        :data="tableData"
        :default-expand-all="true"
        row-key="id"
        stripe
      >
        <ElTableColumn label="部门名称" prop="name" width="200" />
        <ElTableColumn label="负责人" prop="leader" width="100" />
        <ElTableColumn label="联系电话" prop="phone" width="140" />
        <ElTableColumn label="排序" prop="sort" width="80" />
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
    </ElCard>
  </div>
</template>
