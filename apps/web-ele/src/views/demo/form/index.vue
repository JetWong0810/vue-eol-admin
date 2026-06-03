<script lang="ts" setup>
import { reactive, ref } from 'vue';

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
  ElRadio,
  ElRadioGroup,
  ElRow,
  ElSelect,
  ElSwitch,
  ElUpload,
} from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';

const formRef = ref<FormInstance>();
const submitting = ref(false);

const form = reactive({
  name: '',
  category: '',
  price: '',
  stock: '',
  status: 'on',
  enableNotify: true,
  description: '',
  publishDate: '',
  tags: [] as string[],
  cover: [] as any[],
});

const rules: FormRules = {
  name: [
    { required: true, message: '请输入商品名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
  ],
  category: [{ required: true, message: '请选择分类', trigger: 'change' }],
  price: [
    { required: true, message: '请输入价格', trigger: 'blur' },
    { pattern: /^\d+(\.\d{1,2})?$/, message: '请输入正确的价格', trigger: 'blur' },
  ],
  description: [
    { required: true, message: '请输入商品描述', trigger: 'blur' },
    { min: 10, max: 500, message: '长度在 10 到 500 个字符', trigger: 'blur' },
  ],
};

async function handleSubmit() {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (!valid) return;
    submitting.value = true;
    setTimeout(() => {
      submitting.value = false;
      ElMessage.success('提交成功（模拟）');
    }, 1000);
  });
}

function handleReset() {
  formRef.value?.resetFields();
  ElMessage.info('已重置表单');
}
</script>

<template>
  <div class="p-5">
    <ElCard>
      <template #header>
        <span class="text-base font-medium">新增商品</span>
      </template>

      <ElForm
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        style="max-width: 700px"
      >
        <ElFormItem label="商品名称" prop="name">
          <ElInput v-model="form.name" maxlength="50" placeholder="请输入商品名称" show-word-limit />
        </ElFormItem>

        <ElFormItem label="商品分类" prop="category">
          <ElSelect v-model="form.category" placeholder="请选择分类" style="width: 100%">
            <ElOption label="电子产品" value="electronics" />
            <ElOption label="办公用品" value="office" />
            <ElOption label="生活百货" value="daily" />
            <ElOption label="食品饮料" value="food" />
          </ElSelect>
        </ElFormItem>

        <ElRow :gutter="16">
          <ElCol :span="12">
            <ElFormItem label="价格" prop="price">
              <ElInput v-model="form.price" placeholder="0.00">
                <template #prepend>¥</template>
              </ElInput>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="库存" prop="stock">
              <ElInput v-model="form.stock" placeholder="请输入库存数量" />
            </ElFormItem>
          </ElCol>
        </ElRow>

        <ElFormItem label="标签" prop="tags">
          <ElSelect
            v-model="form.tags"
            allow-create
            filterable
            multiple
            placeholder="输入后回车创建标签"
            style="width: 100%"
          >
            <ElOption label="热销" value="hot" />
            <ElOption label="新品" value="new" />
            <ElOption label="推荐" value="recommend" />
            <ElOption label="限时" value="limited" />
          </ElSelect>
        </ElFormItem>

        <ElFormItem label="上架日期" prop="publishDate">
          <ElDatePicker
            v-model="form.publishDate"
            placeholder="选择日期"
            style="width: 100%"
            type="date"
            value-format="YYYY-MM-DD"
          />
        </ElFormItem>

        <ElFormItem label="状态" prop="status">
          <ElRadioGroup v-model="form.status">
            <ElRadio value="on">上架</ElRadio>
            <ElRadio value="off">下架</ElRadio>
            <ElRadio value="draft">草稿</ElRadio>
          </ElRadioGroup>
        </ElFormItem>

        <ElFormItem label="库存提醒">
          <ElSwitch v-model="form.enableNotify" active-text="开启" inactive-text="关闭" />
        </ElFormItem>

        <ElFormItem label="封面图片">
          <ElUpload
            v-model:file-list="form.cover"
            :limit="1"
            accept="image/*"
            action="#"
            list-type="picture-card"
          >
            <span class="text-xs text-[var(--el-text-color-secondary)]">点击上传</span>
          </ElUpload>
        </ElFormItem>

        <ElFormItem label="商品描述" prop="description">
          <ElInput
            v-model="form.description"
            :rows="4"
            maxlength="500"
            placeholder="请详细描述商品信息"
            show-word-limit
            type="textarea"
          />
        </ElFormItem>

        <ElFormItem>
          <div class="flex gap-3">
            <ElButton :loading="submitting" type="primary" @click="handleSubmit">
              提交
            </ElButton>
            <ElButton @click="handleReset">重置</ElButton>
          </div>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </div>
</template>
