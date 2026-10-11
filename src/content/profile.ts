import { projects } from "./projects"
import { galleryItems } from "./gallery"
import { principles } from "./principles"

/** 全站身份、技能与简历的唯一数据源。 */
export const profile = {
  name: "泽鑫",
  avatar: null as string | null,
  status: "AI 编程学习者 · 大学生",
  location: null as string | null,
  email: null as string | null,
  headline: "和 AI 一起做，\n也一点点学懂。",
  typewriter: [
    "Building with AI, learning by building.",
    "不仅让 AI 帮我把东西做出来，也要真正理解自己正在构建什么。",
    "自己动手，遇到问题问懂了再继续。",
  ],
  intro:
    "我是泽鑫，一名正在学习 AI 编程的大学生。从桌面小软件到财务 AI 项目，我在真实实践中慢慢补基础。现在一边准备专升本，一边准备金砖比赛；AI 更多是我的老师和信息整理员，帮我弄懂问题，再继续动手。",
  socials: [{ label: "GitHub", href: "https://github.com/czxbatman", todo: false }],
  stats: [
    { value: String(projects.length), label: "项目记录" },
    { value: String(principles.length), label: "验证原则" },
    { value: String(galleryItems.length), label: "学习截图" },
    { value: "∞", label: "待探索" },
  ],
}

/** 首页技能流与关于页标签共用。 */
export const skills = {
  map: [
    { name: "AI", level: "Agent · Coding · Context" },
    { name: "Development", level: "Python · Vue · TypeScript" },
    { name: "Engineering", level: "Architecture · Testing · Delivery" },
  ],
  tools: [
    "AI Agent",
    "Agent Skills",
    "Multi-Agent Workflow",
    "AI Coding",
    "Tool Calling",
    "Prompt & Context Design",
    "Python",
    "Vue 3",
    "TypeScript",
    "Vite",
    "SQLite",
    "Git & GitHub",
    "Software Architecture",
    "Product Thinking",
    "Testing",
    "Deployment",
    "Project Documentation",
  ],
}

export const resume = {
  summary:
    "正在学习 AI 编程的大学生。通过财务 AI、桌面助手与 3D 交互项目补开发基础，参与需求梳理、AI 辅助实现和验收；当前准备专升本与金砖比赛，英语持续学习，数学与 C 语言处于准备阶段。",
  experience: [
    {
      period: "2026",
      title: "慧算 · OPC 财务智能体",
      org: "项目规划与验收 · AI 辅助实现",
      points: ["参与限定财务场景的需求、设计、开发、测试、部署与演示", "以 H5 串联事实核对、缺口追问、摘要确认与 Python 确定性计算", "保留虚构数据下的工程记录，区分专业审签、完整联调与真实用户验证"],
    },
    {
      period: "2026 — 至今",
      title: "Desktop Helicopter",
      org: "AI 辅助建模与交互实践",
      points: ["把 Blender 模型连接到桌面飞行与网页展示", "网页实现巡逻、搜索、指点飞行、返航与停机拖动旋转"],
    },
    {
      period: "准备中",
      title: "金砖人工智能应用创新备赛",
      org: "基础环境与模块学习",
      points: ["学习 Linux、Python 虚拟环境、文件结构与部署排错", "四个训练方向尚未全部完成，逐步记录输入、输出与验证"],
    },
    {
      period: "2026 — 至今",
      title: "Iron Man V3 Desktop AI Learning Assistant",
      org: "个人项目 · AI 辅助开发与验收",
      points: ["从桌面宠物扩展到 Todo、番茄钟与 AI 学习助手", "实践 Python、Vue、PyWebView、SQLite、DeepSeek API 与 LangChain 的混合架构"],
    },
    {
      period: "2026 — 至今",
      title: "AI Agent × Education",
      org: "个人探索 · AI 辅助 Skill 设计",
      points: ["围绕 Trigger、Input、Output 与 Workflow 设计可调用 Skill", "探索 Planner、Executor、Reviewer、Tester 的多 Agent 协作"],
    },
    {
      period: "2026",
      title: "Worker Website 1.0",
      org: "个人项目 · AI 辅助开发",
      points: ["完成打工人工作状态互动测试的设计与开发", "走通 Vue/Vite 构建、GitHub 与 Cloudflare Pages 公网部署链路"],
    },
    {
      period: "2026",
      title: "Todo List",
      org: "独立开发",
      points: ["以 Add → Display → Update → Delete 实践 Vue 3 + TypeScript MVP", "在完整项目中连接响应式状态、组件与交互"],
    },
    {
      period: "持续维护",
      title: "Vue 3 Lab",
      org: "学习仓库",
      points: ["用组件、ref/computed、Props、Event 和 UI State 持续验证概念", "保留学习过程与实验记录作为可见证据"],
    },
  ],
  education: [] as { period: string; title: string; org: string; points: string[] }[],
}
