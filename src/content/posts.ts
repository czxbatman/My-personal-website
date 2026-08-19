/**
 * 博客文章 —— /blog 与 /blog/:slug 的数据源。
 * 当前是三篇种子文章（占位正文），TODO: 换成你的真实文章。
 */
export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  minutes: number
  seed?: boolean
  sections: { heading: string; paragraphs: string[] }[]
}

export const posts: Post[] = [
  {
    slug: "why-i-draw-the-map-first",
    title: "为什么我总要画完地图才敢动手",
    excerpt: "先建全貌再行动是我的默认设置。它让我快速理解领域框架，也让我迟迟不敢开始。",
    date: "2026-08-16",
    tags: ["学习法"],
    minutes: 4,
    seed: true,
    sections: [
      {
        heading: "地图是认知的脚手架",
        paragraphs: [
          "我学任何东西，第一反应都是先把它画成一张地图：这个领域长什么样，有几个板块，彼此怎么连接。地图让我安心，也让我快速拥有判断力——知道什么重要、什么可以先放。",
          "但地图有一个副作用：它会越画越精细，而脚下一步都没有迈出去。（正文待补）",
        ],
      },
    ],
  },
  {
    slug: "seventy-percent-rule",
    title: "70% 就出发：缆车、地图和走路",
    excerpt: "不用追求 100% 全貌再开始。70% 差不多了，剩下的在做的过程中学习。",
    date: "2026-08-14",
    tags: ["学习法", "原则"],
    minutes: 3,
    seed: true,
    sections: [
      {
        heading: "缆车与走路",
        paragraphs: [
          "先用缆车上山顶看一眼全貌，再下来一步步走——这是我最有效的学习路径。缆车是速览全貌，走路是真实积累，两者缺一不可。（正文待补）",
        ],
      },
    ],
  },
  {
    slug: "ai-as-momentum",
    title: "让 AI 当行动力，我当验收官",
    excerpt: "计划书本身是一张巨大的地图，恰好最容易触发我的拖延模式。所以我把执行外包了。",
    date: "2026-08-16",
    tags: ["AI", "工作流"],
    minutes: 5,
    seed: true,
    sections: [
      {
        heading: "分工",
        paragraphs: [
          "我的行动力依赖高精力时段，而 AI 的行动力 24 小时在线。于是协作方式改成：AI 负责把计划推进成可以打开看的东西，我只负责验收和决策。（正文待补）",
        ],
      },
    ],
  },
]
