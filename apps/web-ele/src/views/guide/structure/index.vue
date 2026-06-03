<script lang="ts" setup>
import { ElAlert, ElCard, ElDivider, ElTag } from 'element-plus';
</script>

<template>
  <div class="p-5">
    <h2 class="mb-5 text-xl font-semibold">项目目录结构</h2>

    <ElAlert
      :closable="false"
      class="mb-4"
      title="本项目是一个基于 pnpm workspace + turborepo 的 monorepo 架构，各目录职责清晰分离"
      type="info"
    />

    <!-- 顶层结构 -->
    <ElCard class="mb-4" header="顶层目录总览">
      <pre v-pre class="code-block"><code>vue-vben-admin/
├── apps/                   # 应用层 (可部署的完整应用)
│   ├── web-ele/            # 主应用 — Vue + Element Plus 后台管理系统
│   └── backend-mock/       # Mock API 服务 (基于 Nitro)
├── packages/               # 共享包层 (UI无关的核心能力)
│   ├── @core/              # 核心底层包
│   ├── effects/            # 效果层 (带UI的业务组件)
│   └── ...                 # 其他共享包
├── internal/               # 内部构建工具链
├── scripts/                # CLI 脚本工具
├── playground/             # 组件示例参考库
├── package.json            # 根配置 (scripts/devDeps)
├── pnpm-workspace.yaml     # 工作空间 + 依赖 catalog
├── turbo.json              # Turborepo 任务编排
└── vben-admin.code-workspace  # VS Code 工作区</code></pre>
    </ElCard>

    <ElDivider content-position="left">应用层 apps/</ElDivider>

    <ElCard class="mb-4" header="apps/ — 可部署应用">
      <pre v-pre class="code-block"><code>apps/
