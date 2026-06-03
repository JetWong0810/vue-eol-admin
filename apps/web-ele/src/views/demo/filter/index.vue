<script lang="ts" setup>
import { ref } from 'vue';

import {
  ElButton,
  ElCard,
  ElCol,
  ElDatePicker,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElOption,
  ElRow,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

const loading = ref(false);
const showMore = ref(false);

const filterForm = ref({
  keyword: '',
  status: '',
  category: '',
  dateRange: null as [string, string] | null,
  minPrice: '',
  maxPrice: '',
});

const tableData = ref([
  { id: 1001, name: 'MacBook Pro 16', category: '电子产品', price: 18999, status: 'on', date: '2024-03-15' },
  { id: 1002, name: '人体工学椅', category: '办公用品', price: 2599, status: 'on', date: '2024-04-02' },
  { id: 1003, name: '投影仪 X200', category: '电子产品', price: 4999, status: 'off', date: '2024-02-20' },
  { id: 1004, name: '蓝牙键盘', category: '电子产品', price: 399, status: 'on', date: '2024-05-01' },
  { id: 1005, name: '打印纸 A4', category: '办公用品', price: 45, status: 'on', date: '2024-01-10' },
  { id: 1006, name: '即食燕麦', category: '食品饮料', price: 68, status: 'on', date: '2024-06-01' },
  { id: 1007, name: '保温杯 500ml', category: '生活百货', price: 129, status: 'off', date: '2024-03-28' },
]);

function handleSearch() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    ElMessage.success('筛选完成（模拟），实际应对接后端接口');
  }, 600);
}

function handleReset() {
  filterForm.value = {
    keyword: '',
    status: '',
    category: '',
    dateRange: null,
    minPrice: '',
    maxPrice: '',
  };
  ElMessage.info('已重置筛选条件');
}
</script>

<template>
  <div class="p-5">
    <ElCard class="mb-4">
      <ElForm :model="filterForm" label-width="80px">
        <ElRow :gutter="16">
          <ElCol :md="8" :sm="12" :xs="24">
            <ElFormItem label="关键词">
              <ElInput v-model="filterForm.keyword" clearable placeholder="商品名称/编号" />
            </ElFormItem>
          </ElCol>
          <ElCol :md="8" :sm="12" :xs="24">
            <ElFormItem label="状态">
              <ElSelect v-model="filterForm.status" clearable placeholder="请选择" style="width: 100%">
                <ElOption label="上架" value="on" />
                <ElOption label="下架" value="off" />
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol :md="8" :sm="12" :xs="24">
            <ElFormItem label="分类">
              <ElSelect v-model="filterForm.category" clearable placeholder="请选择" style="width: 100%">
                <ElOption label="电子产品" value="电子产品" />
                <ElOption label="办公用品" value="办公用品" />
                <ElOption label="生活百货" value="生活百货" />
                <ElOption label="食品饮料" value="食品饮料" />
              </ElSelect>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow v-show="showMore" :gutter="16">
          <ElCol :md="8" :sm="12" :xs="24">
            <ElFormItem label="日期范围">
              <ElDatePicker
                v-model="filterForm.dateRange"
                end-placeholder="结束日期"
                start-placeholder="开始日期"
                style="width: 100%"
                type="daterange"
                value-format="YYYY-MM-DD"
              />
            </ElFormItem>
          </ElCol>
          <ElCol :md="4" :sm="6" :xs="12">
            <ElFormItem label="最低价">
              <ElInput v-model="filterForm.minPrice" placeholder="0" />
            </ElFormItem>
          </ElCol>
          <ElCol :md="4" :sm="6" :xs="12">
            <ElFormItem label="最高价">
              <ElInput v-model="filterForm.maxPrice" placeholder="不限" />
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElCol :span="24">
            <div class="flex items-center justify-end gap-2">
              <ElButton link type="primary" @click="showMore = !showMore">
                {{ showMore ? '收起' : '展开更多' }}
              </ElButton>
              <ElButton @click="handleReset">重置</ElButton>
              <ElButton :loading="loading" type="primary" @click="handleSearch">搜索</ElButton>
            </div>
          </ElCol>
        </ElRow>
      </ElForm>
    </ElCard>

    <ElCard>
      <ElTable v-loading="loading" :data="tableData" stripe>
        <ElTableColumn label="ID" prop="id" width="80" />
        <ElTableColumn label="名称" min-width="160" prop="name" show-overflow-tooltip />
        <ElTableColumn label="分类" prop="category" width="120">
          <template #default="{ row }">
            <ElTag size="small">{{ row.category }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="价格" prop="price" width="120">
          <template #default="{ row }">¥{{ row.price }}</template>
        </ElTableColumn>
        <ElTableColumn label="状态" prop="status" width="80">
          <template #default="{ row }">
            <ElTag :type="row.status === 'on' ? 'success' : 'info'" size="small">
              {{ row.status === 'on' ? '上架' : '下架' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="创建时间" prop="date" width="130" />
      </ElTable>
    </ElCard>
  </div>
</template>
