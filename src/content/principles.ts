/** 每条原则都必须被真实项目验证过。 */
export interface Principle {
  text: string
  desc?: string
  verifiedBy: string
}

export const principles: Principle[] = [
  { text: "先让东西真实运行，再讨论它应该多完美。", desc: "一个永远停留在设计图里的系统，还不是产品。先获得真实反馈，再决定下一步设计。", verifiedBy: "Iron Man V3" },
  { text: "AI 可以加速实现，但不能替我做判断。", desc: "代码越来越容易生成，所以更重要的是：知道该做什么、为什么这样做、怎样判断结果是否正确。", verifiedBy: "Iron Man V3 · Agent Skill 项目" },
  { text: "“看懂了”不等于“会了”。", desc: "真正确信自己理解一个知识点的时刻，是我能不能在另一个场景里重新把它做出来。", verifiedBy: "Todo List" },
  { text: "复杂系统不是一次设计出来的。", desc: "架构理解是在 真实需求 → 出现问题 → 修改 → 再验证 的过程中一点点长出来的。", verifiedBy: "Iron Man V3 重构" },
  { text: "给学习留下可以被看见的证据。", desc: "代码、项目、文档、Demo、Git Commit、复盘和真正上线的产品，都比一句“我最近学了很多”更有意义。", verifiedBy: "Vue 3 Lab · 本网站" },
]
