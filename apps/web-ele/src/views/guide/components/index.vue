<script lang="ts" setup>
import { ref } from 'vue';

import {
  ElAlert,
  ElButton,
  ElCard,
  ElCol,
  ElDivider,
  ElRow,
  ElTag,
} from 'element-plus';

const components = ref([
  {
    name: '表单 (Form)',
    path: 'playground/src/views/examples/form/',
    desc: '基础表单、查询表单、动态表单、表单验证、自定义布局等',
    files: [
      'basic.vue - 基础表单',
      'query.vue - 查询表单(带展开收起)',
      'rules.vue - 表单验证',
      'dynamic.vue - 动态增减字段',
      'custom-layout.vue - 自定义布局',
      'api.vue - API异步数据',
    ],
  },
  {
    name: '表格 (VxeTable)',
    path: 'playground/src/views/examples/vxe-table/',
    desc: '基础表格、远程数据、树形表格、固定列、自定义单元格、可编辑表格',
    files: [
      'basic.vue - 基础表格',
      'remote.vue - 远程分页加载',
      'tree.vue - 树形表格',
      'fixed.vue - 固定列',
      'custom-cell.vue - 自定义单元格渲染',
      'edit-cell.vue - 单元格编辑',
      'edit-row.vue - 行编辑',
      'form.vue - 表格+搜索表单组合',
    ],
  },
  {
    name: '弹窗 (Modal)',
    path: 'playground/src/views/examples/modal/',
    desc: '基础弹窗、自适应高度、表单弹窗、嵌套弹窗、数据传递',
    files: [
      'base-demo.vue - 基础用法',
      'auto-height-demo.vue - 自适应高度',
      'form-modal-demo.vue - 表单弹窗',
      'shared-data-demo.vue - 父子数据传递',
      'nested-demo.vue - 嵌套弹窗',
      'dynamic-demo.vue - 动态内容',
    ],
  },
  {
    name: '抽屉 (Drawer)',
    path: 'playground/src/views/examples/drawer/',
    desc: '基础抽屉、表单抽屉、自适应高度、数据传递',
    files: [
      'base-demo.vue - 基础用法',
      'form-drawer-demo.vue - 表单抽屉',
      'auto-height-demo.vue - 自适应高度',
      'shared-data-demo.vue - 数据传递',
    ],
  },
  {
    name: '富文本 (Tiptap)',
    path: 'playground/src/views/examples/tiptap/',
    desc: '基于 Tiptap 的富文本编辑器',
    files: ['index.vue - 完整示例'],
  },
  {
    name: '验证码 (Captcha)',
    path: 'playground/src/views/examples/captcha/',
    desc: '滑块验证、旋转验证、点选验证等',
    files: [
      'slider-captcha.vue - 滑块验证',
      'slider-rotate-captcha.vue - 旋转验证',
      'point-selection-captcha.vue - 点选验证',
    ],
  },
]);
</script>

