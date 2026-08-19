/** 全站身份、技能与简历的唯一数据源。 */
export const profile = {
  name: "泽鑫",
  avatar: null as string | null,
  status: "AI 编程学习者 · 大学生",
  location: "北京",
  email: null as string | null,
  headline: "Building with AI, learning by building.",
  typewriter: [
    "Building with AI, learning by building.",
    "不仅让 AI 帮我把东西做出来，也要真正理解自己正在构建什么。",
    "AI Agent · AI Coding · Vue · Python",
  ],
  intro:
    "我是一名正在学习 AI 编程的大学生，坐标北京。目前主要关注 AI Agent、AI 辅助开发、Vue、Python，以及 AI 在学习和工作场景中的实际应用。相比单纯学习某一个框架，我更喜欢从真实项目开始：先想清楚自己到底想解决什么问题，再一点点把产品、代码、架构和工程流程连接起来。",
  socials: [{ label: "GitHub", href: "https://github.com/czxbatman", todo: false }],
  stats: [
    { value: "5", label: "真实项目" },
    { value: "5", label: "验证原则" },
    { value: "14", label: "学习截图" },
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
    "正在北京学习 AI 编程方向的大学生。通过真实项目连接产品、代码、架构与工程流程，关注 AI Agent、AI 辅助开发、Vue、Python，以及 AI 在学习和工作场景中的实际应用。",
  experience: [
    {
      period: "2026 — 至今",
      title: "Iron Man V3 Desktop AI Learning Assistant",
      org: "独立开发",
      points: ["从桌面宠物扩展到 Todo、番茄钟与 AI 学习助手", "实践 Python、Vue、PyWebView、SQLite、DeepSeek API 与 LangChain 的混合架构"],
    },
    {
      period: "2026 — 至今",
      title: "AI Agent × Education",
      org: "独立开发 · 龙虾 AI Agent Skill 开发赛道",
      points: ["围绕 Trigger、Input、Output 与 Workflow 设计可调用 Skill", "探索 Planner、Executor、Reviewer、Tester 的多 Agent 协作"],
    },
    {
      period: "2026",
      title: "Worker Website 1.0",
      org: "独立开发",
      points: ["完成打工人工作状态互动测试的设计与开发", "走通 Vue/Vite 构建、GitHub 与 Vercel 公网部署链路"],
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
  education: [
    {
      period: "待补充",
      title: "大学生",
      org: "北京 · 学校、专业与年份待补充",
      points: [],
    },
  ],
}
