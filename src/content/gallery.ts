export interface GalleryItem {
  title: string
  tag: string
  emoji: string
  gradient: [string, string]
  src?: string
  description: string
  stage: string
  projectSlug?: string
  recordedAt?: string
}

export const galleryItems: GalleryItem[] = [
  { title: "金砖备赛 · Docker Compose 服务检查", tag: "金砖备赛", emoji: "🛠️", gradient: ["#203745", "#72A69E"], src: "/images/gallery/brics-compose-smoke.jpg", description: "在 Ubuntu 中用 curl 检查本地服务，收到 HTTP 200；这是基础环境练习，不代表四个训练模块通过。", stage: "结果", projectSlug: "brics-ai-training", recordedAt: "2026-10-10" },
  { title: "专升本 · 分阶段学习计划", tag: "专升本规划", emoji: "📚", gradient: ["#333A36", "#91AA96"], src: "/images/gallery/exam-plan-building.jpg", description: "借助 AI 制定数学与 C 语言的准备路线；英语另有持续学习安排，这张图记录的是计划制定。", stage: "计划" },
  { title: "专升本 · 周计划与链接核查", tag: "专升本规划", emoji: "🗓️", gradient: ["#333A36", "#91AA96"], src: "/images/gallery/exam-plan-review.jpg", description: "AI 辅助整理周计划、资料结构与链接检查反馈；执行进度和资料有效性还需要自己核对。", stage: "计划" },
  { title: "Hermes · 模型调用尝试", tag: "服务器与微信 Agent", emoji: "🦞", gradient: ["#1F2928", "#B4B852"], src: "/images/gallery/hermes-model-call.jpg", description: "终端记录一次模型调用成功提示；这张图不能说明微信收发或全部 Agent 能力已完成验收。", stage: "过程" },
  { title: "Hermes · 消息渠道配置探索", tag: "服务器与微信 Agent", emoji: "💬", gradient: ["#1F2928", "#4C9B8D"], src: "/images/gallery/hermes-channel-setup.jpg", description: "浏览消息渠道的配置入口，图中仍有未配置的项目；记录的是接入探索。", stage: "配置" },
  { title: "服务器 · 安全组访问范围", tag: "服务器与微信 Agent", emoji: "🔐", gradient: ["#E3EBEF", "#78A0AA"], src: "/images/gallery/server-firewall.jpg", description: "学习安全组访问范围，画面包含访问过宽的风险提示；这不是完成安全加固的证明。", stage: "过程" },
  { title: "财务 AI · 星辰工作流调试", tag: "财务 AI 竞赛", emoji: "🧩", gradient: ["#DBDEFF", "#8074CC"], src: "/images/gallery/finance-workflow-debug.jpg", description: "星辰工作流中参数抽取与税费估算工具的连接记录；裁剪图未展示异常详情或最终运行结果。", stage: "过程", projectSlug: "opc-finance-agent" },
  { title: "财务 AI · 项目提交记录", tag: "财务 AI 竞赛", emoji: "🏆", gradient: ["#DAE5ED", "#398E94"], src: "/images/gallery/finance-submission.jpg", description: "慧算 OPC 财务智能体的参赛提交记录，截图当时为已提交、待审核；不是获奖或最新审核结果。", stage: "提交", projectSlug: "opc-finance-agent", recordedAt: "2026-09-14" },
  { title: "阅读 · 独立与自我负责", tag: "阅读与思考", emoji: "📖", gradient: ["#29353C", "#5AA4AE"], src: "/images/gallery/reading-independence.jpg", description: "《这世界既残酷也温柔》中关于独立与自我负责的阅读片段；图中文字来自书籍，不作为我的原创感悟。", stage: "阅读" },
  { title: "阅读 · 相信个人努力", tag: "阅读与思考", emoji: "📖", gradient: ["#29353C", "#B66B50"], src: "/images/gallery/reading-personal-effort.jpg", description: "同一本书中关注个人努力与主动选择的另一处阅读片段，与上一张组成同书记录。", stage: "阅读" },
  { title: "AI 工具 · 深度研究加载失败", tag: "AI 工具体验", emoji: "🔎", gradient: ["#17308F", "#668BE6"], src: "/images/gallery/ai-research-error.jpg", description: "深度研究当时未能显示的失败画面；记录工具问题，不将它当作已完成的研究成果。", stage: "失败" },
  { title: "AI 工具 · ZCode 体验记录", tag: "AI 工具体验", emoji: "⚡", gradient: ["#153562", "#89B8E5"], src: "/images/gallery/ai-zcode.jpg", description: "当时领取限时模型资源的工具体验记录；不代表当前仍有效，也不作为项目开发成果。", stage: "体验" },
  { title: "Android Studio · Fragment 开发", tag: "实验与代码", emoji: "📱", gradient: ["#25344A", "#596F89"], src: "/images/gallery/learning-android-studio-01.png", description: "在 Android Studio 中练习 Fragment、视图绑定与界面连接，右侧模拟器保留当时的页面效果。", stage: "练习" },
  { title: "Burp Suite · CSRF 请求实验", tag: "安全实验", emoji: "🛡️", gradient: ["#23466C", "#5A9ED0"], src: "/images/gallery/security-burp-csrf-01.png", description: "记录请求分析与 CSRF 相关操作入口；会话值已遮盖，画面本身不能证明完整漏洞验证。", stage: "实验" },
  { title: "Kali · SQLMap 练习", tag: "安全实验", emoji: "⌨️", gradient: ["#1C2739", "#3A6894"], src: "/images/gallery/security-sqlmap-01.png", description: "本地环境中的 SQLMap 连接与参数检测画面，保留工具学习过程，不推导完整测试结论。", stage: "实验" },
  { title: "微信开发者工具 · 小程序调试", tag: "实验与代码", emoji: "🧩", gradient: ["#282A30", "#6B4386"], src: "/images/gallery/code-lab-miniprogram-01.png", description: "微信开发者工具中的失物信息发布页面与代码调试；图中仍有问题提示，属于开发过程。", stage: "过程" },
  { title: "WAF · 请求拦截实验", tag: "安全实验", emoji: "🔒", gradient: ["#B8454B", "#E78271"], src: "/images/gallery/security-waf-01.png", description: "请求被 WAF 拦截的页面记录；这是当时的一次响应结果，不代表全面安全评估。", stage: "结果" },
  { title: "AI 服务 · 地区设置", tag: "AI 工具体验", emoji: "🌐", gradient: ["#D8E8FF", "#78A8E8"], src: "/images/gallery/ai-service-settings-01.png", description: "查看 AI 服务的国家或地区设置入口；这是服务配置体验，不是开发作品或个人所在地信息。", stage: "配置" },
  { title: "Claude Code · 使用概览", tag: "AI 工具体验", emoji: "📈", gradient: ["#E6DDD1", "#BDAF9D"], src: "/images/gallery/ai-coding-dashboard-01.png", description: "AI 编程工具的使用概览与模型选择画面；用量记录不等于项目质量或熟练程度。", stage: "体验" },
  { title: "Claude Design · 设计工作台", tag: "AI 工具体验", emoji: "✦", gradient: ["#EEE8DE", "#D6BBAA"], src: "/images/gallery/ai-design-workbench-01.png", description: "AI 设计工具的起始工作台与模板入口，记录工具体验；画面没有展示完成的设计作品。", stage: "体验" },
  { title: "Claude · AI 时代写作协作", tag: "AI 工具体验", emoji: "✍️", gradient: ["#F0EDE7", "#BCB6AF"], src: "/images/gallery/ai-writing-assistant-01.png", description: "用 AI 讨论英文写作，画面包含对字数与论证要求冲突的反馈；记录协作过程。", stage: "过程" },
  { title: "Todo List · Skill 大赛任务", tag: "实验与代码", emoji: "✅", gradient: ["#DFF3E9", "#4AB67E"], src: "/images/gallery/todo-list-01.png", description: "待办清单中的添加、勾选和删除入口，用实际竞赛准备事项练习状态与界面联动。", stage: "练习", projectSlug: "todo-list" },
  { title: "Iron Man V3 · 素材与计时验证", tag: "Iron Man V3", emoji: "🤖", gradient: ["#271E24", "#B52D24"], src: "/images/gallery/iron-man-v3-development-01.png", description: "AI 协作对话中的素材与计时问题排查；对话报告还需要与真实程序表现一起核对。", stage: "过程", projectSlug: "iron-man-v3" },
  { title: "Worker Website · 产品方案", tag: "Web 项目", emoji: "☕", gradient: ["#252326", "#6A3A60"], src: "/images/gallery/worker-website-planning-01.png", description: "梳理互动测试的题目、计分规则与界面方案；记录需求设计，后续实现需另外验证。", stage: "计划", projectSlug: "worker-website" },
  { title: "Worker Website · 部署完成", tag: "Web 项目", emoji: "🚀", gradient: ["#E7F0FF", "#6E95E8"], src: "/images/gallery/worker-website-deployment-01.png", description: "Cloudflare Pages 显示当时部署成功，记录从构建到公开发布的一步；不是当前在线可用性的重新验收。", stage: "发布", projectSlug: "worker-website" },
  { title: "AI 工具 · 模型配置", tag: "AI 工具体验", emoji: "🧠", gradient: ["#171B21", "#3A6C63"], src: "/images/gallery/agent-skill-settings-01.png", description: "ZCode 模型配置与资源额度页面；它只记录工具准备，不证明 Agent Skill 已实现或验收。", stage: "配置" },
]

export const galleryTags = ["全部", ...new Set(galleryItems.map((item) => item.tag))]
