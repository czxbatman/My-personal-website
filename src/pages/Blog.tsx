import { Link } from "react-router-dom"
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react"
import { PageShell, SectionHeading } from "@/components/shared"
import { Reveal } from "@/components/fx"
import { posts } from "@/content/posts"
import { usePageMeta } from "@/hooks/use-site"

export default function Blog() {
  usePageMeta("博客", "从真实项目里长出来的思考：学习法、AI 工作流、复盘。")

  return (
    <PageShell>
      <SectionHeading
        eyebrow="Blog"
        title="博客"
        desc="文章都从复盘里长出来——目前是三篇种子文章，正文待补。"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <Link
              to={`/blog/${p.slug}`}
              className="group flex h-full flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {p.date}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {p.seed ? "草稿" : `${p.minutes} 分钟`}
                </span>
              </div>
              <h3 className="mt-3 font-semibold leading-snug transition-colors group-hover:text-brand">
                {p.title}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.excerpt}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                      <Tag className="h-3 w-3" />
                      {t}
                    </span>
                  ))}
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand" />
              </div>
              {p.seed && (
                <p className="mt-3 rounded-lg bg-amber-400/10 px-2.5 py-1 text-xs text-amber-600 dark:text-amber-400">
                  🌱 种子文章 · 正文待补
                </p>
              )}
            </Link>
          </Reveal>
        ))}
      </div>
    </PageShell>
  )
}
