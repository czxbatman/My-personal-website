import { NavLink } from "react-router-dom"
import { ArrowUpRight, Search, type LucideIcon } from "lucide-react"
import { profile } from "@/content/profile"
import "./capsules.css"

type Shortcut = { to: string; label: string; icon: LucideIcon; primary?: boolean }

export function CapsuleLinks({ items, label, compact = false, tools = false }: { items: Shortcut[]; label: string; compact?: boolean; tools?: boolean }) {
  const github = profile.socials.find(social => social.label === "GitHub")
  return <nav aria-label={label} className={`capsule-links ${compact ? "is-compact" : ""}`}>
    {items.map(({ to, label: text, icon: Icon, primary }) => <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => `capsule-link ${primary ? "is-primary" : ""} ${isActive ? "is-current" : ""}`}>
      <span className="capsule-icon"><Icon size={16} aria-hidden="true" /></span>
      <span>{text}</span>
      <ArrowUpRight className="capsule-arrow" size={14} aria-hidden="true" />
    </NavLink>)}
    {tools && <span className="capsule-tools">
      {github && <a href={github.href} target="_blank" rel="noreferrer" className="capsule-orb" aria-label="访问 GitHub，打开新标签页" title="GitHub · 新标签页"><span aria-hidden="true" className="font-mono text-xs font-semibold">GH</span></a>}
      <button type="button" className="capsule-orb" aria-label="搜索网站内容" title="搜索 · Ctrl K" onClick={() => window.dispatchEvent(new CustomEvent("open-palette"))}><Search size={18} aria-hidden="true" /></button>
    </span>}
  </nav>
}
