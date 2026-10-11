import { useEffect } from "react"

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