├── web-ele/                    # 主应用 (你的业务代码写在这里)
│   ├── public/                 # 静态资源
│   ├── src/
│   │   ├── adapter/            # UI组件适配层 (Element Plus → 框架组件)
│   │   │   ├── component/      # 表单组件映射注册
│   │   │   ├── form.ts         # useVbenForm 适配
│   │   │   └── vxe-table.ts    # VxeTable 适配
│   │   ├── api/                # 接口定义
│   │   │   ├── request.ts      # 请求实例 (拦截器/错误处理)
│   │   │   ├── core/           # 核心接口 (auth/user/menu)
│   │   │   └── [模块名]/       # 业务接口 (按模块分目录)
│   │   ├── layouts/            # 布局入口
│   │   ├── locales/            # 国际化语言包
│   │   │   └── langs/
│   │   │       ├── zh-CN/      # 中文
│   │   │       └── en-US/      # 英文
│   │   ├── router/             # 路由
│   │   │   ├── access.ts       # 权限路由生成逻辑
│   │   │   ├── guard.ts        # 路由守卫
│   │   │   └── routes/
│   │   │       └── modules/    # 路由模块 (自动扫描加载)
│   │   ├── store/              # Pinia 状态管理
│   │   ├── views/              # 页面组件 (对应路由)
│   │   │   ├── _core/          # 核心页面 (登录/404/403/个人中心)
│   │   │   ├── guide/          # 开发指南页
│   │   │   └── [模块名]/       # 业务页面 (按模块分目录)
│   │   ├── bootstrap.ts        # 应用启动入口
│   │   └── preferences.ts      # 偏好设置覆盖
│   ├── .env                    # 通用环境变量
│   ├── .env.development        # 开发环境变量
│   ├── .env.production         # 生产环境变量
│   └── vite.config.ts          # Vite 配置
│
└── backend-mock/               # Mock API 服务
    ├── api/                    # 工具函数
    ├── middleware/             # 中间件 (CORS/Auth验证)
    ├── routes/                 # 接口路由 (对应前端api)
    └── utils/                  # 数据模拟工具</code></pre>

      <ElAlert
        :closable="false"
        class="mt-3"
        type="warning"
        title="日常开发主要在 apps/web-ele/src/ 下工作，新增业务只需关注 api/ + views/ + router/routes/modules/ 三个目录"
      />
    </ElCard>

    <ElDivider content-position="left">共享包层 packages/</ElDivider>

    <ElCard class="mb-4" header="packages/@core/ — 核心底层包 (一般不需要修改)">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b">
            <th class="p-2 text-left">目录</th>
            <th class="p-2 text-left">包名</th>
            <th class="p-2 text-left">职责</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="p-2"><code>@core/base/design</code></td>
            <td class="p-2"><ElTag size="small">@vben-core/design</ElTag></td>
            <td class="p-2">CSS 变量、主题 token、设计系统基础</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>@core/base/icons</code></td>
            <td class="p-2"><ElTag size="small">@vben-core/icons</ElTag></td>
            <td class="p-2">SVG 图标组件</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>@core/base/shared</code></td>
            <td class="p-2"><ElTag size="small">@vben-core/shared</ElTag></td>
            <td class="p-2">底层工具函数 (与 UI 无关)</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>@core/base/typings</code></td>
            <td class="p-2"><ElTag size="small">@vben-core/typings</ElTag></td>
            <td class="p-2">全局 TypeScript 类型定义</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>@core/composables</code></td>
            <td class="p-2"><ElTag size="small">@vben-core/composables</ElTag></td>
            <td class="p-2">Vue 组合式函数 (useScrollLock 等)</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>@core/preferences</code></td>
            <td class="p-2"><ElTag size="small">@vben-core/preferences</ElTag></td>
            <td class="p-2">偏好设置核心 (默认值/类型/存取逻辑)</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>@core/ui-kit/form-ui</code></td>
            <td class="p-2"><ElTag size="small">@vben-core/form-ui</ElTag></td>
            <td class="p-2">通用表单 UI 组件</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>@core/ui-kit/layout-ui</code></td>
            <td class="p-2"><ElTag size="small">@vben-core/layout-ui</ElTag></td>
            <td class="p-2">布局 UI 组件</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>@core/ui-kit/menu-ui</code></td>
            <td class="p-2"><ElTag size="small">@vben-core/menu-ui</ElTag></td>
            <td class="p-2">菜单 UI 组件</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>@core/ui-kit/popup-ui</code></td>
            <td class="p-2"><ElTag size="small">@vben-core/popup-ui</ElTag></td>
            <td class="p-2">弹窗/抽屉 UI 组件 (Modal/Drawer)</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>@core/ui-kit/shadcn-ui</code></td>
            <td class="p-2"><ElTag size="small">@vben-core/shadcn-ui</ElTag></td>
            <td class="p-2">基础 UI 组件 (Button/Input/Tooltip 等)</td>
          </tr>
          <tr>
            <td class="p-2"><code>@core/ui-kit/tabs-ui</code></td>
            <td class="p-2"><ElTag size="small">@vben-core/tabs-ui</ElTag></td>
            <td class="p-2">标签页 UI 组件</td>
          </tr>
        </tbody>
      </table>
    </ElCard>

    <ElCard class="mb-4" header="packages/effects/ — 效果层 (带 UI 交互的业务组件)">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b">
            <th class="p-2 text-left">目录</th>
            <th class="p-2 text-left">包名</th>
            <th class="p-2 text-left">职责</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="p-2"><code>effects/access</code></td>
            <td class="p-2"><ElTag size="small">@vben/access</ElTag></td>
            <td class="p-2">权限控制 (路由守卫/v-access 指令/AccessControl 组件)</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>effects/common-ui</code></td>
            <td class="p-2"><ElTag size="small">@vben/common-ui</ElTag></td>
            <td class="p-2">通用业务组件 (登录页/useVbenModal/useVbenForm)</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>effects/hooks</code></td>
            <td class="p-2"><ElTag size="small">@vben/hooks</ElTag></td>
            <td class="p-2">业务 Composables (useWatermark/useAppConfig 等)</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>effects/layouts</code></td>
            <td class="p-2"><ElTag size="small">@vben/layouts</ElTag></td>
            <td class="p-2">布局系统 (侧边栏/头部/偏好面板)</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>effects/plugins</code></td>
            <td class="p-2"><ElTag size="small">@vben/plugins</ElTag></td>
            <td class="p-2">插件 (ECharts/水印/VxeTable)</td>
          </tr>
          <tr>
            <td class="p-2"><code>effects/request</code></td>
            <td class="p-2"><ElTag size="small">@vben/request</ElTag></td>
            <td class="p-2">HTTP 请求封装 (RequestClient/拦截器/SSE)</td>
          </tr>
        </tbody>
      </table>
    </ElCard>

    <ElCard class="mb-4" header="packages/ 其他共享包">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b">
            <th class="p-2 text-left">目录</th>
            <th class="p-2 text-left">包名</th>
            <th class="p-2 text-left">职责</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="p-2"><code>constants</code></td>
            <td class="p-2"><ElTag size="small">@vben/constants</ElTag></td>
            <td class="p-2">全局常量 (URL/登录路径等)</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>icons</code></td>
            <td class="p-2"><ElTag size="small">@vben/icons</ElTag></td>
            <td class="p-2">图标注册和导出</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>locales</code></td>
            <td class="p-2"><ElTag size="small">@vben/locales</ElTag></td>
            <td class="p-2">国际化核心 (i18n 初始化/语言包加载)</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>preferences</code></td>
            <td class="p-2"><ElTag size="small">@vben/preferences</ElTag></td>
            <td class="p-2">偏好设置高层 API</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>stores</code></td>
            <td class="p-2"><ElTag size="small">@vben/stores</ElTag></td>
            <td class="p-2">全局 Pinia Store (access/user/tabbar)</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>styles</code></td>
            <td class="p-2"><ElTag size="small">@vben/styles</ElTag></td>
            <td class="p-2">样式适配 (src/ele/ 为 Element Plus 样式)</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>types</code></td>
            <td class="p-2"><ElTag size="small">@vben/types</ElTag></td>
            <td class="p-2">业务 TypeScript 类型</td>
          </tr>
          <tr>
            <td class="p-2"><code>utils</code></td>
            <td class="p-2"><ElTag size="small">@vben/utils</ElTag></td>
            <td class="p-2">工具函数 (树形处理/路由生成/存储等)</td>
          </tr>
        </tbody>
      </table>
    </ElCard>

    <ElDivider content-position="left">构建工具层 internal/</ElDivider>

    <ElCard class="mb-4" header="internal/ — 内部工具链 (一般不需要修改)">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b">
            <th class="p-2 text-left">目录</th>
            <th class="p-2 text-left">职责</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="p-2"><code>lint-configs/commitlint-config</code></td>
            <td class="p-2">Git commit 消息规则</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>lint-configs/eslint-config</code></td>
            <td class="p-2">ESLint 规则集</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>lint-configs/oxfmt-config</code></td>
            <td class="p-2">oxfmt 格式化规则</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>lint-configs/oxlint-config</code></td>
            <td class="p-2">oxlint 规则</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>lint-configs/stylelint-config</code></td>
            <td class="p-2">Stylelint CSS 规则</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>node-utils</code></td>
            <td class="p-2">Node.js 工具 (workspace 信息/git 操作)</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>tailwind-config</code></td>
            <td class="p-2">Tailwind CSS 4 共享配置</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>tsconfig</code></td>
            <td class="p-2">TypeScript 配置基准 (各包 extends)</td>
          </tr>
          <tr>
            <td class="p-2"><code>vite-config</code></td>
            <td class="p-2">Vite 构建配置封装 (插件/env/proxy)</td>
          </tr>
        </tbody>
      </table>
    </ElCard>

    <ElDivider content-position="left">脚本与工具</ElDivider>

    <ElCard class="mb-4" header="scripts/ 与 playground/">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b">
            <th class="p-2 text-left">目录</th>
            <th class="p-2 text-left">职责</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="p-2"><code>scripts/turbo-run</code></td>
            <td class="p-2">交互式选择 turbo 任务的 CLI 工具</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>scripts/vsh</code></td>
            <td class="p-2">自定义命令集 (lint/check-dep/check-circular/publint)</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>scripts/deploy</code></td>
            <td class="p-2">Docker 部署 (Dockerfile/nginx.conf/构建脚本)</td>
          </tr>
          <tr>
            <td class="p-2"><code>playground/</code></td>
            <td class="p-2">组件示例库 (表单/表格/弹窗/抽屉等完整 demo)</td>
          </tr>
        </tbody>
      </table>
    </ElCard>

    <ElDivider content-position="left">根目录配置文件</ElDivider>

    <ElCard class="mb-4" header="根目录配置文件说明">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b">
            <th class="p-2 text-left">文件</th>
            <th class="p-2 text-left">说明</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="p-2"><code>pnpm-workspace.yaml</code></td>
            <td class="p-2">工作空间包路径 + 公共依赖版本 catalog</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>turbo.json</code></td>
            <td class="p-2">Turborepo 任务依赖与缓存策略</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>package.json</code></td>
            <td class="p-2">根级 scripts + devDependencies</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>eslint.config.mjs</code></td>
            <td class="p-2">ESLint 入口配置</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>stylelint.config.mjs</code></td>
            <td class="p-2">Stylelint 入口配置</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>vitest.config.ts</code></td>
            <td class="p-2">单元测试配置</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>lefthook.yml</code></td>
            <td class="p-2">Git hooks (pre-commit: lint+typecheck)</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>.commitlintrc.js</code></td>
            <td class="p-2">Commit 消息格式校验</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>.node-version</code></td>
            <td class="p-2">指定 Node.js 版本 (22.22.0)</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>.npmrc</code></td>
            <td class="p-2">npm 镜像源配置 (npmmirror)</td>
          </tr>
          <tr>
            <td class="p-2"><code>cspell.json</code></td>
            <td class="p-2">拼写检查词典</td>
          </tr>
        </tbody>
      </table>
    </ElCard>

    <ElDivider content-position="left">依赖关系</ElDivider>

    <ElCard class="mb-4" header="包依赖关系图">
      <pre v-pre class="code-block"><code>
