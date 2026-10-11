import { Link } from "react-router-dom"
import { Mail, MapPin } from "lucide-react"
import { profile } from "@/content/profile"
import { CapsuleLinks } from "@/components/CapsuleLinks"
import { siteNavigation } from "@/content/navigation"

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2.5 font-bold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-base text-brand-ink">
                🗺️
              </span>
              {profile.name}
              <span className="text-brand">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {profile.headline}
            </p>
            {profile.location && <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </p>}
          </div>

          <div>
            <p className="text-sm font-semibold">站内导航</p>
            <div className="mt-3"><CapsuleLinks items={siteNavigation} label="页尾站内导航" compact /></div>
          </div>

          <div>
            <p className="text-sm font-semibold">找到我</p>
            {profile.email && (
              <a
                href={"mailto:" + profile.email}
                className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
              >
                <Mail className="h-3.5 w-3.5" />
                {profile.email}
              </a>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
                >
                  {s.label}
                  {s.todo ? " (待补链接)" : ""}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© 2026 {profile.name} · 和 AI 一起做，也一点点学懂</p>
          <p className="font-mono">彩蛋：试试 ↑ ↑ ↓ ↓ ← → ← → B A</p>
        </div>
      </div>
    </footer>
  )
}
