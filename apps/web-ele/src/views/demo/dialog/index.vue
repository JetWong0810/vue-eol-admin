<script lang="ts" setup>
import { reactive, ref } from 'vue';

import {
  ElButton,
  ElCard,
  ElCol,
  ElDialog,
  ElDrawer,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElMessageBox,
  ElOption,
  ElRow,
  ElSelect,
  ElTable,
  ElTableColumn,
} from 'element-plus';

const dialogVisible = ref(false);
const drawerVisible = ref(false);
const nestedOuterVisible = ref(false);
const nestedInnerVisible = ref(false);
const fullscreenVisible = ref(false);

const editForm = reactive({
  name: '',
  category: '',
  price: '',
  description: '',
});

function openEditDialog() {
  editForm.name = 'MacBook Pro';
  editForm.category = 'electronics';
  editForm.price = '18999';
  editForm.description = '高性能笔记本电脑';
  dialogVisible.value = true;
}

function handleDialogConfirm() {
  dialogVisible.value = false;
  ElMessage.success('保存成功（模拟）');
}

function handleConfirmBox() {
  ElMessageBox.confirm('确定要执行此操作吗？此操作不可逆。', '操作确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => ElMessage.success('操作成功'))
    .catch(() => ElMessage.info('已取消'));
}

function handlePromptBox() {
  ElMessageBox.prompt('请输入备注信息', '填写备注', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /.{2,}/,
    inputErrorMessage: '请输入至少2个字符',
  })
    .then(({ value }) => ElMessage.success(`备注: ${value}`))
    .catch(() => {});
}

const drawerData = ref([
  { id: 1, name: '操作日志 1', time: '2024-05-20 14:00' },
  { id: 2, name: '操作日志 2', time: '2024-05-19 10:30' },
  { id: 3, name: '操作日志 3', time: '2024-05-18 09:15' },
]);
</script>

<template>
  <div class="p-5">
    <ElRow :gutter="16">
      <ElCol :md="12" :xs="24">
        <ElCard class="mb-4">
          <template #header>
            <span class="text-base font-medium">Dialog 对话框</span>
          </template>
          <div class="flex flex-wrap gap-3">
            <ElButton type="primary" @click="openEditDialog">表单弹窗</ElButton>
            <ElButton type="success" @click="fullscreenVisible = true">全屏弹窗</ElButton>
            <ElButton type="warning" @click="nestedOuterVisible = true">嵌套弹窗</ElButton>
          </div>
        </ElCard>
      </ElCol>
      <ElCol :md="12" :xs="24">
        <ElCard class="mb-4">
          <template #header>
            <span class="text-base font-medium">MessageBox 消息弹框</span>
          </template>
          <div class="flex flex-wrap gap-3">
            <ElButton type="danger" @click="handleConfirmBox">确认框</ElButton>
            <ElButton type="primary" @click="handlePromptBox">输入框</ElButton>
            <ElButton @click="ElMessageBox.alert('这是一条提示信息', '提示')">提示框</ElButton>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElCard>
      <template #header>
        <span class="text-base font-medium">Drawer 抽屉</span>
      </template>
      <div class="flex flex-wrap gap-3">
        <ElButton type="primary" @click="drawerVisible = true">打开抽屉（含列表）</ElButton>
      </div>
    </ElCard>

    <!-- 表单对话框 -->
    <ElDialog v-model="dialogVisible" title="编辑商品" width="500px">
      <ElForm :model="editForm" label-width="80px">
        <ElFormItem label="名称">
          <ElInput v-model="editForm.name" />
        </ElFormItem>
        <ElFormItem label="分类">
          <ElSelect v-model="editForm.category" style="width: 100%">
            <ElOption label="电子产品" value="electronics" />
            <ElOption label="办公用品" value="office" />
            <ElOption label="生活百货" value="daily" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="价格">
          <ElInput v-model="editForm.price">
            <template #prepend>¥</template>
          </ElInput>
        </ElFormItem>
        <ElFormItem label="描述">
          <ElInput v-model="editForm.description" :rows="3" type="textarea" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="dialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="handleDialogConfirm">保存</ElButton>
      </template>
    </ElDialog>

    <!-- 全屏对话框 -->
    <ElDialog v-model="fullscreenVisible" fullscreen title="全屏弹窗示例">
      <div class="flex h-64 items-center justify-center">
        <p class="text-lg text-[var(--el-text-color-secondary)]">全屏内容区域，适合复杂操作场景</p>
      </div>
      <template #footer>
        <ElButton @click="fullscreenVisible = false">关闭</ElButton>
      </template>
    </ElDialog>

    <!-- 嵌套对话框 -->
    <ElDialog v-model="nestedOuterVisible" title="外层弹窗" width="600px">
      <p class="mb-4">这是外层弹窗内容。点击下方按钮打开嵌套的内层弹窗。</p>
      <ElButton type="primary" @click="nestedInnerVisible = true">打开内层弹窗</ElButton>
      <ElDialog v-model="nestedInnerVisible" append-to-body title="内层弹窗" width="400px">
        <p>这是嵌套的内层弹窗。适用于需要二次确认或补充信息的场景。</p>
        <template #footer>
          <ElButton type="primary" @click="nestedInnerVisible = false">确定</ElButton>
        </template>
      </ElDialog>
      <template #footer>
        <ElButton @click="nestedOuterVisible = false">关闭</ElButton>
      </template>
    </ElDialog>

    <!-- 抽屉 -->
    <ElDrawer v-model="drawerVisible" size="450px" title="操作日志">
      <ElTable :data="drawerData" stripe>
        <ElTableColumn label="ID" prop="id" width="60" />
        <ElTableColumn label="内容" prop="name" />
        <ElTableColumn label="时间" prop="time" width="160" />
      </ElTable>
    </ElDrawer>
  </div>
</template>
