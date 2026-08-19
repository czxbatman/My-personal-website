import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { PageShell, ProjectCard, SectionHeading } from "@/components/shared"
import { Reveal } from "@/components/fx"
import { allProjectTags, projects } from "@/content/projects"
import { usePageMeta } from "@/hooks/use-site"
import { cn } from "@/lib/utils"

export default function Projects() {
  usePageMeta("项目", "全部项目：按标签浏览，每个项目都有完整的复盘式案例研究。")
  const [query, setQuery] = useState("")
  const [tag, setTag] = useState("全部")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      const matchTag = tag === "全部" || p.tags.includes(tag)
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q))
      return matchTag && matchQuery
    })
  }, [query, tag])

  return (
    <PageShell scene="index">
      <SectionHeading
        eyebrow="Projects"
        title="作品索引柜"
        desc="这些项目记录的不只是我“做过什么”，更像一条学习轨迹：从理解前端基础，到完成真实部署；从功能堆叠，到开始理解架构；从让 AI 帮我写代码，到尝试设计 Agent、Skill 和完整工作流。"
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索项目名称或技术…"
            className="rounded-xl pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["全部", ...allProjectTags].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                tag === t
                  ? "border-brand bg-brand text-brand-ink"
                  : "border-border text-muted-foreground hover:border-brand/50 hover:text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 grid place-items-center rounded-2xl border border-dashed p-16 text-center text-muted-foreground">
          <span className="text-4xl">🗺️</span>
          <p className="mt-3 text-sm">这张地图上没有匹配的项目，换个关键词试试。</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i * 0.06, 0.3)}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      )}
    </PageShell>
  )
}
