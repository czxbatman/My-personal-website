import { useEffect, type ReactNode } from "react"
import {
  BrowserRouter,
  HashRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CommandPalette } from "@/components/layout/CommandPalette"
import { SiteStateContext, useCreateSiteState } from "@/hooks/use-site"
import { useKonami } from "@/components/fx"
import { projects, type ProjectScene } from "@/content/projects"
import Home from "@/pages/Home"
import Projects from "@/pages/Projects"
import ProjectDetail from "@/pages/ProjectDetail"
import Blog from "@/pages/Blog"
import BlogPost from "@/pages/BlogPost"
import Gallery from "@/pages/Gallery"
import Resume from "@/pages/Resume"
import Now from "@/pages/Now"
import About from "@/pages/About"
import NotFound from "@/pages/NotFound"
import Helicopter from "@/components/helicopter/Helicopter"

/* bundle.html 以 file:// 打开时自动降级为 Hash 路由 */
const Router = window.location.protocol === "file:" ? HashRouter : BrowserRouter

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}

function Page({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="flex-1"
    >
      {children}
    </motion.main>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route path="/projects" element={<Page><Projects /></Page>} />
        <Route path="/projects/:slug" element={<Page><ProjectDetail /></Page>} />
        <Route path="/blog" element={<Page><Blog /></Page>} />
        <Route path="/blog/:slug" element={<Page><BlogPost /></Page>} />
        <Route path="/gallery" element={<Page><Gallery /></Page>} />
        <Route path="/resume" element={<Page><Resume /></Page>} />
        <Route path="/now" element={<Page><Now /></Page>} />
        <Route path="/about" element={<Page><About /></Page>} />
        <Route path="*" element={<Page><NotFound /></Page>} />
      </Routes>
    </AnimatePresence>
  )
}

type SiteScene = "field-notes" | "index" | "evidence" | "editorial" | ProjectScene

function resolveScene(pathname: string): SiteScene {
  if (pathname === "/projects") return "index"
  if (pathname.startsWith("/projects/")) {
    const slug = pathname.split("/").pop()
    return projects.find((project) => project.slug === slug)?.scene ?? "index"
  }
  if (pathname === "/gallery") return "evidence"
  if (pathname === "/resume" || pathname.startsWith("/blog")) return "editorial"
  return "field-notes"
}

function SceneShell() {
  const { pathname } = useLocation()
  const scene = resolveScene(pathname)

  useEffect(() => {
    document.documentElement.dataset.scene = scene
  }, [scene])

  return (
    <div className="scene-shell flex min-h-screen flex-col" data-scene={scene}>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <CommandPalette />
      <Helicopter />
    </div>
  )
}

export default function App() {
  const siteState = useCreateSiteState()
  useKonami()

  return (
    <SiteStateContext.Provider value={siteState}>
      <Router>
        <ScrollToTop />
        <SceneShell />
      </Router>
    </SiteStateContext.Provider>
  )
}
