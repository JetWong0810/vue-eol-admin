<script lang="ts" setup>
import { ref } from 'vue';

import {
  ElButton,
  ElCard,
  ElCol,
  ElDescriptions,
  ElDescriptionsItem,
  ElDivider,
  ElImage,
  ElRow,
  ElStep,
  ElSteps,
  ElTag,
  ElTimeline,
  ElTimelineItem,
} from 'element-plus';

const activeStep = ref(2);

const product = {
  name: 'MacBook Pro 16 英寸 M3 Max',
  id: 'SPU-2024031500001',
  category: '电子产品',
  brand: 'Apple',
  price: '¥27,999.00',
  originalPrice: '¥29,999.00',
  stock: 128,
  sales: 3560,
  status: '上架',
  weight: '2.14 kg',
  createdAt: '2024-03-15 10:30:00',
  updatedAt: '2024-05-20 14:22:00',
  description: '搭载 Apple M3 Max 芯片，配备 36GB 统一内存和 1TB 固态硬盘。16.2 英寸 Liquid Retina XDR 显示屏，峰值亮度可达 1600 尼特。',
};

const logs = [
  { time: '2024-05-20 14:22', action: '修改价格', user: '管理员' },
  { time: '2024-04-10 09:15', action: '更新库存 +50', user: '仓管员' },
  { time: '2024-03-20 16:00', action: '商品上架', user: '运营' },
  { time: '2024-03-15 10:30', action: '创建商品', user: '管理员' },
];
</script>

<template>
  <div class="p-5">
    <ElCard class="mb-4">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-base font-medium">商品详情</span>
          <div class="flex gap-2">
            <ElButton type="primary">编辑</ElButton>
            <ElButton>返回列表</ElButton>
          </div>
        </div>
      </template>

      <ElRow :gutter="24">
        <ElCol :md="8" :xs="24">
          <ElImage
            :preview-src-list="['https://picsum.photos/400/400']"
            fit="cover"
            src="https://picsum.photos/400/400"
            style="width: 100%; border-radius: 8px"
          />
        </ElCol>
        <ElCol :md="16" :xs="24">
          <h2 class="mb-2 text-xl font-semibold">{{ product.name }}</h2>
          <p class="mb-4 text-sm text-[var(--el-text-color-secondary)]">{{ product.description }}</p>
          <div class="mb-4 flex items-baseline gap-3">
            <span class="text-2xl font-bold text-[var(--el-color-danger)]">{{ product.price }}</span>
            <span class="text-sm text-[var(--el-text-color-placeholder)] line-through">{{ product.originalPrice }}</span>
          </div>
          <ElDescriptions :column="2" border size="small">
            <ElDescriptionsItem label="商品编号">{{ product.id }}</ElDescriptionsItem>
            <ElDescriptionsItem label="分类">{{ product.category }}</ElDescriptionsItem>
            <ElDescriptionsItem label="品牌">{{ product.brand }}</ElDescriptionsItem>
            <ElDescriptionsItem label="重量">{{ product.weight }}</ElDescriptionsItem>
            <ElDescriptionsItem label="库存">{{ product.stock }}</ElDescriptionsItem>
            <ElDescriptionsItem label="销量">{{ product.sales }}</ElDescriptionsItem>
            <ElDescriptionsItem label="状态">
              <ElTag type="success">{{ product.status }}</ElTag>
            </ElDescriptionsItem>
            <ElDescriptionsItem label="创建时间">{{ product.createdAt }}</ElDescriptionsItem>
          </ElDescriptions>
        </ElCol>
      </ElRow>
    </ElCard>

    <ElRow :gutter="16">
      <ElCol :md="12" :xs="24">
        <ElCard class="mb-4">
          <template #header>
            <span class="text-base font-medium">物流进度</span>
          </template>
          <ElSteps :active="activeStep" align-center>
            <ElStep description="2024-03-15" title="创建订单" />
            <ElStep description="2024-03-16" title="仓库发货" />
            <ElStep description="2024-03-18" title="运输中" />
            <ElStep description="" title="已送达" />
          </ElSteps>
        </ElCard>
      </ElCol>
      <ElCol :md="12" :xs="24">
        <ElCard class="mb-4">
          <template #header>
            <span class="text-base font-medium">操作日志</span>
          </template>
          <ElTimeline>
            <ElTimelineItem
              v-for="log in logs"
              :key="log.time"
              :timestamp="log.time"
              placement="top"
            >
              <p>{{ log.action }} <span class="text-xs text-[var(--el-text-color-secondary)]">— {{ log.user }}</span></p>
            </ElTimelineItem>
          </ElTimeline>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>
