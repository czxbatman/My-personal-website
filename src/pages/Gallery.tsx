import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { PageShell, SectionHeading } from "@/components/shared"
import { Reveal } from "@/components/fx"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { galleryItems, galleryTags } from "@/content/gallery"
import { projects } from "@/content/projects"
import { usePageMeta } from "@/hooks/use-site"
import { cn } from "@/lib/utils"

export default function Gallery() {
  usePageMeta("画廊", "真实项目、学习计划、工具体验与排错记录。")
  const [tag, setTag] = useState("全部")
  const [params, setParams] = useSearchParams()
  const selected = galleryItems.find(item => item.src === params.get("image")) ?? null
  function select(src?: string) {
    setParams(previous => { const next = new URLSearchParams(previous); if (src) next.set("image", src); else next.delete("image"); return next }, { replace: true })
  }
  const items = tag === "全部" ? galleryItems : galleryItems.filter((item) => item.tag === tag)
  return (
    <PageShell>
      <SectionHeading eyebrow="Gallery" title="学习与实践的记录" desc="成功、计划和遇到的问题，都属于过程。点击图片查看大图。" action={<span className="font-mono text-sm text-muted-foreground">{items.length} / {galleryItems.length} 张</span>} />
      <div className="flex flex-wrap gap-2" aria-label="图片分类">
        {galleryTags.map((value) => (
          <button key={value} type="button" aria-pressed={tag === value} onClick={() => setTag(value)} className={cn("rounded-full border px-3 py-1.5 text-xs transition-colors", tag === value ? "border-brand bg-brand text-brand-ink" : "border-border text-muted-foreground hover:border-brand/50 hover:text-foreground")}>
            {value} <span className="ml-1 opacity-70">{value === "全部" ? galleryItems.length : galleryItems.filter((item) => item.tag === value).length}</span>
          </button>
        ))}
      </div>
      <div className="mt-8 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={Math.min(index * .04, .2)}>
            <figure className="evidence-frame overflow-hidden rounded-2xl border bg-card transition-colors hover:border-brand/40">
              <button type="button" onClick={() => select(item.src)} aria-label={"放大：" + item.title} className="group block w-full overflow-hidden" style={{ background: "linear-gradient(135deg, " + item.gradient[0] + ", " + item.gradient[1] + ")" }}>
                {item.src ? <img src={item.src} alt={item.title} loading="lazy" className="aspect-[4/3] w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]" /> : <span className="grid aspect-[4/3] place-items-center text-6xl">{item.emoji}</span>}
              </button>
              <figcaption className="p-4">
                <span className="text-[10px] uppercase tracking-wider text-brand">{item.tag}</span>
                <h2 className="mt-1.5 text-sm font-medium">{item.title}</h2>
                <p className="mt-2 text-[10px] text-muted-foreground">{item.stage}{item.recordedAt && ` · ${item.recordedAt} 记录`}</p>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">{item.description}</p>
                {item.projectSlug && <Link to={`/projects/${item.projectSlug}`} className="mt-3 inline-block text-xs text-brand hover:underline">{projects.find(project => project.slug === item.projectSlug)?.title} ↗</Link>}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) select() }}>
        <DialogContent className="max-h-[94dvh] max-w-[min(94vw,1100px)] overflow-auto rounded-2xl p-5">
          <DialogTitle className="pr-8">{selected?.title}</DialogTitle>
          <DialogDescription>{selected?.description}</DialogDescription>
          {selected?.src && <img src={selected.src} alt={selected.title} className="max-h-[72dvh] w-full rounded-lg object-contain" />}
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
