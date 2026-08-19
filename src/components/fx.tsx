import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

/* ---------- 滚动进入视口时的浮现动画 ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- 打字机（多句轮播） ---------- */
export function Typewriter({ phrases, className }: { phrases: string[]; className?: string }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[index % phrases.length]
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), 1800)
      return () => clearTimeout(t)
    }
    if (deleting && text === "") {
      setDeleting(false)
      setIndex((i) => (i + 1) % phrases.length)
      return
    }
    const t = setTimeout(
      () => setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)),
      deleting ? 35 : 75
    )
    return () => clearTimeout(t)
  }, [text, deleting, index, phrases])

  return <span className={`caret ${className ?? ""}`}>{text}</span>
}

/* ---------- 磁性按钮：悬停时被光标轻微吸附 ---------- */
export function Magnetic({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 240, damping: 16 })
  const sy = useSpring(y, { stiffness: 240, damping: 16 })
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  )
}

/* ---------- 3D 倾斜卡片 ---------- */
export function TiltCard({
  children,
  className,
  max = 7,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 18 })
  const sry = useSpring(ry, { stiffness: 200, damping: 18 })
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    ry.set(px * max * 2)
    rx.set(-py * max * 2)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        rx.set(0)
        ry.set(0)
      }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ---------- 跑马灯 ---------- */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items]
  return (
    <div className="relative overflow-hidden py-3 border-y border-border/60">
      <div className="flex w-max animate-marquee gap-3">
        {row.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
    </div>
  )
}

/* ---------- 视差光斑背景（跟随鼠标缓慢漂移的柔和色块） ---------- */
export function ParallaxBlobs() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 20 })
  const sy = useSpring(my, { stiffness: 40, damping: 20 })

  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 60)
      my.set((e.clientY / window.innerHeight - 0.5) * 60)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [mx, my])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand/20 blur-3xl animate-float"
      />
      <motion.div
        style={{ x: sy, y: sx }}
        className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-sky-400/15 dark:bg-sky-500/10 blur-3xl animate-float [animation-delay:1.5s]"
      />
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-300/15 dark:bg-amber-400/10 blur-3xl animate-float [animation-delay:3s]"
      />
    </div>
  )
}

/* ---------- 点击换表情的头像（彩蛋，头像照片就位前的占位） ---------- */
const FACES = ["🗺️", "🧭", "⚙️", "🤖", "🐈", "😎"]

export function EmojiAvatar({ size = 120 }: { size?: number }) {
  const [face, setFace] = useState(0)
  return (
    <motion.button
      type="button"
      aria-label="点我换表情"
      title="点我换表情"
      onClick={() => setFace((f) => (f + 1) % FACES.length)}
      whileTap={{ scale: 0.85 }}
      className="grid place-items-center rounded-3xl border-2 border-brand/40 bg-card shadow-lg shadow-brand/10 cursor-pointer select-none"
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      <motion.span
        key={face}
        initial={{ scale: 0, rotate: -24 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 16 }}
      >
        {FACES[face]}
      </motion.span>
    </motion.button>
  )
}

/* ---------- Konami Code 彩蛋：↑↑↓↓←→←→BA 撒表情 ---------- */
export function useKonami() {
  useEffect(() => {
    const seq = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
    ]
    let pos = 0
    const onKey = (e: KeyboardEvent) => {
      pos = e.key === seq[pos] ? pos + 1 : e.key === seq[0] ? 1 : 0
      if (pos === seq.length) {
        pos = 0
        emojiBurst()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])
}

function emojiBurst() {
  const emojis = ["🗺️", "🧭", "✨", "🎉", "🐱", "🤖"]
  for (let i = 0; i < 28; i++) {
    const el = document.createElement("span")
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)]
    el.style.cssText = `position:fixed;z-index:9999;pointer-events:none;font-size:${16 + Math.random() * 20}px;left:${Math.random() * 100}vw;top:-40px;transition:all ${1.6 + Math.random() * 1.4}s cubic-bezier(.3,.6,.6,1);`
    document.body.appendChild(el)
    requestAnimationFrame(() => {
      el.style.transform = `translateY(${window.innerHeight + 120}px) rotate(${(Math.random() - 0.5) * 720}deg)`
      el.style.opacity = "0.9"
    })
    setTimeout(() => el.remove(), 3200)
  }
}
