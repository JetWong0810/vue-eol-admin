<script lang="ts" setup>
import { ref } from 'vue';

import {
  ElAlert,
  ElButton,
  ElCard,
  ElCol,
  ElDescriptions,
  ElDescriptionsItem,
  ElInput,
  ElMessage,
  ElRow,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

const loading = ref(false);
const responseData = ref<any>(null);
const requestUrl = ref('https://jsonplaceholder.typicode.com/posts?_limit=5');
const requestStatus = ref<'error' | 'idle' | 'loading' | 'success'>('idle');
const requestTime = ref(0);

async function fetchData() {
  loading.value = true;
  requestStatus.value = 'loading';
  responseData.value = null;
  const start = performance.now();

  try {
    const res = await fetch(requestUrl.value);
    requestTime.value = Math.round(performance.now() - start);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    responseData.value = await res.json();
    requestStatus.value = 'success';
    ElMessage.success(`请求成功，耗时 ${requestTime.value}ms`);
  } catch (err: any) {
    requestStatus.value = 'error';
    ElMessage.error(`请求失败: ${err.message}`);
  } finally {
    loading.value = false;
  }
}

const mockApiLoading = ref(false);
const mockResult = ref('');

async function callMockApi() {
  mockApiLoading.value = true;
  mockResult.value = '';
  await new Promise((r) => setTimeout(r, 1500));
  mockResult.value = JSON.stringify(
    { code: 0, message: 'success', data: { userId: 1, token: 'mock-token-abc123', roles: ['admin'] } },
    null,
    2,
  );
  mockApiLoading.value = false;
  ElMessage.success('模拟接口调用成功');
}

async function callErrorApi() {
  mockApiLoading.value = true;
  mockResult.value = '';
  await new Promise((r) => setTimeout(r, 800));
  mockResult.value = JSON.stringify(
    { code: 401, message: '登录已过期，请重新登录', data: null },
    null,
    2,
  );
  mockApiLoading.value = false;
  ElMessage.error('模拟接口返回错误');
}
</script>

<template>
  <div class="p-5">
    <ElAlert
      class="mb-4"
      show-icon
      title="本页面演示接口调用场景：真实 HTTP 请求、模拟接口响应、错误处理等"
      type="info"
    />

    <ElCard class="mb-4">
      <template #header>
        <span class="text-base font-medium">真实 HTTP 请求</span>
      </template>
      <div class="mb-4 flex gap-3">
        <ElInput v-model="requestUrl" placeholder="请输入请求地址" />
        <ElButton :loading="loading" type="primary" @click="fetchData">发送请求</ElButton>
      </div>

      <ElDescriptions v-if="requestStatus !== 'idle'" :column="3" border size="small">
        <ElDescriptionsItem label="状态">
          <ElTag :type="requestStatus === 'success' ? 'success' : requestStatus === 'error' ? 'danger' : 'warning'" size="small">
            {{ requestStatus }}
          </ElTag>
        </ElDescriptionsItem>
        <ElDescriptionsItem label="耗时">{{ requestTime }}ms</ElDescriptionsItem>
        <ElDescriptionsItem label="数据条数">{{ responseData?.length ?? '-' }}</ElDescriptionsItem>
      </ElDescriptions>

      <ElTable v-if="responseData" :data="responseData" class="mt-4" max-height="300" stripe>
        <ElTableColumn label="ID" prop="id" width="60" />
        <ElTableColumn label="标题" prop="title" show-overflow-tooltip />
      </ElTable>
    </ElCard>

    <ElRow :gutter="16">
      <ElCol :md="12" :xs="24">
        <ElCard class="mb-4">
          <template #header>
            <span class="text-base font-medium">模拟接口 - 成功响应</span>
          </template>
          <p class="mb-3 text-sm text-[var(--el-text-color-secondary)]">
            模拟登录接口，延迟1.5秒后返回成功数据
          </p>
          <ElButton :loading="mockApiLoading" type="primary" @click="callMockApi">
            调用登录接口
          </ElButton>
          <pre v-if="mockResult && !mockResult.includes('401')" class="response-block mt-4">{{ mockResult }}</pre>
        </ElCard>
      </ElCol>
      <ElCol :md="12" :xs="24">
        <ElCard class="mb-4">
          <template #header>
            <span class="text-base font-medium">模拟接口 - 错误处理</span>
          </template>
          <p class="mb-3 text-sm text-[var(--el-text-color-secondary)]">
            模拟 token 过期场景，展示错误状态处理
          </p>
          <ElButton :loading="mockApiLoading" type="danger" @click="callErrorApi">
            调用过期接口
          </ElButton>
          <pre v-if="mockResult && mockResult.includes('401')" class="response-block mt-4 error">{{ mockResult }}</pre>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<style scoped>
.response-block {
  overflow: auto;
  border-radius: 6px;
  border: 1px solid var(--el-border-color-lighter);
  background-color: var(--el-fill-color-lighter);
  padding: 12px 16px;
  font-size: 13px;
  line-height: 1.6;
}

.response-block.error {
  border-color: var(--el-color-danger-light-5);
  background-color: var(--el-color-danger-light-9);
}
</style>
