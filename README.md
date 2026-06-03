# Vue EOL Admin

基于 [Vben Admin](https://github.com/vbenjs/vue-vben-admin) 定制的内部后台管理系统，采用 Vue 3 + Element Plus 技术栈。

## 技术栈

- Vue 3 (Composition API)
- Element Plus 组件库
- TypeScript
- Tailwind CSS
- Pinia 状态管理
- Vue Router
- VxeTable 高性能表格
- Vite 构建工具
- pnpm + Turborepo (Monorepo)

## 环境要求

| 工具 | 版本要求 |
| --- | --- |
| Node.js | ^22.18.0 \|\| ^24.0.0 |
| pnpm | >= 11.0.0 |
| Git | 最新版 |
| IDE | VS Code (推荐) |

## 本地启动

```bash
# 1. 安装 Node.js (推荐使用 nvm)
nvm install 22.22.0
nvm use 22.22.0

# 2. 启用 pnpm
corepack enable

# 3. 安装依赖
pnpm install

# 4. 启动开发服务
pnpm dev:ele

# 5. 访问
# 主应用: http://localhost:5777
# 默认账号: vben / 123456
```

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `pnpm dev:ele` | 启动主应用开发服务 (端口 5777) |
| `pnpm dev:play` | 启动 Playground 组件示例 |
| `pnpm build:ele` | 构建主应用 (生产环境) |
| `pnpm lint` | 代码检查 (ESLint + OxLint) |
| `pnpm format` | 代码格式化 |
| `pnpm check:type` | TypeScript 类型检查 |
| `pnpm clean` | 清理 node_modules 和 dist |
| `pnpm reinstall` | 清理后重新安装依赖 |

## 项目结构

```
vue-vben-admin/
├── apps/                       # 应用层
│   ├── web-ele/                # 主应用 (Vue + Element Plus)
│   │   ├── src/
│   │   │   ├── api/            # 接口定义
│   │   │   ├── layouts/        # 布局
│   │   │   ├── router/         # 路由配置
│   │   │   │   └── routes/
│   │   │   │       └── modules/  # 路由模块 (自动扫描)
│   │   │   ├── store/          # Pinia 状态管理
│   │   │   ├── views/          # 页面组件
│   │   │   └── preferences.ts  # 偏好设置
│   │   ├── .env                # 通用环境变量
│   │   ├── .env.development    # 开发环境变量
│   │   └── .env.production     # 生产环境变量
│   └── backend-mock/           # Mock API 服务 (Nitro)
├── packages/                   # 共享包层
│   ├── @core/                  # 核心底层包
│   │   ├── base/design         # CSS 变量、主题
│   │   ├── base/icons          # 图标组件
│   │   ├── base/shared         # 底层工具函数
│   │   ├── composables         # Vue 组合式函数
│   │   ├── preferences         # 偏好设置核心
│   │   └── ui-kit/             # UI 组件 (form/layout/menu/popup/tabs)
│   ├── effects/                # 效果层 (带 UI 的业务组件)
│   │   ├── access              # 权限控制
│   │   ├── common-ui           # 通用业务组件
│   │   ├── hooks               # 业务 Composables
│   │   ├── layouts             # 布局系统
│   │   ├── plugins             # 插件 (ECharts/VxeTable)
│   │   └── request             # HTTP 请求封装
│   ├── constants               # 全局常量
│   ├── icons                   # 图标注册
│   ├── locales                 # 国际化
│   ├── stores                  # 全局 Store
│   ├── utils                   # 工具函数
│   └── ...
├── internal/                   # 内部构建工具链
│   ├── lint-configs/           # ESLint/Stylelint/Commitlint 配置
│   ├── tailwind-config         # Tailwind CSS 配置
│   ├── tsconfig                # TypeScript 配置
│   └── vite-config             # Vite 构建配置
├── playground/                 # 组件示例参考库
├── scripts/                    # CLI 脚本工具
├── pnpm-workspace.yaml         # 工作空间配置
└── turbo.json                  # Turborepo 任务编排
```

## 开发指南

项目内置了完整的开发指南页面，启动后可在侧边栏「开发指南」中查看：

- **目录结构** — 项目整体架构说明
- **快速开始** — 环境搭建和启动步骤
- **项目规范** — 命名约定、代码风格、Git 提交规范
- **菜单与路由** — 如何添加菜单页面
- **权限控制** — 前端/后端/混合权限模式
- **HTTP 请求** — 接口封装和 Mock 使用
- **组件使用** — 表单/表格/弹窗等组件用法
- **相关链接** — 框架文档和技术栈参考

## 新增业务模块

```bash
# 1. 定义接口
apps/web-ele/src/api/[模块名]/index.ts

# 2. 创建页面
apps/web-ele/src/views/[模块名]/index.vue

# 3. 配置路由 (自动加载，无需手动注册)
apps/web-ele/src/router/routes/modules/[模块名].ts
```

## 环境变量

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `VITE_PORT` | 开发服务端口 | 5777 |
| `VITE_GLOB_API_URL` | 接口基础路径 | /api |
| `VITE_NITRO_MOCK` | 是否启用 Mock 服务 | true |
| `VITE_DEVTOOLS` | 是否打开 Vue DevTools | false |

## Mock 服务

开发环境默认启用 Nitro Mock 服务，接口文件位于 `apps/backend-mock/api/`，文件路径即接口路径：

| 文件名 | HTTP 方法 | 接口路径 |
| --- | --- | --- |
| `api/user/info.ts` | GET | /api/user/info |
| `api/auth/login.post.ts` | POST | /api/auth/login |
| `api/order/[id].delete.ts` | DELETE | /api/order/:id |

切换为真实后端：修改 `.env.development` 中 `VITE_NITRO_MOCK=false` 并设置 `VITE_GLOB_API_URL` 为后端地址。
