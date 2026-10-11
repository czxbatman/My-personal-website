import { BookOpen, Compass, FileUser, FolderOpen, Home, Images, NotebookPen, Radar, Wrench, Helicopter, Calculator } from "lucide-react"

export const siteNavigation = [
  { to: "/", label: "首页", icon: Home },
  { to: "/projects", label: "项目", icon: FolderOpen },
  { to: "/blog", label: "博客", icon: NotebookPen },
  { to: "/gallery", label: "画廊", icon: Images },
  { to: "/resume", label: "简历", icon: FileUser },
  { to: "/now", label: "近况", icon: Radar },
  { to: "/about", label: "关于", icon: Compass },
]

export const homeShortcuts = [
  { to: "/projects", label: "探索项目", icon: FolderOpen, primary: true },
  { to: "/gallery", label: "学习画廊", icon: Images },
  { to: "/about", label: "成长经历", icon: Compass },
  { to: "/resume", label: "在线简历", icon: FileUser },
  { to: "/now", label: "我的近况", icon: Radar },
  { to: "/blog", label: "写作手记", icon: BookOpen },
]

export const projectShortcuts = [
  { to: "/projects/opc-finance-agent", label: "财务 AI", icon: Calculator },
  { to: "/projects/brics-ai-training", label: "金砖备赛", icon: Wrench },
  { to: "/projects/desktop-helicopter", label: "Desktop Helicopter", icon: Helicopter },
]
