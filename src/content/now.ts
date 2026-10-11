import { growth } from "./growth"
export const now = {
  updatedAt: "2026-10-11",
  doing: ["以专升本备考为当前重心，英语持续学习", "准备金砖人工智能应用创新比赛，自己搭环境、理解项目结构", "整理真实项目与学习过程，继续完善个人网站"],
  learning: ["Python、Linux、文件结构与基础环境排错", "怎样用 AI 辅助理解问题，而不只是生成代码", "初步学习投资研究的信息阅读与判断，尚未实践验证"],
  next: ["按准备路线正式开始数学与 C 语言学习", "逐步练习金砖四个模块，记录输入、输出与验证结果", "继续补权限、安全和自动化基础，再推进复杂 Agent 能力"],
  timeline: growth.map((item) => ({ date: item.date, text: `${item.title}：${item.text}` })),
}
