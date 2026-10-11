import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { TiltCard } from "@/components/fx"
import type { Project } from "@/content/projects"

/* ---------- 通用小节标题 ---------- */
export function SectionHeading({
  eyebrow,
  title,
  desc,
  action,
}: {
  eyebrow: string
  title: string
  desc?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
        <h2 className="mt-1.5 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        {desc && <p className="mt-2 max-w-xl text-sm text-muted-foreground">{desc}</p>}
      </div>
      {action}
    </div>
  )
}

/* ---------- 项目卡片（首页精选 & 列表页共用） ---------- */
export function ProjectCard({ project, projectsSearch }: { project: Project; projectsSearch?: string }) {
  return (
    <TiltCard className="h-full">
      <Link to={`/projects/${project.slug}`} state={projectsSearch === undefined ? undefined : { projectsSearch }} className="group block h-full">
        <article
          className="scene-preview flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5"
          data-scene={project.scene}
        >
          <div
            className="relative aspect-[16/9] overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})` }}
          >
            {project.cover ? (
              <img
                src={project.cover}
                alt={project.title + " 项目截图"}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(event) => {
                  event.currentTarget.style.display = "none"
                }}
              />
            ) : (
              <>
                <div className="dot-pattern absolute inset-0" />
                <span className="absolute inset-0 grid place-items-center text-5xl transition-transform duration-500 group-hover:rotate-6 group-hover:scale-125 sm:text-6xl">
                  {project.emoji}
                </span>
              </>
            )}
            <span className="absolute left-3 top-3 rounded-full bg-black/30 px-2.5 py-0.5 text-xs text-white backdrop-blur-sm">
              {project.status}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-semibold transition-colors group-hover:text-brand">{project.title}</h3>
              <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
            </div>
            <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {project.tagline}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                  {t}
                </span>
              ))}
            </div>
            <div className="project-card-footer"><span>{({reactor: "REACTOR / 桌面助手", blueprint: "BLUEPRINT / 系统与工程", "night-shift": "NIGHT SHIFT / 互动实验", checklist: "CHECKLIST / 效率工具", notebook: "NOTEBOOK / 学习记录", aviation: "AVIATION / 飞行实验"})[project.scene ?? "notebook"]}</span><span aria-hidden="true">探索项目 ↗</span></div>
          </div>
        </article>
      </Link>
    </TiltCard>
  )
}

/* ---------- 页面顶部通用容器 ---------- */
export function PageShell({
  children,
  className,
  scene,
}: {
  children: ReactNode
  className?: string
  scene?: string
}) {
  return (
    <div className={["page-shell mx-auto max-w-6xl px-4 pb-20 pt-28", className ?? ""].join(" ")} data-scene={scene}>
      {children}
    </div>
  )
}
