export const PROJECT_SCENES = ["reactor", "blueprint", "night-shift", "checklist", "notebook", "aviation"] as const
export type ProjectScene = (typeof PROJECT_SCENES)[number]

export interface Project {
  slug: string
  title: string
  tagline: string
  year: string
  status: "进行中" | "已完成" | "探索中"
  role: string
  tags: string[]
  tech: string[]
  emoji: string
  gradient: [string, string]
  cover?: string
  evidence?: string[]
  scene?: ProjectScene
  summary: string
  retro?: { before: string; actual: string; redo: string }
  highlights?: string[]
  links?: { demo?: string; source?: string }
  featured?: boolean
  chapters?: { title: string; text: string }[]
}

export const projects: Project[] = [
  {
    slug: "opc-finance-agent", title: "慧算 · OPC 财务智能体", tagline: "先核对事实，再让工具计算，最后解释结果", year: "2026", status: "进行中",
    role: "项目规划与验收 · AI 辅助实现", tags: ["AI Agent", "竞赛", "Web 应用"],
    tech: ["Python", "Vue 3", "H5", "讯飞星辰", "Workflow", "规则校验", "自动化测试"], emoji: "🧮",
    gradient: ["#173A42", "#4B9893"], scene: "blueprint", featured: true,
    evidence: ["/images/gallery/finance-workflow-debug.jpg", "/images/gallery/finance-submission.jpg"],
    summary: "这是我参与推进的财务 AI 比赛项目，也是一次较完整的需求、设计、开发、测试、部署和演示经历。当前产品是面向一人公司的 H5 演示：针对贸易采购凭证不齐的场景，分别分析增值税与企业所得税的影响，先追问缺少的事实，再确认摘要，最后交给 Python 复算。我提出需求、梳理边界并参与验收，AI 协助实现程序与测试。",
    chapters: [
      { title: "从一个具体问题开始", text: "经营者问“采购缺发票会怎样影响税费”时，不能直接给一个数字。系统先区分企业身份、采购事实、凭证条件与计算口径，再判断哪些事项可以估算、还缺什么资料。年度税费与拟分红是辅助场景，当前没有扩展为完整财务系统。" },
      { title: "Agent 与 Python 怎样分工", text: "自然语言输入 → 事实筛选 → 缺口追问 → 摘要确认 → Python 计算 → 结果解释。Agent 帮助理解表达、组织追问和解释结果；Python 校验参数、支持范围与确认状态，并执行确定性计算。条件不清楚时先停止或追问，不让模型自行补出财务事实。" },
      { title: "我怎样参与交付", text: "我围绕具体场景提出需求、明确输入输出与完成标准，借助 AI 推进后端、H5、测试和部署，再核对程序表现与演示材料。这个过程让我开始理解，代码能运行之后，还需要接口、状态、更正入口、测试和发布相互配合。项目也保留了规则复核与团队协作环节。" },
      { title: "文档记录的进度", text: "截至 2026 年 9 月的项目记录，H5 已部署，支持多轮追问、明确更正、上下文短回答和摘要确认；虚构数据下已有自动化回归与公网流程记录。星辰画布重新发布及对应版本的完整联调仍需分别确认。这些是当时的工程记录，不代表本网站重新验收了财务服务。" },
      { title: "当前边界与下一步", text: "当前用于限定场景的估算演示，不自动核验发票、账簿或申报状态，不自动报税。工程测试、专业规则审签与真实用户反馈需要分别积累；未来才逐步开放经过验证的场景，不将参赛提交或虚构测试包装成获奖与真实业务验证。" },
    ],
    retro: { before: "我最初更关注能不能把功能做出来。", actual: "财务场景让我意识到，事实不明确、规则未确认或用户没有确认摘要时，程序应该先停下来；模型、计算工具和验证要有清楚的分工。", redo: "先把场景边界和验证方式写清楚，再推进实现；材料、截图和程序始终使用同一套进度口径。" },
    highlights: ["自然对话与确定性工具计算分工", "缺口追问、明确更正和摘要确认", "从需求到 H5 发布的工程实践"],
  },
  {
    slug: "brics-ai-training", title: "金砖人工智能应用创新备赛", tagline: "自己搭环境，也学着理解项目为什么能跑", year: "2026", status: "进行中",
    role: "备赛学习 · 环境配置与模块练习", tags: ["竞赛", "计算机视觉", "工程基础"],
    tech: ["Python", "PyTorch", "Ubuntu", "Docker", "ROS2", "Flask / FastAPI", "RAG / Agent"], emoji: "🛠️",
    gradient: ["#203745", "#72A69E"], evidence: ["/images/gallery/brics-compose-smoke.jpg"], scene: "blueprint", featured: true,
    summary: "BRICS-FS-58 是我正在准备的人工智能应用创新赛项，训练涉及人脸表情识别、人体行为识别、具身智能平台部署与运维、智能体应用开发四个方向。这次我希望从环境和项目骨架开始，理解输入、处理、输出与验证之间的关系，逐步练习完整链路。四个方向是训练目标，目前没有全部完成。",
    retro: { before: "以前遇到环境问题，我很容易把报错直接交给 AI。", actual: "现在我尝试自己看目录、搭环境、查服务，用输出与接口判断有没有成功，而不只看命令是否报错。", redo: "执行前先说清楚当前目录、要改变什么、成功后应看到什么；做完再复述这一步的因果关系。" },
    chapters: [
      { title: "四个训练方向", text: "人脸表情识别练习模型训练、ONNX 推理与网页接口；人体行为识别练习视频、姿态和行为分析；平台模块练习 Docker、ROS2 及组件部署；Agent 模块练习知识检索、工具调用和自然语言控制。" },
      { title: "目前在做什么", text: "目前重点是 Ubuntu、Python 虚拟环境、文件结构和部署基础。已有的学习记录包含一次 Docker Compose 服务检查：用 curl 访问本地端口，收到 HTTP 200。这说明该服务在当时可响应，不代表四个模块全部通过。" },
      { title: "我的练习方式", text: "按“认识 → 预测 → 执行 → 验证 → 复述”推进。每一步尽量弄清谁接收输入、谁产生输出，出现问题时先判断应该查哪一层，再向 AI 提问。" },
    ],
    highlights: ["把 Linux、Python 与环境意识纳入学习", "练习从命令输出、接口和日志验证结果", "保留问题与排错过程，而不是只展示成功画面"],
  },
  {
    slug: "desktop-helicopter", title: "Desktop Helicopter", tagline: "从 Blender 模型到会飞的桌面直升机", year: "2026", status: "进行中",
    role: "AI 辅助建模 · 桌面交互与展示", tags: ["3D", "桌面应用", "交互实验"], tech: ["Blender", "GLB", "Three.js", "Electron", "JavaScript"], emoji: "🚁",
    gradient: ["#0C2345", "#4674A3"], cover: "/images/projects/desktop-helicopter.jpg", scene: "aviation", featured: true,
    summary: "我把警用巡逻直升机从 Blender 模型推进到桌面交互实验：机身、主旋翼和尾旋翼独立控制，飞机可以起飞、巡逻、搜索和返航。后续又探索了桌面快捷控制与本地 Markdown 知识卡。这个项目把建模、实时渲染、飞行状态和交互连在了一起。网站版本仅提供飞行与模型展示。",
    retro: { before: "我以为有一个模型，再让它移动起来，就能成为桌面小工具。", actual: "飞行还需要处理旋翼、朝向、任务切换、停止位置与返回停机位，模型和交互之间有许多细节。", redo: "先做清楚的动作边界，再逐步添加交互；只保留能稳定展示的动作。" },
    chapters: [
      { title: "Blender 建模", text: "模型包含玻璃、机身表面细节、起落架与警用设备，保存可编辑的 Blender 源文件和多角度渲染图。实时展示使用自包含 GLB，机身与两组旋翼保留独立节点。" },
      { title: "桌面飞行与表演", text: "桌面版用 Electron 与 Three.js 显示模型，以控制器统一处理起飞、悬停、目标移动和返航。当前表演保留巡逻与搜索，包含旋翼、警灯和搜索灯等视觉细节。" },
      { title: "知识卡探索与网页边界", text: "桌面版探索本地 Markdown 笔记索引、最近修改和学习打开记录；这些记录不代表全部阅读历史。网页复用模型与飞行动作，访客可拖动看模型、点击空白处指点飞行，不连接我的本地笔记或桌面系统。" },
    ],
    highlights: ["独立旋翼节点与实时灯光", "巡逻、搜索和返航使用统一飞行控制器", "网页展示支持停机旋转与访客指点飞行"],
  },
  {
    slug: "iron-man-v3", title: "Iron Man V3", tagline: "Desktop AI Learning Assistant —— 从桌面宠物长成的 AI 学习助手", year: "2026", status: "进行中",
    role: "个人项目 · AI 辅助开发与验收", tags: ["桌面应用", "AI Agent", "学习工具"],
    tech: ["Python", "Vue", "PyWebView", "SQLite", "DeepSeek API", "LangChain", "PyInstaller", "Git"], emoji: "🤖",
    gradient: ["#361E25", "#B7362B"], cover: "/images/projects/iron-man-v3-01.png", scene: "reactor",
    summary: "从一个能悬浮在 Windows 桌面的 Iron Man 桌宠开始（悬浮/点击交互/双击动画/Todo/番茄钟），逐步长成包含 Python 桌面程序 + Vue Web UI + PyWebView 多窗口 + SQLite + DeepSeek API + LangChain 的混合桌面应用。它让我第一次真正理解：做出功能，和做好一个项目，并不是同一件事。",
    retro: {
      before: "我以为“源码能跑”就是完成——打开程序看起来能用，就是验证。",
      actual: "能运行不代表能交付：frozen one-file 打包后 Toolbar 消失，根因是窗口还没 loaded，show/hide/move 已执行；开发环境的成功不代表交付环境的成功。架构问题不会在项目简单时出现，都是在功能堆多之后爆发。",
      redo: "更早停止加功能、更早重构：拆清模块职责（interaction_controller / window_manager / services / database），用 Git Worktree 隔离重构，从第一天就建验证链路（Python/Vue/SQLite/API/Build/PyInstaller/EXE 黑盒），而不是最后补。",
    },
    highlights: ["项目目录重构：src/python + src/vue + resources/scripts/tests/docs 分层", "Git Worktree 重构流程：稳定版与重构实验隔离，验证后合并", "完整验证链路：Python/Vue/SQLite/DeepSeek/LangChain/PyWebView/Build/EXE 黑盒", "EXE Toolbar 时序 bug 定位与修复（窗口 loaded 后再执行窗口操作）", "PyInstaller 打包 + Git Stable Tag 稳定版本管理"],
    featured: true,
  },
  {
    slug: "agent-skill-education", title: "AI Agent × Education", tagline: "2026 第三届教育信息技术应用创新大赛 · Agent Skill 设计", year: "2026", status: "进行中",
    role: "个人探索 · AI 辅助设计", tags: ["AI Agent", "竞赛", "教育"], tech: ["AI Agent", "Agent Skill", "Workflow Design", "Multi-Agent"],
    emoji: "🧠", gradient: ["#102C4B", "#1E7BA8"], scene: "blueprint",
    summary: "龙虾 AI Agent Skill 开发赛道实践项目。核心问题不是“做一个 Demo”，而是：怎样把某一种能力真正封装成 Agent 可以可靠调用的 Skill？真正可靠的 Agent 系统更像软件工程：需要明确边界、状态、职责、输入输出、失败条件和验证方式。",
    retro: {
      before: "以前我很容易把 AI Agent 理解成“一个模型 + 一个很长的 Prompt”。",
      actual: "Skill 的关键在契约：什么情况下应该/不应该调用（Trigger）、输入缺什么信息就停止（Input Contract）、输出遵守什么结构且怎样算完成（Output Contract）、内部如何执行（Workflow）、复杂任务是否拆分 Planner/Executor/Reviewer/Tester（Multi-Agent）。",
      redo: "把 Trigger / Input / Output / Workflow 的约束写成 Skill 的第一等文档，先定验证方式再写实现。",
    },
    highlights: ["Skill Trigger：何时调用 / 何时不应调用", "Input Contract：缺失关键信息时停止", "Output Contract：输出结构与完成判据", "Workflow：Intent → Skill Selection → Execution → Validation", "Multi-Agent 协作角色拆分探索"],
  },
  {
    slug: "worker-website", title: "Worker Website 1.0", tagline: "Interactive Workplace Personality Test —— 打工人工作状态互动测试", year: "2026", status: "已完成",
    role: "个人项目 · AI 辅助设计、开发与部署", tags: ["Web 应用", "互动测试"], tech: ["Vue", "Vite", "Git", "GitHub", "Cloudflare Pages"], emoji: "☕",
    gradient: ["#6B2448", "#EF6A45"], cover: "/images/projects/worker-website-01.png", scene: "night-shift",
    summary: "以“打工人工作状态”为主题的互动测试网页，答题后得到对应的工作人格/状态结果。它对我最重要的意义是把 Vue 项目从 localhost 送到公开网站：Vue/Vite → Production Build → Git → GitHub → Cloudflare Pages。保留的截图记录了当时在 Cloudflare Pages 上的部署成功。",
    retro: {
      before: "以前我对 GitHub 的理解更像“存放代码的地方”；以为页面能打开就是项目完成。",
      actual: "Git、GitHub 和部署平台不是三个孤立工具，而是一条交付链路；“项目完成”的标准变成了：一个陌生人是否真的能够访问和使用它。",
      redo: "一开始就把部署纳入设计——构建配置、环境变量、访问路径在开发期就按生产标准对待。",
    },
    highlights: ["完整走通 开发 → 构建 → 推送 → 自动部署 → 公网访问 全链路", "改变了对「项目完成」的定义"],
  },
  {
    slug: "todo-list", title: "Todo List", tagline: "Learning Vue by Building", year: "2026", status: "已完成", role: "独立开发",
    tags: ["前端", "MVP"], tech: ["Vue 3", "TypeScript", "Vite"], emoji: "✅", gradient: ["#D9F2E8", "#43B77C"],
    cover: "/images/projects/todo-list-01.png", scene: "checklist",
    summary: "学习 Vue3 + TypeScript 的 MVP：Add → Display → Update → Delete。第一次把 ref、computed、component、state、TS 放进同一个完整项目里理解——课程里知识点是一块块出现的，真正卡住我的是“它们在一个真实项目里到底怎么连接”。",
    retro: {
      before: "以为单独看懂 ref()/computed()/props 就算会了。",
      actual: "Vue 开始变成一个完整的数据与 UI 系统：Data → State → Component → UI → 交互 → State 更新。",
      redo: "更早开始做完整小项目，而不是等“全部学完”。",
    },
    highlights: ["第一次把响应式 API 与组件体系放进同一项目理解"],
  },
  {
    slug: "vue3-lab", title: "Vue 3 Lab", tagline: "Learning · Experiments · Components", year: "2026", status: "探索中",
    role: "学习仓库 · 持续维护", tags: ["学习仓库", "实验"], tech: ["Vue 3", "TypeScript", "Vite"], emoji: "🧪",
    gradient: ["#D7F4E7", "#4BAA82"], scene: "notebook",
    summary: "前端学习实验仓库。不是产品，也不包装成商业项目，而是一个持续实验和验证 Vue 概念的代码 Notebook：组件、ref/computed、Props、Event、UI State、数据流、小型页面结构。",
    retro: {
      before: "以为 Portfolio 只该放“包装完成”的结果。",
      actual: "学习过程本身也有价值——它证明我真正经历过这个学习过程，而不是在 Skills 区写一句“Vue 3 — Proficient”。",
      redo: "坚持保留过程性记录，与成品项目互补。",
    },
    highlights: ["持续验证 Vue 核心概念的实验场", "学习过程的可见证据"],
  },
]

export const allProjectTags = Array.from(new Set(projects.flatMap((p) => p.tags)))
