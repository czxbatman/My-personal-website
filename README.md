# My Personal Website

泽鑫的个人作品集：以真实项目、学习记录与截图证据展示 Building with AI 的过程。

## Highlights

- 多场景作品集：AI Builder 手记、Reactor Lab、Blueprint System、Night-shift Test、Checklist Utility 与 Code Notebook。
- 七个项目记录、26 张学习与开发截图，以及可打印的在线简历。
- 首页、关于与近况共用成长记录；新增金砖备赛与 Desktop Helicopter 项目详情。
- 首页左右分区：右侧 3D 飞行展示，停机拖动旋转；六个控制入口和空白处指点飞行。内容页和手机采用底部可展开入口。
- 飞行模型与控制逻辑源自 Desktop Helicopter V5.0.3，网页不接入桌面系统或本地笔记；模型加载失败提供静态图。
- React、TypeScript、Vite、Tailwind CSS 与 Framer Motion 构建。

## Local development

```bash
pnpm install
pnpm dev
```

## Production build

```bash
pnpm build
```

飞行控制回归检查（使用现有 Node 与项目依赖）：

```bash
node tools/test-helicopter.mjs
```

`main` 推送到 GitHub 后由现有 Cloudflare Pages 项目自动部署。

构建缓存、验收截图与产物不提交；页面图片位于 `public/images/`。

## Police aviation experience

- 基线 `f8a29dd`；首页保留交互式飞行展示，进入内容页后控制台自动收为小窗，释放阅读宽度。
- 出场、起飞、巡逻、搜索和指点飞行使用统一警航主题；返航、降落期间保持主题，控制器确认停稳后恢复当前路由与用户主题。飞行中收起会先返航。
- 手机上默认停机，不自动飞入；系统减少动态效果时不自动出场，警航灯带停止动画。加载失败提供静态模型。
- 项目索引支持关键词与标签组合筛选、卡片/列表切换、结果计数和一键重置；URL 保留筛选，返回列表可继续浏览。

浏览器回归（复用已安装的 Playwright 和 Microsoft Edge，不自动安装）：

```powershell
# 若 Playwright 不在当前项目模块路径，指向本机已有模块的 file URL。
$env:PLAYWRIGHT_MODULE = 'file:///absolute/path/to/playwright/index.mjs'
node tools/test-flight-browser.mjs
```

默认测试地址为 `http://127.0.0.1:5173`，可通过 `TEST_URL` 指定本地预览地址。截图和检查结果写入已忽略的 `shots/`。覆盖主题切换与恢复、指点/返航、跨页飞行、项目筛选、手机布局、减少动态效果和模型失败降级。
