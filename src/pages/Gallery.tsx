import { useState } from "react"
import { PageShell, SectionHeading } from "@/components/shared"
import { Reveal } from "@/components/fx"
import { galleryItems, galleryTags } from "@/content/gallery"
import { usePageMeta } from "@/hooks/use-site"
import { cn } from "@/lib/utils"

export default function Gallery() {
  usePageMeta("画廊", "项目截图、AI 工具探索与代码实验。")
  const [tag, setTag] = useState("全部")
  const items = tag === "全部" ? galleryItems : galleryItems.filter((i) => i.tag === tag)

  return (
    <PageShell>
      <SectionHeading
        eyebrow="Gallery"
        title="证据墙"
        desc="项目截图、AI 工具探索与代码实验。每一张都来自真实的学习过程。"
      />

      <div className="flex flex-wrap gap-2">
        {galleryTags.map((t) => (
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

      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={Math.min(i * 0.05, 0.25)}>
            <figure
              className="evidence-frame group relative break-inside-avoid overflow-hidden rounded-2xl border transition-colors hover:border-brand/40"
              style={{ background: `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})` }}
            >
              {item.src ? (
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="block w-full transition-transform duration-500 group-hover:scale-[1.02]"
                  onError={(event) => {
                    event.currentTarget.style.display = "none"
                  }}
                />
              ) : (
                <>
                  <div className="dot-pattern absolute inset-0" />
                  <div
                    className="flex items-center justify-center py-14 text-6xl transition-transform duration-500 group-hover:scale-110"
                    style={{ minHeight: 120 + (i % 3) * 40 }}
                  >
                    {item.emoji}
                  </div>
                </>
              )}
              <figcaption className="flex items-center justify-between bg-card/90 px-4 py-3 backdrop-blur">
                <span className="text-sm">{item.title}</span>
                <span className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{item.tag}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </PageShell>
  )
}
