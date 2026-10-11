import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ChevronDown, ChevronUp, Crosshair, Pause, PlaneTakeoff, RotateCcw, ScanLine, Waypoints } from "lucide-react"
import type { HelicopterAction, HelicopterScene, HelicopterStatus } from "./engine.mjs"
import "./helicopter.css"

const actions = [
  { id: "takeoff", title: "起飞", icon: PlaneTakeoff },
  { id: "patrol", title: "巡逻", icon: Waypoints },
  { id: "search", title: "搜索", icon: ScanLine },
  { id: "point", title: "指点飞行", icon: Crosshair },
  { id: "hold", title: "悬停", icon: Pause },
  { id: "return", title: "返航", icon: RotateCcw },
] as const
const stateLabels: Record<string, string> = { PARKED: "停机展示", ENTERING: "飞入屏幕", INTRO_HOLD: "准备巡逻", TAKING_OFF: "起飞中", HOVERING: "悬停中", HOLDING: "保持当前位置", FLYING: "飞往目标", RETURNING: "返航中", LANDING: "降落中" }

export default function Helicopter() {
  const host = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const scene = useRef<HelicopterScene | null>(null)
  const [collapsed, setCollapsed] = useState(() => innerWidth < 1200)
  const [status, setStatus] = useState<HelicopterStatus>({ state: "PARKED", ready: false, pointMode: false })
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    import("./engine.mjs").then(({ createHelicopterScene }) => {
      if (cancelled || !host.current || !stage.current) return
      try {
        scene.current = createHelicopterScene({ host: host.current, stage: stage.current, reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches, onStatus: setStatus, onError: () => setFailed(true) })
      } catch { setFailed(true) }
    }).catch(() => { if (!cancelled) setFailed(true) })
    return () => { cancelled = true; scene.current?.dispose(); scene.current = null }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.helicopter = collapsed ? "collapsed" : "expanded"
    scene.current?.layout()
    return () => { delete document.documentElement.dataset.helicopter }
  }, [collapsed])

  function toggle() {
    if (!collapsed) scene.current?.collapse()
    setCollapsed(!collapsed)
  }
  function control(action: HelicopterAction) { scene.current?.command(action) }

  return (
    <>
      <div ref={host} className="helicopter-canvas" aria-hidden="true" />
      <aside className={`helicopter-dock ${collapsed ? "is-collapsed" : ""}`} aria-label="直升机展示与控制" data-helicopter-ui="true">
        <div className="dock-header">
          <div><p className="dock-eyebrow">Flight studio</p>{!collapsed && <h2>Desktop Helicopter</h2>}</div>
          <button type="button" onClick={toggle} aria-expanded={!collapsed} aria-label={collapsed ? "展开直升机控制" : "收起直升机控制"}>{collapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button>
        </div>
        <div ref={stage} className="dock-stage" aria-label="拖动旋转直升机展示">
          {failed ? <img src="/images/projects/desktop-helicopter.jpg" alt="直升机静态模型" /> : !status.ready && <span className="dock-loading">准备飞机…</span>}
        </div>
        {!collapsed && (
          <>
            <p className="dock-status" role="status">{failed ? "静态模型展示" : !status.ready ? "正在加载模型" : status.pointMode ? "点空白处飞行 · Esc 退出" : stateLabels[status.state] ?? "飞行中"}</p>
            <p className="dock-instruction">{status.state === "PARKED" ? "拖动停机区，换个角度看飞机" : "随时选择动作，接管当前飞行"}</p>
            <div className="dock-controls">
              {actions.map(({ id, title, icon: Icon }) => <button type="button" key={id} disabled={!status.ready || failed} aria-pressed={id === "point" ? status.pointMode : undefined} onClick={() => control(id)}><Icon size={14} /><span>{title}</span></button>)}
            </div>
            <Link to="/projects/desktop-helicopter" className="dock-project-link">关于这架飞机 ↗</Link>
          </>
        )}
      </aside>
    </>
  )
}
