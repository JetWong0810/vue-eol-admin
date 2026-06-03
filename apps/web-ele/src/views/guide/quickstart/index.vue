<script lang="ts" setup>
import { ElAlert, ElCard, ElDivider, ElStep, ElSteps, ElTag } from 'element-plus';
</script>

<template>
  <div class="p-5">
    <h2 class="mb-5 text-xl font-semibold">快速开始</h2>

    <ElAlert
      :closable="false"
      class="mb-4"
      title="本页面帮助新开发人员快速搭建本地开发环境并启动项目"
      type="info"
    />

    <!-- 环境要求 -->
    <ElCard class="mb-4" header="环境要求">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b">
            <th class="p-2 text-left">工具</th>
            <th class="p-2 text-left">版本要求</th>
            <th class="p-2 text-left">说明</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="p-2"><ElTag>Node.js</ElTag></td>
            <td class="p-2">^22.18.0 || ^24.0.0</td>
            <td class="p-2">推荐使用 nvm 管理版本，项目 .node-version 指定为 22.22.0</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><ElTag>pnpm</ElTag></td>
            <td class="p-2">>= 11.0.0</td>
            <td class="p-2">包管理器，项目通过 packageManager 锁定为 pnpm@11.4.0</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><ElTag>Git</ElTag></td>
            <td class="p-2">最新版</td>
            <td class="p-2">代码版本管理</td>
          </tr>
          <tr>
            <td class="p-2"><ElTag>IDE</ElTag></td>
            <td class="p-2">VS Code (推荐)</td>
            <td class="p-2">项目已配置 .vscode 相关设置和推荐扩展</td>
          </tr>
        </tbody>
      </table>
    </ElCard>

    <!-- 启动步骤 -->
    <ElCard class="mb-4" header="本地启动步骤">
      <ElSteps :active="5" direction="vertical" finish-status="success">
        <ElStep title="安装 Node.js">
          <template #description>
            <pre class="code-block mt-2"><code># 推荐使用 nvm (Node Version Manager)
# macOS/Linux 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# 重启终端后，安装项目指定版本
nvm install 22.22.0
nvm use 22.22.0

# 验证
node -v  # v22.22.0</code></pre>
          </template>
        </ElStep>

        <ElStep title="安装 pnpm">
          <template #description>
            <pre class="code-block mt-2"><code># 启用 corepack (Node.js 内置)
corepack enable

# 或手动安装
npm install -g pnpm@11.4.0

# 验证
pnpm -v  # 11.4.0</code></pre>
          </template>
        </ElStep>

        <ElStep title="克隆项目并安装依赖">
          <template #description>
            <pre class="code-block mt-2"><code># 克隆仓库
git clone &lt;仓库地址&gt;
cd vue-vben-admin

# 安装依赖 (首次安装可能需要几分钟)
pnpm install</code></pre>
          </template>
        </ElStep>

        <ElStep title="启动开发服务">
          <template #description>
            <pre class="code-block mt-2"><code># 启动主应用 (Element Plus 版)
pnpm dev:ele

# 启动 playground 组件示例
pnpm dev:play</code></pre>
          </template>
        </ElStep>

        <ElStep title="访问页面">
          <template #description>
            <div class="mt-1 text-sm">
              <p>主应用: <ElTag size="small">http://localhost:5777</ElTag></p>
              <p class="mt-1">
                默认账号:
                <ElTag size="small">vben</ElTag> /
                <ElTag size="small">123456</ElTag>
              </p>
            </div>
          </template>
        </ElStep>
      </ElSteps>
    </ElCard>

    <!-- 常用命令 -->
    <ElCard class="mb-4" header="常用命令速查">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b">
            <th class="p-2 text-left">命令</th>
            <th class="p-2 text-left">说明</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="p-2"><code>pnpm dev:ele</code></td>
            <td class="p-2">启动主应用开发服务 (端口 5777)</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>pnpm dev:play</code></td>
            <td class="p-2">启动 Playground 组件示例</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>pnpm build:ele</code></td>
            <td class="p-2">构建主应用 (生产环境)</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>pnpm lint</code></td>
            <td class="p-2">代码检查 (ESLint + OxLint)</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>pnpm format</code></td>
            <td class="p-2">代码格式化</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>pnpm check:type</code></td>
            <td class="p-2">TypeScript 类型检查</td>
          </tr>
          <tr class="border-b">
            <td class="p-2"><code>pnpm clean</code></td>
            <td class="p-2">清理 node_modules 和 dist</td>
          </tr>
          <tr>
            <td class="p-2"><code>pnpm reinstall</code></td>
            <td class="p-2">清理后重新安装依赖 (遇到依赖问题时使用)</td>
          </tr>
        </tbody>
      </table>
    </ElCard>

    <ElDivider content-position="left">环境变量配置</ElDivider>

    <ElCard class="mb-4" header="环境变量文件">
      <div class="space-y-3">
        <div>
          <h4 class="font-bold">.env (通用配置)</h4>
          <pre class="code-block mt-2"><code># 应用标题 (显示在浏览器标签页)
