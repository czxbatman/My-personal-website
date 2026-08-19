import { BookOpen, Compass, Flag } from "lucide-react"
import { PageShell, SectionHeading } from "@/components/shared"
import { Reveal } from "@/components/fx"
import { now } from "@/content/now"
import { usePageMeta } from "@/hooks/use-site"

export default function Now() {
  usePageMeta("近况", "最近在做什么、在学什么、下一步是什么。")

  return (
    <PageShell>
      <SectionHeading
        eyebrow="Now"
        title="近况"
        desc="回答一个问题：最近你在忙什么？"
        action={
          <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
            上次更新：{now.updatedAt}
          </span>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { icon: Flag, title: "正在做", items: now.doing, tint: "text-brand" },
          { icon: BookOpen, title: "正在学", items: now.learning, tint: "text-sky-500" },
          { icon: Compass, title: "下一步", items: now.next, tint: "text-amber-500" },
        ].map((col, i) => (
          <Reveal key={col.title} delay={i * 0.06}>
            <div className="h-full rounded-2xl border bg-card p-6">
              <col.icon className={`h-5 w-5 ${col.tint}`} />
              <h3 className="mt-3 font-semibold">{col.title}</h3>
              <ul className="mt-3 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <section className="mt-16 max-w-2xl">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Timeline</h2>
        <div className="relative mt-6 space-y-8 border-l-2 border-border pl-6">
          {now.timeline.map((t, i) => (
            <Reveal key={t.date} delay={i * 0.05}>
              <div className="relative">
                <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-background bg-brand" />
                <p className="font-mono text-xs text-brand">{t.date}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
