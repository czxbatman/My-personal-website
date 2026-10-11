import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowUp, FileText, Folder, Home, Info, Layers, Map, MoonStar, Palette, BookOpen, Image, FileUser, Clock } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { useSiteState } from "@/hooks/use-site"
import { projects } from "@/content/projects"
import { posts } from "@/content/posts"
import { profile } from "@/content/profile"

const pages = [
  { label: "首页", to: "/", icon: Home },
  { label: "项目", to: "/projects", icon: Folder },
  { label: "博客", to: "/blog", icon: BookOpen },
  { label: "画廊", to: "/gallery", icon: Image },
  { label: "简历", to: "/resume", icon: FileUser },
  { label: "近况", to: "/now", icon: Clock },
  { label: "关于", to: "/about", icon: Info },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { toggleTheme, cycleAccent, flightActive } = useSiteState()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener("keydown", onKey)
    window.addEventListener("open-palette", onOpen)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("open-palette", onOpen)
    }
  }, [])

  const go = (to: string) => {
    setOpen(false)
    navigate(to)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="搜索页面、项目、文章或命令…" />
      <CommandList>
        <CommandEmpty>这张地图上没有这个坐标 🗺️</CommandEmpty>
        <CommandGroup heading="页面">
          {pages.map((p) => (
            <CommandItem key={p.to} onSelect={() => go(p.to)}>
              <p.icon className="mr-2 h-4 w-4" />
              {p.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="项目">
          {projects.map((p) => (
            <CommandItem key={p.slug} onSelect={() => go(`/projects/${p.slug}`)}>
              <Map className="mr-2 h-4 w-4" />
              {p.title}
              <span className="ml-auto font-mono text-xs text-muted-foreground">{p.year}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="文章">
          {posts.map((p) => (
            <CommandItem key={p.slug} onSelect={() => go(`/blog/${p.slug}`)}>
              <FileText className="mr-2 h-4 w-4" />
              {p.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="命令">
          <CommandItem
            disabled={flightActive}
            onSelect={() => {
              setOpen(false)
              toggleTheme()
            }}
          >
            <MoonStar className="mr-2 h-4 w-4" />
            切换深色 / 浅色模式
          </CommandItem>
          <CommandItem
            disabled={flightActive}
            onSelect={() => {
              setOpen(false)
              cycleAccent()
            }}
          >
            <Palette className="mr-2 h-4 w-4" />
            换一个心情色
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setOpen(false)
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            <ArrowUp className="mr-2 h-4 w-4" />
            回到顶部
          </CommandItem>
          <CommandItem onSelect={() => go("/now")}>
            <Layers className="mr-2 h-4 w-4" />
            {profile.name} 最近在干什么
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
