# My Personal Website

泽鑫的个人作品集：以真实项目、学习记录与截图证据展示 Building with AI 的过程。

## Highlights

- 多场景作品集：AI Builder 手记、Reactor Lab、Blueprint System、Night-shift Test、Checklist Utility 与 Code Notebook。
- 七个项目记录、26 张学习与开发截图，以及可打印的在线简历。
- 首页、关于与近况共用成长记录；新增金砖备赛与 Desktop Helicopter 项目详情。
- 桌面左右分区：右侧半屏 3D 飞行展示，停机拖动旋转；六个控制入口和空白处指点飞行。手机采用底部可展开入口。
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
