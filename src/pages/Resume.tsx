import { Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PageShell } from "@/components/shared"
import { profile, resume } from "@/content/profile"
import { principles } from "@/content/principles"
import { usePageMeta } from "@/hooks/use-site"

export default function Resume() {
  usePageMeta("简历", "泽鑫的在线简历：AI 编程学习者与项目实践记录。")
  const contact = [profile.location, "github.com/czxbatman"].join(" · ")

  return (
    <PageShell>
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Resume</p>
          <h1 className="mt-1 text-2xl font-bold">在线简历</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl" onClick={() => window.print()}>
            <Printer className="mr-1.5 h-4 w-4" />
            打印 / 导出 PDF
          </Button>
          <Button
            className="rounded-xl"
            asChild
            title="放入 public/简历.pdf 后此按钮即为真实下载"
          >
            <a href="/简历.pdf" download>
              <Download className="mr-1.5 h-4 w-4" />
              下载 PDF
            </a>
          </Button>
        </div>
      </div>

      <div className="print-plain mx-auto max-w-3xl rounded-2xl border bg-card p-8 shadow-sm sm:p-10">
        <header>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{contact}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{resume.summary}</p>
        </header>

        <Separator className="my-6" />

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand">项目经历</h2>
          <div className="mt-4 space-y-6">
            {resume.experience.map((e) => (
              <div key={e.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold">{e.title}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{e.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{e.org}</p>
                <ul className="mt-2 space-y-1.5">
                  {e.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-6" />

        <section className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand">教育经历</h2>
            {resume.education.map((e) => (
              <div key={e.title} className="mt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold">{e.title}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{e.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{e.org}</p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand">核心原则（节选）</h2>
            <ul className="mt-4 space-y-2">
              {principles.slice(0, 4).map((p) => (
                <li key={p.text} className="text-sm leading-relaxed text-muted-foreground">
                  · {p.text}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
