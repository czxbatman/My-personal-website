import { Brain, Compass, Map, RefreshCcw, Rocket, Scale } from "lucide-react"
import { PageShell, SectionHeading } from "@/components/shared"
import { Reveal } from "@/components/fx"
import { skills } from "@/content/profile"
import { principles } from "@/content/principles"
import { now } from "@/content/now"
import { growthStory } from "@/content/growth"
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
  { step: "01", title: "自己产生问题", desc: "先想清楚我想理解什么，以及为什么需要这一步。" },
  { step: "02", title: "动手尝试", desc: "自己看目录、执行命令和检查输出，建立实际感受。" },
  { step: "03", title: "问懂了再继续", desc: "遇到不懂的地方问 AI，让它解释原因和概念，再继续实践。" },
  { step: "04", title: "整理与判断", desc: "把过程整理成记录，分清已验证的结果、当前学习和后续计划。" },
]

const story = growthStory

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
          desc="AI 更多是老师与信息整理员，问题由我提出，实践和判断慢慢自己完成。"
        />
        <div className="workflow-grid grid gap-4 md:grid-cols-4">
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
            <h3 className="font-semibold">⚡ 当前重心</h3>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {now.doing.map((item) => <li key={item}>{item}</li>)}
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