<template>
  <div class="p-5">
    <h2 class="mb-5 text-xl font-semibold">组件使用指南</h2>

    <ElAlert
      :closable="false"
      class="mb-4"
      title="Playground 组件示例"
      type="info"
    >
      <template #default>
        <p>
          项目保留了 <ElTag size="small">playground</ElTag>
          目录作为组件参考示例库。
        </p>
        <p>
          启动命令:
          <code class="inline-code">pnpm dev:play</code>
        </p>
        <p>所有示例代码均可直接复制到 web-ele 项目中使用。</p>
      </template>
    </ElAlert>

    <ElCard class="mb-4" header="如何使用 Playground 示例">
      <ol class="list-inside list-decimal space-y-3">
        <li>
          <strong>启动 playground 查看效果:</strong>
          <code class="ml-2 inline-code">pnpm dev:play</code>
          ，浏览器访问查看组件交互效果
        </li>
        <li>
          <strong>找到对应源码:</strong> 在
          <code class="inline-code"
            >playground/src/views/examples/</code
          >
          下找到对应组件目录
        </li>
        <li>
          <strong>复制到业务项目:</strong> 将 .vue 文件复制到
          <code class="inline-code"
            >apps/web-ele/src/views/</code
          >
          对应位置
        </li>
        <li>
          <strong>调整 import 路径:</strong> playground 和 web-ele 使用相同的
          <code class="inline-code">#/</code>
          路径别名，大部分代码可直接使用
        </li>
      </ol>
    </ElCard>

    <ElDivider content-position="left">可用组件列表</ElDivider>

    <ElRow :gutter="16">
      <ElCol v-for="comp in components" :key="comp.name" :span="12">
        <ElCard class="mb-4">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-bold">{{ comp.name }}</span>
              <ElTag size="small" type="info">{{ comp.path }}</ElTag>
            </div>
          </template>
          <p class="mb-2 text-[var(--el-text-color-secondary)]">{{ comp.desc }}</p>
          <ul class="list-inside list-disc space-y-1 text-sm">
            <li v-for="file in comp.files" :key="file">
              <code>{{ file }}</code>
            </li>
          </ul>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElDivider content-position="left">核心组件使用示例</ElDivider>

    <!-- Modal 示例 -->
    <ElCard class="mb-4" header="弹窗组件 useVbenModal 用法">
      <pre class="code-block"><code>&lt;!-- 1. 定义弹窗内容组件: UserFormModal.vue --&gt;
&lt;script setup&gt;
import { ref } from 'vue';
import { useVbenModal } from '@vben/common-ui';
import { ElForm, ElFormItem, ElInput, ElMessage } from 'element-plus';
import { createUserApi } from '#/api/system/user';

const formData = ref({ username: '', realName: '' });

// 获取弹窗API (子组件内部)
const [Modal, modalApi] = useVbenModal({
  onConfirm: async () => {
    modalApi.lock();  // 锁定按钮防重复提交
    try {
      await createUserApi(formData.value);
      ElMessage.success('创建成功');
      modalApi.close();
    } finally {
      modalApi.lock(false);
    }
  },
  onOpenChange: (isOpen) => {
    if (isOpen) {
      // 弹窗打开时，获取父组件传入的数据
      const data = modalApi.getData();
      if (data) formData.value = { ...data };
    }
  },
});
&lt;/script&gt;

&lt;template&gt;
  &lt;Modal title="新增用户"&gt;
    &lt;ElForm :model="formData"&gt;
      &lt;ElFormItem label="用户名"&gt;
        &lt;ElInput v-model="formData.username" /&gt;
      &lt;/ElFormItem&gt;
      &lt;ElFormItem label="姓名"&gt;
        &lt;ElInput v-model="formData.realName" /&gt;
      &lt;/ElFormItem&gt;
    &lt;/ElForm&gt;
  &lt;/Modal&gt;
&lt;/template&gt;</code></pre>

      <ElDivider />

      <pre class="code-block"><code>&lt;!-- 2. 在父页面中使用 --&gt;
&lt;script setup&gt;
import { useVbenModal } from '@vben/common-ui';
import UserFormModal from './UserFormModal.vue';

// 获取弹窗控制API (父组件)
const [Modal, modalApi] = useVbenModal({
  connectedComponent: UserFormModal,
});

function openCreateModal() {
  modalApi.setData({ username: '', realName: '' });  // 传数据
  modalApi.open();
}
&lt;/script&gt;

&lt;template&gt;
  &lt;ElButton @click="openCreateModal"&gt;新增用户&lt;/ElButton&gt;
  &lt;Modal /&gt;
&lt;/template&gt;</code></pre>
    </ElCard>

    <!-- VxeTable 示例 -->
    <ElCard class="mb-4" header="表格组件 VxeTable 基础用法">
      <pre class="code-block"><code>&lt;script setup&gt;
import { ref } from 'vue';
import { useVbenVxeGrid } from '@vben/plugins/vxe-table';
import { getUserListApi } from '#/api/system/user';

