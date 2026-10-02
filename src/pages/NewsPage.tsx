import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/layout/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { getNews, newsCategories, type NewsCategory } from '../config/news'

/** 新闻列表页（支持分类筛选） */
export function NewsPage() {
  usePageMeta({
    title: '新闻中心',
    description: '同日新能源新闻中心：公司新闻、行业洞察与项目动态。',
  })

  const [active, setActive] = useState<'全部' | NewsCategory>('全部')
  const list = getNews(active)
  const fmt = (d: string) => d.replaceAll('-', '.')

  return (
    <>
      <PageHeader
        en="NEWS & INSIGHTS"
        title="新闻中心"
        desc="公司动态、行业洞察与项目进展，持续更新。"
        image="/images/news-1.svg"
        imageAlt="新闻中心页头背景（占位图，可替换）"
        crumbs={[{ label: '首页', path: '/' }, { label: '新闻中心' }]}
      />

      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-content">
          {/* 分类筛选 */}
          <Reveal>
            <div className="flex flex-wrap gap-3" role="tablist" aria-label="新闻分类筛选">
              {newsCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active === cat}
                  onClick={() => setActive(cat)}
                  className={`border px-5 py-2.5 text-sm transition-all duration-300 ${
                    active === cat
                      ? 'border-accent bg-accent/15 text-accent-soft'
                      : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          {/* 新闻列表 */}
          <div className="mt-10 space-y-5">
            {list.map((n, i) => (
              <Reveal key={n.slug} delay={(i % 4) * 70}>
                <Link
                  to={`/news/${n.slug}`}
                  className="group card-dark card-dark-hover grid overflow-hidden sm:grid-cols-[280px_1fr]"
                >
                  <div className="relative aspect-[16/9] sm:aspect-auto sm:h-full sm:min-h-[180px]">
                    <img
                      src={n.image}
                      alt={n.imageAlt}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute left-4 top-3 border border-white/15 bg-navy-950/80 px-2.5 py-1 text-[11px] text-slate-300 backdrop-blur-sm">
                      {n.category}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center p-6 md:p-8">
                    <p className="flex items-center gap-2 text-xs text-slate-500">
                      <Icon name="calendar" className="h-3.5 w-3.5" />
                      <time dateTime={n.date}>{fmt(n.date)}</time>
                      <span className="text-slate-700">·</span>
                      <span>{n.source}</span>
                    </p>
                    <h2 className="mt-2.5 text-lg font-semibold text-white transition-colors group-hover:text-accent-soft md:text-xl">
                      {n.title}
                    </h2>
                    <p className="mt-2.5 line-clamp-2 text-[13px] leading-relaxed text-slate-400">
                      {n.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-accent-soft">
                      查看详情
                      <Icon name="arrowRight" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {list.length === 0 && (
            <p className="py-16 text-center text-sm text-slate-500">该分类下暂无内容。</p>
          )}

          <Reveal className="mt-10 text-center">
            <p className="text-xs text-slate-600">
              说明：新闻数据结构与 CMS / 后台接口对齐（见 src/config/news.ts），接入后台后可支持分页与全文检索。
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
