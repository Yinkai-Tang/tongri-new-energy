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
 * 当前仅收录经确认可公开的真实新闻（官网正式上线）；
 * 行业观察与项目动态待有真实内容后再启用。
 * ============================================================
 */

import { asset } from '../utils/asset'

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
  /** 素材来源标记：stock = 图库行业场景示意 */
  sourceType?: 'stock' | 'company'
  isIllustrative?: boolean
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
    image: asset('images/news-1.webp'),
    sourceType: 'stock' as const,
    isIllustrative: true,
    imageAlt: '官网正式上线新闻封面（行业场景示意）',
    content: [
      '同日新能源官方网站于即日起正式上线。网站围绕「具身智能供应链、新能源、算力中心」三大业务板块，系统展示公司的产业布局、能力体系与合作模式，为产业伙伴、政府与园区合作方、供应商及求职者提供了解我们的窗口。',
      '网站设置了业务板块、新闻中心与商务合作等栏目，后续将随业务进展持续更新。您可以通过页面右侧的「在线留言」或「联系我们」页面，与我们取得联系。',
      '更多公司动态与行业观察将持续更新。',
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