// 定义表格
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    columns: [
      { field: 'username', title: '用户名', width: 150 },
      { field: 'realName', title: '姓名', width: 150 },
      { field: 'roles', title: '角色' },
      { field: 'action', title: '操作', width: 200, slots: { default: 'action' } },
    ],
    proxyConfig: {
      ajax: {
        query: async ({ page }) =&gt; {
          const res = await getUserListApi({
            page: page.currentPage,
            pageSize: page.pageSize,
          });
          return { items: res.list, total: res.total };
        },
      },
    },
    pagerConfig: { pageSize: 10 },
  },
});

// 刷新表格
function refresh() {
  gridApi.query();
}
&lt;/script&gt;

&lt;template&gt;
  &lt;Grid&gt;
    &lt;template #action="{ row }"&gt;
      &lt;ElButton size="small" @click="handleEdit(row)"&gt;编辑&lt;/ElButton&gt;
      &lt;ElButton size="small" type="danger" @click="handleDelete(row)"&gt;删除&lt;/ElButton&gt;
    &lt;/template&gt;
  &lt;/Grid&gt;
&lt;/template&gt;</code></pre>
    </ElCard>

    <!-- Form 示例 -->
    <ElCard class="mb-4" header="表单组件 useVbenForm 基础用法">
      <pre class="code-block"><code>&lt;script setup&gt;
import { useVbenForm } from '@vben/common-ui';
import { ElMessage } from 'element-plus';

const [Form, formApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      fieldName: 'username',
      label: '用户名',
      rules: 'required',  // 内置规则
    },
    {
      component: 'Input',
      fieldName: 'email',
      label: '邮箱',
      rules: 'required|email',
    },
    {
      component: 'Select',
      fieldName: 'role',
      label: '角色',
      componentProps: {
        options: [
          { label: '管理员', value: 'admin' },
          { label: '普通用户', value: 'user' },
        ],
      },
    },
  ],
  // 是否显示展开收起
  showCollapseButton: false,
});

async function handleSubmit() {
  const { valid, values } = await formApi.validate();
  if (valid) {
    ElMessage.success(\`提交数据: \${JSON.stringify(values)}\`);
  }
}
&lt;/script&gt;

&lt;template&gt;
  &lt;Form /&gt;
  &lt;ElButton type="primary" @click="handleSubmit"&gt;提交&lt;/ElButton&gt;
&lt;/template&gt;</code></pre>
    </ElCard>

    <ElCard header="注意事项">
      <ul class="list-inside list-disc space-y-2">
        <li>
          playground 的适配层在
          <code class="inline-code"
            >playground/src/adapter/</code
          >
          ，使用的是 antdv-next 组件。web-ele 使用 Element Plus，组件已在
          <code class="inline-code"
            >apps/web-ele/src/adapter/</code
          >
          中适配
        </li>
        <li>
          复制代码时注意:
          <code class="inline-code">useVbenModal</code>
          <code class="inline-code">useVbenForm</code>
          <code class="inline-code">useVbenVxeGrid</code>
          等都是从 adapter 层导出的，web-ele 中可直接使用
        </li>
        <li>
          Element Plus 原生组件可直接导入使用:
          <code class="inline-code"
            >import { ElButton } from 'element-plus'</code
          >
        </li>
        <li>
          图标使用 iconify:
          <code class="inline-code"
            >&lt;Icon icon="lucide:user" /&gt;</code
          >
          ，可在 <ElButton type="primary" link>
            <a
              href="https://icon-sets.iconify.design/"
              target="_blank"
            >
              iconify.design
            </a>
          </ElButton> 查找图标名称
        </li>
      </ul>
    </ElCard>
  </div>
</template>

<style scoped>
.code-block {
  overflow: auto;
  border-radius: 6px;
  border: 1px solid var(--el-border-color-lighter);
  background-color: var(--el-fill-color-lighter);
  padding: 12px 16px;
  font-size: 13px;
  line-height: 1.6;
}

.inline-code {
  border-radius: 4px;
  background-color: var(--el-fill-color-light);
  padding: 2px 6px;
  font-size: 13px;
}
</style>