┌─────────────────────────────────────────────────────────────────┐
│  依赖方向: 上层 → 下层 (上层依赖下层，下层不可依赖上层)          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  apps/web-ele (业务应用)                                        │
│       │                                                         │
│       ├──→ packages/effects/*  (带UI的业务组件)                 │
│       │         │                                               │
│       │         ├──→ packages/@core/ui-kit/*  (UI组件)          │
│       │         ├──→ packages/@core/composables                 │
│       │         └──→ packages/@core/preferences                 │
│       │                    │                                    │
│       │                    └──→ packages/@core/base/*  (基础层) │
│       │                                                         │
│       ├──→ packages/stores     (状态管理)                       │
│       ├──→ packages/locales    (国际化)                         │
│       ├──→ packages/utils      (工具函数)                       │
│       └──→ packages/constants  (常量)                           │
│                                                                 │
│  internal/vite-config  → internal/node-utils  (构建层)          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

规则:
• apps/ 可以依赖 packages/ 和 internal/ 的任何包
• packages/effects/ 可以依赖 packages/@core/ 和其他 packages/
• packages/@core/ 只能依赖 packages/@core/base/
• 禁止循环依赖
      </code></pre>
    </ElCard>
  </div>
</template>

<style scoped>
.code-block {
  overflow: auto;
  border-radius: 6px;
  border: 1px solid var(--el-border-color-lighter);
  background-color: var(--el-fill-color-lighter);
  padding: 16px;
  font-size: 13px;
  line-height: 1.6;
}
</style>
