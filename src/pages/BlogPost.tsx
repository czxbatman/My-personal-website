import { Link, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageShell } from "@/components/shared"
import { Reveal } from "@/components/fx"
import { posts } from "@/content/posts"
import { usePageMeta } from "@/hooks/use-site"

export default function BlogPost() {
  const { slug } = useParams()
  const index = posts.findIndex((p) => p.slug === slug)
  const post = posts[index]
  usePageMeta(post ? post.title : "文章不存在")

  if (!post) {
    return (
      <PageShell className="grid min-h-[60vh] place-items-center text-center">
        <div>
          <span className="text-5xl">🗺️</span>
          <h1 className="mt-4 text-2xl font-bold">没有找到这篇文章</h1>
          <Button asChild className="mt-6 rounded-xl">
            <Link to="/blog">
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              返回博客列表
            </Link>
          </Button>
        </div>
      </PageShell>
    )
  }

  const prev = posts[index - 1]
  const next = posts[index + 1]

  return (
    <PageShell>
      <article className="mx-auto max-w-2xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          返回博客
        </Link>

        <header className="mt-6">
          <h1 className="text-3xl font-bold leading-tight tracking-tight">{post.title}</h1>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.minutes} 分钟阅读
            </span>
          </div>
        </header>

        {post.seed && (
          <p className="mt-6 rounded-xl bg-amber-400/10 px-4 py-2.5 text-sm text-amber-600 dark:text-amber-400">
            🌱 这是一篇种子文章：标题和骨架已就位，正文等真实内容补充。
          </p>
        )}

        <div className="mt-8 space-y-10">
          {post.sections.map((s, si) => (
            <Reveal key={s.heading} delay={si * 0.05}>
              <section>
                <h2 className="text-xl font-bold">{s.heading}</h2>
                {s.paragraphs.map((p, pi) => (
                  <p key={pi} className="mt-4 leading-loose text-muted-foreground">
                    {p}
                  </p>
                ))}
              </section>
            </Reveal>
          ))}
        </div>

        <nav className="mt-16 grid gap-4 border-t border-border/60 pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              to={`/blog/${prev.slug}`}
              className="group rounded-2xl border bg-card p-5 transition-colors hover:border-brand/40"
            >
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ArrowLeft className="h-3.5 w-3.5" /> 上一篇
              </p>
              <p className="mt-1.5 font-medium transition-colors group-hover:text-brand">{prev.title}</p>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              to={`/blog/${next.slug}`}
              className="group rounded-2xl border bg-card p-5 text-right transition-colors hover:border-brand/40"
            >
              <p className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                下一篇 <ArrowRight className="h-3.5 w-3.5" />
              </p>
              <p className="mt-1.5 font-medium transition-colors group-hover:text-brand">{next.title}</p>
            </Link>
          )}
        </nav>
      </article>
    </PageShell>
  )
}
