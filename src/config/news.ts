/**
 * ============================================================
 * 新闻中心数据（首页展示 + 新闻列表页 + 新闻详情页）
 * ------------------------------------------------------------
 * 当前数据结构对齐未来 CMS / 后台接口：
 *   GET /api/news?category=&page=  →  News[]
 *   GET /api/news/:slug            →  News（含 content 正文）
 * 接入后台时，将下方静态数组替换为请求结果即可（见 getNews /
 * getNewsBySlug 函数注释）。
 *
 * 注意：正文中的观点类内容不含未经确认的数据；【待补充】标记
 * 处请替换为真实内容后再发布。
 * ============================================================
 */

export type NewsCategory = '公司新闻' | '行业洞察' | '项目动态'

export const newsCategories: ('全部' | NewsCategory)[] = [
  '全部',
  '公司新闻',
  '行业洞察',
  '项目动态',
]

export interface News {
  slug: string
  title: string
  category: NewsCategory
  /** YYYY-MM-DD */
  date: string
  source: string
  summary: string
  image: string
  imageAlt: string
  /** 正文：每个元素为一个段落；以 "## " 开头的元素渲染为小标题 */
  content: string[]
}

export const news: News[] = [
  {
    slug: 'website-launch',
    title: '同日新能源官方网站正式上线',
    category: '公司新闻',
    date: '2026-09-27',
    source: '同日新能源',
    summary:
      '同日新能源官方网站正式上线，集中展示公司在具身智能供应链、新能源与算力中心三大方向的产业布局与合作价值。',
    image: '/images/news-1.svg',
    imageAlt: '公司新闻封面：官网正式上线（占位图，可替换）',
    content: [
      '同日新能源官方网站于即日起正式上线。网站围绕「具身智能供应链、新能源、算力中心」三大业务板块，系统展示公司的产业布局、能力体系与合作模式，为产业伙伴、政府与园区合作方、供应商及求职者提供了解我们的窗口。',
      '网站设置了业务板块、项目案例、新闻中心与商务合作等栏目，后续将随业务进展持续更新。您可以通过页面右侧的「在线留言」或「联系我们」页面，与我们取得联系。',
      '注：本条为公司动态示例。更多公司新闻【待补充】。',
    ],
  },
  {
    slug: 'industry-insight-green-manufacturing',
    title: '行业观察：智能制造与绿色能源的融合发展',
    category: '行业洞察',
    date: '2026-09-15',
    source: '同日新能源（编辑整理）',
    summary:
      '从供应链协同到「光储充用」一体化，智能制造与绿色能源正在走向深度融合。本文从产业视角分享我们对融合趋势的观察。',
    image: '/images/news-2.svg',
    imageAlt: '行业洞察封面：智能制造与绿色能源融合（占位图，可替换）',
    content: [
      '## 制造底座：具身智能产业化的关键变量',
      '机器人与自动化装备的产业化竞争，正从整机设计延伸到核心零部件、精密制造与供应链管理的体系化竞争。稳定、柔性的制造与供应链能力，正在成为具身智能企业选择合作伙伴时的核心考量。',
      '## 能源侧：从单一设备到「光储充用」一体化',
      '随着光伏、储能与充电设施成本结构的变化，越来越多的工商业与园区用户不再满足于单一设备采购，而是寻求覆盖「发电 — 储能 — 充电 — 用能管理」的一体化方案，以获得更确定的投资回报与更低的运营复杂度。',
      '## 融合点：算电协同与绿色园区',
      '智算中心、电动化车队等新负荷形态，正在与绿色能源系统深度耦合。「算电协同」「源网荷储一体化」等模式，让绿色电力从补充能源走向产业基础设施。',
      '## 写在最后',
      '同日新能源依托集团制造产业基础与新能源技术积淀，关注上述融合趋势带来的产业机会。本文为行业观察类内容，具体数据与政策引用【待补充】，发布前请核实。',
    ],
  },
  {
    slug: 'project-news-placeholder',
    title: '项目动态标题（待补充）',
    category: '项目动态',
    date: '2026-09-01',
    source: '同日新能源',
    summary:
      '项目动态占位条目：用于展示新闻列表与详情页的完整样式，正文请替换为真实项目进展（如开工、并网、交付等节点）。',
    image: '/images/news-3.svg',
    imageAlt: '项目动态封面（占位图，可替换）',
    content: [
      '本条为项目动态占位内容，用于展示详情页排版样式。正式内容建议包含：项目名称与所在地、建设/交付节点、参与角色（投资 / EPC / 设备供应）、现场图片以及后续计划。',
      '正文第二段【待补充】：可描述项目意义、对当地产业或客户的价值。',
      '正文第三段【待补充】：可描述后续计划或相关业务链接。',
    ],
  },
]

/**
 * 获取新闻列表（接入 CMS 时改为接口请求）
 */
export const getNews = (category?: '全部' | NewsCategory) =>
  category && category !== '全部'
    ? news.filter((n) => n.category === category)
    : news

/** 按 slug 获取新闻 */
export const getNewsBySlug = (slug: string) => news.find((n) => n.slug === slug)

/** 相关推荐：同分类优先 */
export const getRelatedNews = (current: News, count = 3) =>
  [...news.filter((n) => n.slug !== current.slug)].sort((a, b) =>
    (a.category === current.category ? -1 : 1) - (b.category === current.category ? -1 : 1)
  ).slice(0, count)
