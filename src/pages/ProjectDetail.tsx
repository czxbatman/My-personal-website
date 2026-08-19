import { Link, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageShell } from "@/components/shared"
import { Reveal } from "@/components/fx"
import { projects } from "@/content/projects"
import { usePageMeta } from "@/hooks/use-site"

export default function ProjectDetail() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  usePageMeta(project ? project.title : "项目不存在")

  if (!project) {
    return (
      <PageShell className="grid min-h-[60vh] place-items-center text-center">
        <div>
          <span className="text-5xl">🗺️</span>
          <h1 className="mt-4 text-2xl font-bold">没有找到这个项目</h1>
          <Button asChild className="mt-6 rounded-xl">
            <Link to="/projects">
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              返回全部项目
            </Link>
          </Button>
        </div>
      </PageShell>
    )
  }

  const prev = projects[index - 1]
  const next = projects[index + 1]
  const sceneLabel =
    {
      reactor: "Reactor Lab",
      blueprint: "Blueprint System",
      "night-shift": "Night-shift Test",
      checklist: "Checklist Utility",
      notebook: "Code Notebook",
    }[project.scene ?? "notebook"]

  return (
    <PageShell scene={project.scene}>
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
      >
        <ArrowLeft className="h-4 w-4" />
        返回全部项目
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{project.tagline}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-brand/10 px-3 py-1 font-medium text-brand">{project.status}</span>
          <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">{project.year}</span>
          <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">{project.role}</span>
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 transition-colors hover:border-brand/50 hover:text-brand"
            >
              在线演示 <ExternalLink className="h-3 w-3" />
            </a>
          )}
          {project.links?.source && (
            <a
              href={project.links.source}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 transition-colors hover:border-brand/50 hover:text-brand"
            >
              源码 <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </header>

      <Reveal className="mt-8">
        <div
          className="project-hero relative flex aspect-[21/9] items-center justify-center overflow-hidden rounded-2xl shadow-lg"
          data-scene={project.scene}
          style={{ background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})` }}
        >
          {project.cover ? (
            <img
              src={project.cover}
              alt={project.title + " 项目截图"}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none"
              }}
            />
          ) : (
            <>
              <div className="dot-pattern absolute inset-0" />
              <span className="text-7xl drop-shadow-lg sm:text-8xl">{project.emoji}</span>
            </>
          )}
          <span className="absolute bottom-3 right-4 rounded-full bg-black/30 px-3 py-1 text-xs text-white/90 backdrop-blur-sm">
            {sceneLabel}
          </span>
        </div>
      </Reveal>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand">概述</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{project.summary}</p>
      </section>

      {project.retro && (
        <section className="mt-10 max-w-4xl">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand">复盘 · 三段式</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              { icon: "💭", label: "我原来以为", text: project.retro.before, style: "border-l-muted-foreground/40" },
              { icon: "🔍", label: "实际上", text: project.retro.actual, style: "border-l-brand" },
              { icon: "🔧", label: "如果重来", text: project.retro.redo, style: "border-l-amber-400" },
            ].map((card) => (
              <Reveal key={card.label}>
                <div className={`h-full rounded-2xl border border-l-4 bg-card p-5 ${card.style}`}>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {card.icon} {card.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed">{card.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {project.highlights && (
        <section className="mt-10 max-w-3xl">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand">亮点</h2>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm leading-relaxed">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {h}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 max-w-3xl">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand">技术栈 / 关键词</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
              {t}
            </span>
          ))}
        </div>
      </section>

      <nav className="mt-16 grid gap-4 border-t border-border/60 pt-8 sm:grid-cols-2">
        {prev ? (
          <Link
            to={`/projects/${prev.slug}`}
            className="group rounded-2xl border bg-card p-5 transition-colors hover:border-brand/40"
          >
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> 上一个项目
            </p>
            <p className="mt-1.5 font-medium transition-colors group-hover:text-brand">
              {prev.emoji} {prev.title}
            </p>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={`/projects/${next.slug}`}
            className="group rounded-2xl border bg-card p-5 text-right transition-colors hover:border-brand/40"
          >
            <p className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
              下一个项目 <ArrowRight className="h-3.5 w-3.5" />
            </p>
            <p className="mt-1.5 font-medium transition-colors group-hover:text-brand">
              {next.title} {next.emoji}
            </p>
          </Link>
        )}
      </nav>
    </PageShell>
  )
}
