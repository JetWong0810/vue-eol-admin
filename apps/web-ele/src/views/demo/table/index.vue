<script lang="ts" setup>
import { computed, ref } from 'vue';

import {
  ElButton,
  ElCard,
  ElMessage,
  ElPagination,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

interface TableRow {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'off' | 'on';
  createdAt: string;
}

const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const selectedRows = ref<TableRow[]>([]);

const allData: TableRow[] = Array.from({ length: 56 }, (_, i) => ({
  id: 1000 + i,
  name: `商品 ${String.fromCodePoint(65 + (i % 26))}-${i + 1}`,
  category: ['电子产品', '办公用品', '生活百货', '食品饮料'][i % 4]!,
  price: Number.parseFloat((Math.random() * 1000 + 10).toFixed(2)),
  stock: Math.floor(Math.random() * 500),
  status: i % 7 === 0 ? 'off' : 'on',
  createdAt: `2024-${String(((i % 12) + 1)).padStart(2, '0')}-${String(((i % 28) + 1)).padStart(2, '0')}`,
}));

const tableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return allData.slice(start, start + pageSize.value);
});

function handleSelectionChange(rows: TableRow[]) {
  selectedRows.value = rows;
}

function handleBatchDelete() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先选择要删除的数据');
    return;
  }
  ElMessage.success(`已选择 ${selectedRows.value.length} 条，批量删除（模拟）`);
}

function handleExport() {
  ElMessage.success('导出成功（模拟）');
}
</script>

<template>
  <div class="p-5">
    <ElCard>
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-base font-medium">商品列表</span>
          <div class="flex gap-2">
            <ElButton :disabled="selectedRows.length === 0" type="danger" @click="handleBatchDelete">
              批量删除 ({{ selectedRows.length }})
            </ElButton>
            <ElButton type="success" @click="handleExport">导出Excel</ElButton>
          </div>
        </div>
      </template>

      <ElTable
        v-loading="loading"
        :data="tableData"
        stripe
        @selection-change="handleSelectionChange"
      >
        <ElTableColumn type="selection" width="50" />
        <ElTableColumn label="ID" prop="id" sortable width="80" />
        <ElTableColumn label="商品名称" min-width="160" prop="name" show-overflow-tooltip />
        <ElTableColumn label="分类" prop="category" width="120">
          <template #default="{ row }">
            <ElTag
              :type="{ '电子产品': 'primary', '办公用品': 'success', '生活百货': 'warning', '食品饮料': 'danger' }[row.category] as any"
            >
              {{ row.category }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="价格" prop="price" sortable width="120">
          <template #default="{ row }">
            <span class="font-medium text-[var(--el-color-danger)]">¥{{ row.price }}</span>
          </template>
        </ElTableColumn>
        <ElTableColumn label="库存" prop="stock" sortable width="100">
          <template #default="{ row }">
            <span :class="row.stock < 50 ? 'text-[var(--el-color-danger)]' : ''">
              {{ row.stock }}
            </span>
          </template>
        </ElTableColumn>
        <ElTableColumn label="状态" prop="status" width="80">
          <template #default="{ row }">
            <ElTag :type="row.status === 'on' ? 'success' : 'info'">
              {{ row.status === 'on' ? '上架' : '下架' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="创建时间" prop="createdAt" sortable width="130" />
        <ElTableColumn fixed="right" label="操作" width="150">
          <template #default="{ row }">
            <ElButton link type="primary" @click="ElMessage.info(`查看: ${row.name}`)">
              查看
            </ElButton>
            <ElButton link type="primary" @click="ElMessage.info(`编辑: ${row.name}`)">
              编辑
            </ElButton>
            <ElButton link type="danger" @click="ElMessage.info(`删除: ${row.name}`)">
              删除
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>

      <div class="mt-4 flex items-center justify-between">
        <span class="text-sm text-[var(--el-text-color-secondary)]">
          共 {{ allData.length }} 条数据
        </span>
        <ElPagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          :total="allData.length"
          background
          layout="sizes, prev, pager, next, jumper"
        />
      </div>
    </ElCard>
  </div>
</template>
