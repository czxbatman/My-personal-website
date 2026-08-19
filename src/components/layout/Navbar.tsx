import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, Moon, Palette, Search, Sun, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ACCENTS, ACCENT_META, useSiteState, type Accent } from "@/hooks/use-site"
import { profile } from "@/content/profile"
import { cn } from "@/lib/utils"

const links = [
  { to: "/", label: "首页" },
  { to: "/projects", label: "项目" },
  { to: "/blog", label: "博客" },
  { to: "/gallery", label: "画廊" },
  { to: "/resume", label: "简历" },
  { to: "/now", label: "近况" },
  { to: "/about", label: "关于" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { dark, toggleTheme, accent, setAccent } = useSiteState()
  const { pathname } = useLocation()
  const canChooseAccent = pathname === "/" || pathname === "/about" || pathname === "/now"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const openPalette = () => window.dispatchEvent(new CustomEvent("open-palette"))

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || menuOpen
          ? "border-b border-border/60 bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4">
        <Link to="/" className="flex items-center gap-2.5 font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-base text-brand-ink shadow-sm">
            🗺️
          </span>
          <span className="hidden sm:inline">
            {profile.name}
            <span className="text-brand">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-foreground",
                  isActive ? "font-medium text-brand" : "text-muted-foreground"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openPalette}
            className="hidden items-center gap-2 rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-brand/50 hover:text-foreground sm:flex"
          >
            <Search className="h-3.5 w-3.5" />
            搜索
            <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">Ctrl K</kbd>
          </button>

          {canChooseAccent && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="切换强调色">
                  <Palette className="h-4.5 w-4.5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-48 p-3">
                <p className="mb-2 text-xs text-muted-foreground">选一个手记强调色</p>
                <div className="grid grid-cols-4 gap-2">
                  {ACCENTS.map((a: Accent) => (
                    <button
                      key={a}
                      type="button"
                      title={ACCENT_META[a].label}
                      onClick={() => setAccent(a)}
                      className={cn(
                        "h-8 w-8 rounded-full ring-offset-2 ring-offset-background transition-all",
                        accent === a ? "ring-2 ring-foreground/60 scale-110" : "hover:scale-110"
                      )}
                      style={{ backgroundColor: ACCENT_META[a].color }}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}

          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="切换深浅模式">
            {dark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="打开菜单"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/60 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent",
                      isActive ? "font-medium text-brand" : "text-muted-foreground"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
