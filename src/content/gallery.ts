export interface GalleryItem {
  title: string
  tag: string
  emoji: string
  gradient: [string, string]
  src?: string
  description?: string
}

export const galleryItems: GalleryItem[] = [
  { title: "金砖备赛 · Docker Compose 服务检查", tag: "金砖备赛", emoji: "🛠️", gradient: ["#203745", "#72A69E"], src: "/images/gallery/brics-compose-smoke.jpg", description: "在 Ubuntu 中用 curl 检查本地服务，收到 HTTP 200；这是一次基础环境练习。" },
  { title: "专升本 · 分阶段学习计划", tag: "专升本规划", emoji: "📚", gradient: ["#333A36", "#91AA96"], src: "/images/gallery/exam-plan-building.jpg", description: "借助 AI 整理高数与 C 语言的准备路线，计划制定不等于已经开始学习。" },
  { title: "专升本 · 周计划与链接核查", tag: "专升本规划", emoji: "🗓️", gradient: ["#333A36", "#91AA96"], src: "/images/gallery/exam-plan-review.jpg", description: "检查学习资料的结构和相邻周链接，为后续执行做准备。" },
  { title: "Hermes · 模型调用尝试", tag: "服务器与微信 Agent", emoji: "🦞", gradient: ["#1F2928", "#B4B852"], src: "/images/gallery/hermes-model-call.jpg", description: "记录一次模型调用成功的终端画面，不代表所有 Agent 能力都已验证。" },
  { title: "Hermes · 消息渠道配置探索", tag: "服务器与微信 Agent", emoji: "💬", gradient: ["#1F2928", "#4C9B8D"], src: "/images/gallery/hermes-channel-setup.jpg", description: "探索 Weixin / WeChat 等消息渠道；截图记录的是配置入口。" },
  { title: "服务器 · 安全组访问范围", tag: "服务器与微信 Agent", emoji: "🔐", gradient: ["#E3EBEF", "#78A0AA"], src: "/images/gallery/server-firewall.jpg", description: "接触服务器访问规则，也开始意识到权限与安全需要单独理解。" },
  { title: "财务 AI · 星辰工作流调试", tag: "财务 AI 竞赛", emoji: "🧩", gradient: ["#DBDEFF", "#8074CC"], src: "/images/gallery/finance-workflow-debug.jpg", description: "参数抽取、工具调用与结果解释的联调过程；这张图记录了异常排查。" },
  { title: "财务 AI · 项目提交记录", tag: "财务 AI 竞赛", emoji: "🏆", gradient: ["#DAE5ED", "#398E94"], src: "/images/gallery/finance-submission.jpg", description: "慧算 OPC 财务智能体的参赛提交画面，当时状态为待审核。" },
  { title: "阅读 · 独立与自我负责", tag: "阅读与思考", emoji: "📖", gradient: ["#29353C", "#5AA4AE"], src: "/images/gallery/reading-independence.jpg", description: "《这世界既残酷也温柔》的阅读记录，留下关于独立与选择的思考。" },
  { title: "阅读 · 相信个人努力", tag: "阅读与思考", emoji: "📖", gradient: ["#29353C", "#B66B50"], src: "/images/gallery/reading-personal-effort.jpg", description: "同一本书的另一处阅读记录，关注个人奋斗与主动选择。" },
  { title: "AI 工具 · 深度研究加载失败", tag: "AI 工具体验", emoji: "🔎", gradient: ["#17308F", "#668BE6"], src: "/images/gallery/ai-research-error.jpg", description: "工具探索也包含失败：这次深度研究未能显示，并非研究成果。" },
  { title: "AI 工具 · ZCode 体验记录", tag: "AI 工具体验", emoji: "⚡", gradient: ["#153562", "#89B8E5"], src: "/images/gallery/ai-zcode.jpg", description: "一次限时模型资源领取记录，反映当时的工具体验。" },
  { title: "Android Studio · Fragment 开发", tag: "实验与代码", emoji: "📱", gradient: ["#25344A", "#596F89"], src: "/images/gallery/learning-android-studio-01.png" },
  { title: "Burp Suite · CSRF 请求实验", tag: "实验与代码", emoji: "🛡️", gradient: ["#23466C", "#5A9ED0"], src: "/images/gallery/security-burp-csrf-01.png" },
  { title: "Kali · SQLMap 练习", tag: "实验与代码", emoji: "⌨️", gradient: ["#1C2739", "#3A6894"], src: "/images/gallery/security-sqlmap-01.png" },
  { title: "微信开发者工具 · 小程序调试", tag: "实验与代码", emoji: "🧩", gradient: ["#282A30", "#6B4386"], src: "/images/gallery/code-lab-miniprogram-01.png" },
  { title: "WAF · 请求拦截实验", tag: "实验与代码", emoji: "🔒", gradient: ["#B8454B", "#E78271"], src: "/images/gallery/security-waf-01.png" },
  { title: "AI 服务 · 地区设置", tag: "实验与代码", emoji: "🌐", gradient: ["#D8E8FF", "#78A8E8"], src: "/images/gallery/ai-service-settings-01.png" },
  { title: "Claude Code · 使用概览", tag: "实验与代码", emoji: "📈", gradient: ["#E6DDD1", "#BDAF9D"], src: "/images/gallery/ai-coding-dashboard-01.png" },
  { title: "Claude Design · 设计工作台", tag: "实验与代码", emoji: "✦", gradient: ["#EEE8DE", "#D6BBAA"], src: "/images/gallery/ai-design-workbench-01.png" },
  { title: "Claude · AI 时代写作协作", tag: "实验与代码", emoji: "✍️", gradient: ["#F0EDE7", "#BCB6AF"], src: "/images/gallery/ai-writing-assistant-01.png" },
  { title: "Todo List · Skill 大赛任务", tag: "实验与代码", emoji: "✅", gradient: ["#DFF3E9", "#4AB67E"], src: "/images/gallery/todo-list-01.png" },
  { title: "Iron Man V3 · 素材与计时验证", tag: "Iron Man V3", emoji: "🤖", gradient: ["#271E24", "#B52D24"], src: "/images/gallery/iron-man-v3-development-01.png" },
  { title: "Worker Website · 产品方案", tag: "Web 项目", emoji: "☕", gradient: ["#252326", "#6A3A60"], src: "/images/gallery/worker-website-planning-01.png" },
  { title: "Worker Website · 部署完成", tag: "Web 项目", emoji: "🚀", gradient: ["#E7F0FF", "#6E95E8"], src: "/images/gallery/worker-website-deployment-01.png" },
  { title: "Agent Skill · 模型设置", tag: "Agent × 教育", emoji: "🧠", gradient: ["#171B21", "#3A6C63"], src: "/images/gallery/agent-skill-settings-01.png" },
]

export const galleryTags = ["全部", ...new Set(galleryItems.map((item) => item.tag))]
