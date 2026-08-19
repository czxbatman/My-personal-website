import { Brain, Compass, Map, RefreshCcw, Rocket, Scale } from "lucide-react"
import { PageShell, SectionHeading } from "@/components/shared"
import { Reveal } from "@/components/fx"
import { skills } from "@/content/profile"
import { principles } from "@/content/principles"
import { now } from "@/content/now"
import { usePageMeta } from "@/hooks/use-site"

const learningModel = [
  { icon: Map, title: "从课程到项目", desc: "知识点听懂≠会用，项目才是考场。" },
  { icon: Rocket, title: "从功能到系统", desc: "做出功能和做好一个项目不是同一件事。" },
  { icon: Brain, title: "从生成到判断", desc: "AI 写代码很快，但方案是否合适需要人来判断。" },
  { icon: Compass, title: "架构是长出来的", desc: "复杂系统不是一次设计出来的，是 需求→问题→修改→验证 长出来的。" },
  { icon: Scale, title: "验证即工程", desc: "“打开看起来能用”不是测试。" },
  { icon: RefreshCcw, title: "留下证据", desc: "代码、文档、Demo、复盘比“我学了很多”更有意义。" },
]

const aiWorkflow = [
  { step: "01", title: "分析代码", desc: "先理解现有模块、数据流和问题所在，再决定改动边界。" },
  { step: "02", title: "重构项目", desc: "让 AI 协助拆分职责、比较方案；架构取舍由我判断。" },
  { step: "03", title: "寻找方案", desc: "把真实约束放进上下文，比较可行路径而不是只收集答案。" },
  { step: "04", title: "检查与验证", desc: "持续研究 Agent、Skill 和多 Agent 协作，也持续检查结果是否可靠。" },
]

const story = [
  "你好，我是泽鑫。现在是一名正在学习 AI 编程相关方向的大学生，坐标北京。",
  "我的技术学习过程并不是一条特别标准的路线。最开始，我也会跟着课程学习 Vue、Python 和各种框架知识。但慢慢我发现，只听懂一个知识点，并不代表真正会使用它。ref()、computed()、组件、API、数据库……单独看的时候都不算特别困难。真正困难的是：当一个真实项目摆在面前时，我到底应该把这些东西放在哪里，它们之间又应该怎样协作。",
  "所以后来，我越来越倾向于通过项目学习。我做过 Vue3 + TypeScript 的 Todo List，也尝试过设计互动网页，将 Vue 项目真正部署到公网。而目前对我影响最大的项目，是 Iron Man V3 Desktop AI Learning Assistant。",
  "它最开始只是一只很简单的桌面宠物。后来我不断往里面加入 Todo List、番茄钟、Vue 页面、SQLite、DeepSeek API、LangChain 和 AI Learning Assistant。功能越来越多以后，我第一次真正遇到了软件项目中那些课程很难直接告诉我的问题：项目结构开始混乱、模块职责变得模糊、源码能正常运行但打包以后却出现问题、开发环境里的成功并不代表交给别人以后还能正常运行。",
  "也是从这个阶段开始，我对 AI Coding 的理解发生了一点变化。以前我更关心“怎么让 AI 把这段代码写出来？”现在我越来越关心：“这个功能为什么要这样设计？”“它应该属于系统的哪一层？”“AI 给出的方案真的适合这个项目吗？”“我怎样证明这个结果是对的？”",
  "我认同一个原则：AI 可以帮我提高执行速度，但不能替我建立判断能力。",
  "我真正感兴趣的问题并不是“AI 还能生成什么？”而是“AI 能不能真正成为一种帮助人学习、工作和解决问题的新型工具？”",
]

export default function About() {
  usePageMeta("关于", "泽鑫的 AI 编程观、真实项目复盘与学习记录。")

  return (
    <PageShell scene="field-notes">
      <section className="max-w-3xl">
        <Reveal>
          <p className="font-mono text-sm text-brand">{"// About me"}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            不只让 AI 帮我做出来，
            <br />
            也要理解自己正在构建什么。
          </h1>
          <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
            {story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mt-16">
        <SectionHeading eyebrow="How I Learn" title="我的 AI 编程观" desc="从真实项目里长出的六条学习方式。" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {learningModel.map((model, index) => (
            <Reveal key={model.title} delay={index * 0.05}>
              <div className="field-note-card h-full rounded-2xl border bg-card p-5 transition-colors hover:border-brand/40">
                <model.icon className="h-5 w-5 text-brand" />
                <h3 className="mt-3 font-semibold">{model.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{model.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Workflow"
          title="我和 AI 协作的方式"
          desc="AI 提高执行速度，判断能力自己建立。"
        />
        <div className="grid gap-4 md:grid-cols-4">
          {aiWorkflow.map((step, index) => (
            <Reveal key={step.step} delay={index * 0.06}>
              <div className="relative h-full rounded-2xl border bg-card p-5">
                <span className="font-mono text-2xl font-bold text-brand/25">{step.step}</span>
                <h3 className="mt-2 font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Principles"
          title="原则墙"
          desc="上墙规则：每条必须被至少一个真实项目验证过。"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map((principle, index) => (
            <Reveal key={principle.text} delay={index * 0.05}>
              <div className="flex h-full items-start gap-4 rounded-2xl border bg-card p-5 transition-colors hover:border-brand/40">
                <span className="font-mono text-xl font-bold text-brand/40">0{index + 1}</span>
                <div>
                  <p className="font-medium leading-relaxed">{principle.text}</p>
                  {principle.desc && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{principle.desc}</p>}
                  <p className="mt-3 inline-block rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                    验证于：{principle.verifiedBy}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border bg-card p-6">
            <h3 className="font-semibold">⚡ 正在构建</h3>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>🤖 AI Agent & Agent Skill：研究 Tool Calling、多 Agent 协作与人何时介入。</li>
              <li>🧠 AI Learning Assistant：持续迭代学习记录、SQLite、笔记与学习回顾。</li>
              <li>🏆 AI Agent Skill Competition：用真实竞赛验证 Skill 的边界与执行方式。</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {skills.tools.map((tool) => (
                <span key={tool} className="rounded-md bg-secondary px-2 py-0.5 text-xs">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="h-full rounded-2xl border bg-card p-6">
            <h3 className="font-semibold">📈 成长线</h3>
            <ul className="mt-3 space-y-3">
              {now.timeline.map((item) => (
                <li key={item.date} className="flex gap-3 text-sm">
                  <span className="shrink-0 font-mono text-xs text-brand">{item.date}</span>
                  <span className="text-muted-foreground">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </PageShell>
  )
}
