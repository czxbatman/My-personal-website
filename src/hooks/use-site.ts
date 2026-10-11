import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { profile } from "@/content/profile"

/* ---------- 暗色 / 亮色主题 ---------- */
export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"))
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("theme", dark ? "dark" : "light")
  }, [dark])
  return { dark, toggle: useCallback(() => setDark((d) => !d), []) }
}

/* ---------- 四套强调色 ---------- */
export const ACCENTS = ["coral", "mint", "lemon", "sky"] as const
export type Accent = (typeof ACCENTS)[number]

export const ACCENT_META: Record<Accent, { label: string; color: string }> = {
  coral: { label: "珊瑚橙", color: "#FF6B6B" },
  mint: { label: "薄荷绿", color: "#4ECDC4" },
  lemon: { label: "柠檬黄", color: "#FFD93D" },
  sky: { label: "天蓝", color: "#54A0FF" },
}

export function useAccent() {
  const [accent, setAccent] = useState<Accent>(
    () => (document.documentElement.dataset.accent as Accent) || "coral"
  )
  useEffect(() => {
    document.documentElement.dataset.accent = accent
    localStorage.setItem("accent", accent)
  }, [accent])
  const cycle = useCallback(
    () => setAccent((a) => ACCENTS[(ACCENTS.indexOf(a) + 1) % ACCENTS.length]),
    []
  )
  return { accent, setAccent, cycle }
}

/* ---------- 每页 SEO 元信息 ---------- */
export function usePageMeta(title?: string, desc?: string) {
  useEffect(() => {
    document.title = title
      ? `${title} · ${profile.name}`
      : `${profile.name} · ${profile.headline}`
    const meta = document.querySelector('meta[name="description"]')
    if (meta && desc) meta.setAttribute("content", desc)
  }, [title, desc])
}

/* ---------- 全站状态 Context：让导航栏与命令面板共享主题/强调色 ---------- */
export interface SiteState {
  flightActive: boolean
  setFlightActive(active: boolean): void
  dark: boolean
  toggleTheme(): void
  accent: Accent
  setAccent(a: Accent): void
  cycleAccent(): void
}

export const SiteStateContext = createContext<SiteState | null>(null)

export function useSiteState(): SiteState {
  const ctx = useContext(SiteStateContext)
  if (!ctx) throw new Error("useSiteState 必须在 SiteStateContext 内使用")
  return ctx
}

export function useCreateSiteState(): SiteState {
  const [flightActive, setFlightActive] = useState(false)
  const { dark, toggle } = useTheme()
  const { accent, setAccent, cycle } = useAccent()
  return { dark, toggleTheme: toggle, accent, setAccent, cycleAccent: cycle, flightActive, setFlightActive }
}
