import { Link } from "react-router-dom"
import { ArrowRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageShell } from "@/components/shared"
import { usePageMeta } from "@/hooks/use-site"

export default function NotFound() {
  usePageMeta("404 · 迷路了")

  return (
    <PageShell className="grid min-h-[80vh] place-items-center text-center">
      <div>
        <p className="font-mono text-8xl font-bold text-brand/20">404</p>
        <span className="mt-2 inline-block animate-float text-6xl">🗺️</span>
        <h1 className="mt-4 text-2xl font-bold">这张地图上没有这个坐标</h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          要么是地址写错了，要么是我还没把这块大陆画上去。
          可以回首页看看，或者翻翻项目——那里一定有东西。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild className="rounded-xl">
            <Link to="/">
              <Home className="mr-1.5 h-4 w-4" />
              回首页
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-xl">
            <Link to="/projects">
              看看项目
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </PageShell>
  )
}
