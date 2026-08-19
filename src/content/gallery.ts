export interface GalleryItem {
  title: string
  tag: string
  emoji: string
  gradient: [string, string]
  src?: string
}

export const galleryTags = ["全部", "Iron Man V3", "Agent × 教育", "Web 项目", "实验与代码"]

export const galleryItems: GalleryItem[] = [
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
