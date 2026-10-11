import { Link } from "react-router-dom"
import { ArrowRight, ChevronDown, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Magnetic,
  Marquee,
  ParallaxBlobs,
  Reveal,
  Typewriter,
} from "@/components/fx"
import { ProjectCard, SectionHeading } from "@/components/shared"
import { profile, skills } from "@/content/profile"
import { projects } from "@/content/projects"
import { principles } from "@/content/principles"
import { posts } from "@/content/posts"
import { now } from "@/content/now"
import { growth } from "@/content/growth"
import { usePageMeta } from "@/hooks/use-site"

function Hero() {
  return (
    <section className="home-hero relative flex min-h-[84vh] items-center overflow-hidden">
      <ParallaxBlobs />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-16 pt-32 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              {profile.status}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 font-mono text-sm text-brand">{"// 泽鑫 · Learning by building"}</p>
            <h1 className="mt-3 whitespace-pre-line text-[clamp(2.4rem,4.8vw,4.3rem)] font-bold leading-[1.15] tracking-tight">
              {profile.headline}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-4 min-h-8 font-mono text-base text-muted-foreground sm:text-lg">
              <Typewriter phrases={profile.typewriter} />
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">{profile.intro}</p>
          </Reveal>

          <Reveal delay={0.32} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button size="lg" asChild className="rounded-xl px-6">
                <Link to="/projects">
                  看看我的项目
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic strength={0.18}>
              <Button size="lg" variant="outline" asChild className="rounded-xl px-6">
                <Link to="/resume">在线简历</Link>
              </Button>
            </Magnetic>
            {profile.email && (
              <a
                href={"mailto:" + profile.email}
                className="ml-1 grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
                aria-label="发邮件"
              >
                <Mail className="h-4 w-4" />
              </a>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.2} className="hero-field-note relative hidden lg:block">
          <div className="field-note-card rounded-2xl border bg-card/70 p-7 backdrop-blur">
            <p className="font-mono text-xs uppercase tracking-[.2em] text-brand">Current chapter / 2026.10</p>
            <h2 className="mt-5 text-2xl font-semibold leading-snug">先理解一个问题，<br />再向前走一步。</h2>
            <div className="mt-6 space-y-4 border-t pt-5 text-sm">
              <p><span className="mr-3 text-brand">01</span>专升本 · 英语持续学习</p>
              <p><span className="mr-3 text-brand">02</span>金砖备赛 · 补环境与工程基础</p>
              <p><span className="mr-3 text-brand">03</span>真实项目 · 留下过程与证据</p>
            </div>
            <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-brand">读我的成长经历 <ArrowRight className="h-3 w-3" /></Link>
          </div>
        </Reveal>
      </div>

      <a href="#featured" aria-label="向下查看精选项目" className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-border p-2 text-muted-foreground hover:text-brand">
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  )
}

function SkillMarquee() {
  const items = [...skills.map.map((s) => s.name), ...skills.tools]
  return <Marquee items={items} />
}

function Featured() {
  const featured = projects.filter((p) => p.featured)
  return (
    <section id="featured" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
      <SectionHeading
        eyebrow="Featured"
        title="精选项目"
        desc="做过的事、正在补的基础，以及过程里改变的想法。"
        action={
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand transition-transform hover:translate-x-0.5"
          >
            全部项目 <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />
      <div className="featured-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function GrowthJourney() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <SectionHeading eyebrow="My journey" title="从做出来，到慢慢学懂" desc="我的学习不是一条直线，每一次项目都让我多看清一点。" />
      <div className="growth-grid grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {growth.map((item, index) => (
          <Reveal key={item.title} delay={index * .04}>
            <article className="field-note-card h-full rounded-2xl border bg-card p-6">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="font-mono text-brand">0{index + 1} / {item.date}</span>
                <span className="rounded-full bg-secondary px-2 py-1 text-muted-foreground">{item.status}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
              {item.projectSlug && <Link to={`/projects/${item.projectSlug}`} className="mt-4 inline-block text-xs text-brand hover:underline">看这段经历的项目记录 ↗</Link>}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function BentoCard({
  to,
  className,
  children,
}: {
  to?: string
  className?: string
  children: React.ReactNode
}) {
  const inner = (
    <div
      className={`h-full rounded-2xl border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5 ${className ?? ""}`}
    >
      {children}
    </div>
  )
  if (to)
    return (
      <Link to={to} className="block h-full">
        {inner}
      </Link>
    )
  return inner
}

function Bento() {
  const latestPost = posts[0]
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24">
      <SectionHeading eyebrow="Live" title="此刻 & 速览" desc="正在发生的事、立过的规矩、最新写下的字。" />
      <div className="grid auto-rows-[minmax(150px,auto)] grid-cols-2 gap-4 lg:grid-cols-4">
        <BentoCard to="/now" className="col-span-2 row-span-2">
          <p className="font-mono text-xs uppercase tracking-widest text-brand">📍 正在做</p>
          <ul className="mt-4 space-y-3">
            {now.doing.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-sm leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {d}
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-xl bg-secondary/70 p-3 text-xs leading-relaxed text-muted-foreground">
            下一步：{now.next[0]}
          </div>
        </BentoCard>

        <BentoCard className="col-span-2">
          <p className="font-mono text-xs uppercase tracking-widest text-brand">⚡ 数字</p>
          <div className="mt-3 grid grid-cols-4 gap-2 text-center">
            {profile.stats.map((s) => (
              <div key={s.label}>
                <p className="text-xl font-bold text-brand sm:text-2xl">{s.value}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard to="/about" className="col-span-2">
          <p className="font-mono text-xs uppercase tracking-widest text-brand">🧱 原则墙（节选）</p>
          <ul className="mt-3 space-y-2">
            {principles.slice(0, 3).map((p, i) => (
              <li key={p.text} className="flex items-baseline gap-2.5 text-sm">
                <span className="font-mono text-xs text-brand">0{i + 1}</span>
                <span className="line-clamp-1">{p.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">每条都被真实项目验证过 →</p>
        </BentoCard>

        <BentoCard to={`/blog/${latestPost.slug}`}>
          <p className="font-mono text-xs uppercase tracking-widest text-brand">{latestPost.seed ? "✍️ 写作草稿" : "✍️ 最新文章"}</p>
          <p className="mt-3 line-clamp-2 text-sm font-medium leading-relaxed">{latestPost.title}</p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">{latestPost.date}</p>
        </BentoCard>

        <BentoCard to="/about">
          <p className="font-mono text-xs uppercase tracking-widest text-brand">🛠 技能域</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {skills.map.map((s) => (
              <span key={s.name} className="rounded-md bg-secondary px-2 py-0.5 text-xs">
                {s.name}
              </span>
            ))}
          </div>
        </BentoCard>
      </div>
    </section>
  )
}

export default function Home() {
  usePageMeta(undefined, "泽鑫的真实项目与成长记录：AI 辅助开发、金砖备赛、专升本学习，以及可互动的 3D 直升机。")
  return (
    <>
      <Hero />
      <SkillMarquee />
      <Featured />
      <GrowthJourney />
      <Bento />
    </>
  )
}