VITE_APP_TITLE=Vben Admin Ele

# 应用命名空间 (localStorage 缓存前缀，区分多项目)
VITE_APP_NAMESPACE=vben-web-ele</code></pre>
        </div>

        <div>
          <h4 class="font-bold">.env.development (开发环境)</h4>
          <pre class="code-block mt-2"><code># 端口号
VITE_PORT=5777

# 接口基础路径 (开发环境默认走本地 Mock)
VITE_GLOB_API_URL=/api

# 是否启用 Nitro Mock 服务 (本地模拟接口)
VITE_NITRO_MOCK=true

# 是否打开 Vue DevTools
VITE_DEVTOOLS=false</code></pre>
        </div>

        <div>
          <h4 class="font-bold">.env.production (生产环境)</h4>
          <pre class="code-block mt-2"><code># 生产环境接口地址 (需改为真实后端地址)
VITE_GLOB_API_URL=https://your-api.example.com/api

# 路由模式: hash 或 history
VITE_ROUTER_HISTORY=hash

# 压缩方式: none, brotli, gzip
VITE_COMPRESS=none</code></pre>
        </div>

        <ElAlert
          :closable="false"
          class="mt-3"
          type="warning"
          title="注意事项"
          description="如需本地覆盖环境变量，可创建 .env.development.local 文件（已被 .gitignore 忽略），不会提交到仓库。"
        />
      </div>
    </ElCard>

    <ElDivider content-position="left">VS Code 配置</ElDivider>

    <ElCard class="mb-4" header="推荐 VS Code 扩展">
      <ul class="list-inside list-disc space-y-1 text-sm">
        <li><strong>Vue - Official</strong> — Vue 3 语言支持 (Volar)</li>
        <li><strong>ESLint</strong> — 代码检查</li>
        <li><strong>Stylelint</strong> — CSS 样式检查</li>
        <li><strong>Tailwind CSS IntelliSense</strong> — Tailwind 类名提示</li>
        <li><strong>Iconify IntelliSense</strong> — 图标名称提示和预览</li>
        <li><strong>i18n Ally</strong> — 国际化翻译管理</li>
        <li><strong>DotENV</strong> — .env 文件语法高亮</li>
      </ul>

      <ElAlert
        :closable="false"
        class="mt-3"
        type="info"
        description="打开项目时 VS Code 会自动提示安装推荐扩展，也可通过命令面板搜索 '@recommended' 查看。"
      />
    </ElCard>

    <ElCard header="常见问题">
      <div class="space-y-4">
        <div>
          <h4 class="font-bold">Q: pnpm install 失败或很慢？</h4>
          <p class="text-sm text-[var(--el-text-color-secondary)]">
            A: 项目已配置 .npmrc 使用 npmmirror 镜像源。如仍然很慢，检查网络或尝试:
          </p>
          <pre class="code-block mt-2"><code>pnpm config set registry https://registry.npmmirror.com</code></pre>
        </div>

        <div>
          <h4 class="font-bold">Q: 启动后页面空白/报错？</h4>
          <p class="text-sm text-[var(--el-text-color-secondary)]">
            A: 清除浏览器 localStorage 缓存（偏好设置会缓存到本地），或使用无痕模式打开。
          </p>
        </div>

        <div>
          <h4 class="font-bold">Q: 修改了 packages/ 下的代码没生效？</h4>
          <p class="text-sm text-[var(--el-text-color-secondary)]">
            A: packages/ 下的包需要重启 dev 服务后生效。修改 apps/web-ele/src/ 下的代码支持 HMR 热更新。
          </p>
        </div>

        <div>
          <h4 class="font-bold">Q: Node 版本不对？</h4>
          <p class="text-sm text-[var(--el-text-color-secondary)]">
            A: 项目要求 Node 22.18+。使用 nvm 切换: <code>nvm use</code> 会自动读取 .node-version 文件。
          </p>
        </div>

        <div>
          <h4 class="font-bold">Q: Git 提交被拒绝？</h4>
          <p class="text-sm text-[var(--el-text-color-secondary)]">
            A: 项目配置了 Git hooks (lefthook)，提交前会运行 lint 和类型检查。
            请确保 <code>pnpm lint</code> 和 <code>pnpm check:type</code> 通过后再提交。
            Commit 消息需符合 Conventional Commits 规范，推荐使用 <code>pnpm commit</code> 交互式生成。
          </p>
        </div>
      </div>
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
</style>
