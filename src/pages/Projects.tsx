import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { Search, LayoutGrid, List, X, ArrowUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { PageShell, ProjectCard, SectionHeading } from "@/components/shared"
import { Reveal } from "@/components/fx"
import { allProjectTags, projects } from "@/content/projects"
import { usePageMeta } from "@/hooks/use-site"
import { cn } from "@/lib/utils"

export default function Projects() {
  usePageMeta("项目", "全部项目：按标签浏览，每个项目都有完整的复盘式案例研究。")
  const [params, setParams] = useSearchParams()
  const query = params.get("q") ?? ""
  const requestedTag = params.get("tag") ?? "全部"
  const tag = allProjectTags.includes(requestedTag) ? requestedTag : "全部"
  const view = params.get("view") === "list" ? "list" : "grid"
  function update(key: string, value: string) {
    setParams(previous => { const next = new URLSearchParams(previous); if (!value || value === "全部" || value === "grid") next.delete(key); else next.set(key, value); return next }, { replace: true })
  }
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter(p => (tag === "全部" || p.tags.includes(tag)) && (!q || [p.title,p.tagline,p.summary,...p.tech,...p.tags].join(" ").toLowerCase().includes(q)))
  }, [query, tag])

  return (
    <PageShell scene="index">
      <SectionHeading eyebrow="Selected work / project archive" title="作品索引柜" desc="桌面助手、交互实验、Agent 与学习记录。选一个方向，看看我是怎样把想法变成可以运行的作品。" />
      <div className="project-index-intro"><span>01 — 真实问题</span><ArrowUpRight size={14}/><span>02 — 动手实现</span><ArrowUpRight size={14}/><span>03 — 留下复盘</span></div>
      <div className="project-toolbar">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input aria-label="搜索项目" value={query} onChange={e => update("q",e.target.value)} placeholder="试试：桌面应用、Agent、Blender…" className="rounded-lg pl-9 pr-9" />
            {query && <button type="button" aria-label="清空搜索" onClick={() => update("q","")} className="absolute right-2 top-1/2 -translate-y-1/2 p-1"><X size={15}/></button>}
          </div>
          <div className="project-view-switch" role="group" aria-label="项目展示方式">
            <button type="button" aria-label="卡片视图" aria-pressed={view === "grid"} onClick={() => update("view","grid")}><LayoutGrid size={15}/></button>
            <button type="button" aria-label="列表视图" aria-pressed={view === "list"} onClick={() => update("view","list")}><List size={17}/></button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="按项目标签筛选">
          {["全部", ...allProjectTags].map(t => <button key={t} type="button" aria-pressed={tag === t} onClick={() => update("tag",t)} className={cn("rounded-full border px-3 py-1.5 text-xs transition-colors",tag === t ? "border-brand bg-brand text-brand-ink" : "border-border text-muted-foreground hover:border-brand/50 hover:text-foreground")}>{t}</button>)}
        </div>
      </div>
      <div className="my-5 flex items-center justify-between text-xs text-muted-foreground"><p role="status">显示 {filtered.length} / {projects.length} 个项目</p>{(query || tag !== "全部") && <button type="button" className="text-brand hover:underline" onClick={() => setParams(view === "list" ? {view:"list"} : {})}>重置筛选</button>}</div>
      {filtered.length === 0 ? <div className="grid place-items-center rounded-2xl border border-dashed px-6 py-16 text-center"><Search size={26} className="text-muted-foreground"/><p className="mt-4 text-sm">没有找到匹配的项目</p><p className="mt-2 text-xs text-muted-foreground">试试更短的关键词，或清除当前标签。</p><button type="button" className="mt-5 rounded-lg border px-4 py-2 text-sm hover:bg-secondary" onClick={() => setParams(view === "list" ? {view:"list"} : {})}>查看全部项目</button></div> :
        <div className={`project-results ${view === "list" ? "is-list" : "is-grid"}`}>
          {filtered.map((p,i) => <Reveal key={p.slug} delay={Math.min(i * .04,.2)}><ProjectCard project={p} projectsSearch={params.toString()}/></Reveal>)}
        </div>}
    </PageShell>
  )
}
