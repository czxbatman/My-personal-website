import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ChevronDown, ChevronUp, Crosshair, Pause, PlaneTakeoff, RotateCcw, ScanLine, Waypoints, Radio } from "lucide-react"
import { useSiteState } from "@/hooks/use-site"
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
const stateLabels: Record<string, string> = { PARKED: "已停机 · 待命", ENTERING: "正在出场", INTRO_HOLD: "准备巡逻", TAKING_OFF: "起飞中", HOVERING: "空中待命", HOLDING: "保持当前位置", FLYING: "飞往目标", RETURNING: "正在返航", LANDING: "正在降落" }

export default function Helicopter() {
  const host = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const scene = useRef<HelicopterScene | null>(null)
  const pendingCollapse = useRef(false)
  const { pathname } = useLocation()
  const [expandedRoute, setExpandedRoute] = useState<string | null>(() => innerWidth >= 1200 && pathname === "/" ? pathname : null)
  const collapsed = expandedRoute !== pathname
  const [status, setStatus] = useState<HelicopterStatus>({ state: "PARKED", ready: false, pointMode: false })
  const [failed, setFailed] = useState(false)
  const { setFlightActive } = useSiteState()
  const active = status.ready && !failed && (status.state !== "PARKED" || status.pointMode)
  const parked = status.state === "PARKED"

  useEffect(() => {
    let cancelled = false
    import("./engine.mjs").then(({ createHelicopterScene }) => {
      if (cancelled || !host.current || !stage.current) return
      try {
        scene.current = createHelicopterScene({ host: host.current, stage: stage.current, reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
          onStatus: (next) => {
            if (cancelled) return
            setStatus(next)
            if (pendingCollapse.current && next.state === "PARKED") { pendingCollapse.current = false; setExpandedRoute(null) }
          }, onError: () => { if (!cancelled) { setFailed(true); pendingCollapse.current = false } } })
      } catch { setFailed(true) }
    }).catch(() => { if (!cancelled) setFailed(true) })
    return () => { cancelled = true; scene.current?.dispose(); scene.current = null }
  }, [])

  useEffect(() => {
    setFlightActive(active)
    document.documentElement.dataset.flight = active ? "active" : "idle"
    return () => { delete document.documentElement.dataset.flight }
  }, [active, setFlightActive])

  useEffect(() => {
    document.documentElement.dataset.helicopter = collapsed ? "collapsed" : "expanded"
    scene.current?.layout()
    return () => { delete document.documentElement.dataset.helicopter }
  }, [collapsed])

  function toggle() {
    if (collapsed) { pendingCollapse.current = false; setExpandedRoute(pathname) }
    else if (active) { pendingCollapse.current = true; scene.current?.command("return") }
    else setExpandedRoute(null)
  }
  function control(action: HelicopterAction) { pendingCollapse.current = false; scene.current?.command(action) }

  return (
    <>
      <div className="flight-atmosphere" aria-hidden="true"><i /><i /></div>
      <div ref={host} className="helicopter-canvas" aria-hidden="true" />
      {active && <div className="flight-telemetry" data-helicopter-ui="true"><span className="signal-light" /><Radio size={13} /><span>警航模式 <b> / AIR UNIT 07</b></span><button onClick={() => control("return")} type="button">返航退出 <RotateCcw size={12} /></button></div>}
      <aside className={`helicopter-dock ${collapsed ? "is-collapsed" : ""}`} aria-label="直升机展示与控制" data-helicopter-ui="true">
        <div className="dock-header">
          <div><p className="dock-eyebrow">{collapsed ? "直升机 · 飞行控制" : active ? "Police aviation / 07" : "Interactive project / 07"}</p>{!collapsed && <h2>{active ? "警航 · 飞行控制台" : "Desktop Helicopter"}</h2>}</div>
          <button type="button" onClick={toggle} aria-expanded={!collapsed} aria-label={collapsed ? "展开直升机控制" : active ? "返航并收起控制" : "收起直升机控制"}>{collapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button>
        </div>
        {!collapsed && <div className="dock-identity"><span>可交互的 3D 作品</span><span>BLENDER → WEB</span></div>}
        <div ref={stage} className="dock-stage" aria-label="拖动旋转直升机展示">
          {!collapsed && <div className="dock-reticle" aria-hidden="true"><span>07</span><small>HELIPAD / 泽鑫的交互实验</small></div>}
          {failed ? <img src="/images/projects/desktop-helicopter.jpg" alt="直升机静态模型" /> : !status.ready && <span className="dock-loading">准备飞机…</span>}
        </div>
        <p className="dock-status" role="status">{failed ? "模型暂不可用 · 静态预览" : !status.ready ? "正在加载模型" : status.pointMode ? "点空白处飞行 · Esc 退出指点" : stateLabels[status.state] ?? "飞行中"}</p>
        {!collapsed && <>
          <p className="dock-instruction">{parked ? "拖动换个角度 · 起飞，切换整个网站的氛围" : "警灯亮起，进入深蓝空域 · 停稳后恢复原主题"}</p>
          <div className="dock-controls">
            {actions.map(({ id, title, icon: Icon }) => <button type="button" key={id} disabled={!status.ready || failed || (id === "takeoff" && !parked) || ((id === "hold" || id === "return") && parked && !status.pointMode)} aria-pressed={id === "point" ? status.pointMode : id === "patrol" || id === "search" ? status.activity === `performance/${id}` : undefined} onClick={() => control(id)}><Icon size={14} /><span>{title}</span></button>)}
          </div>
          <Link to="/projects/desktop-helicopter" className="dock-project-link">从建模到飞行，看看它的制作过程 ↗</Link>
        </>}
      </aside>
    </>
  )
}
