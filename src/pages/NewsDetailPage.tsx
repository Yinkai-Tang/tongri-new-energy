import { Link, Navigate, useParams } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/layout/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { getNewsBySlug, getRelatedNews } from '../config/news'

/**
 * 新闻详情页：标题 / 日期 / 来源 / 正文排版 / 相关推荐 / 分享按钮
 * 分享按钮通过 Web Share API 或复制链接实现（无需第三方 SDK）
 */
export function NewsDetailPage() {
  const { slug } = useParams()
  const article = getNewsBySlug(slug ?? '')

  usePageMeta({
    title: article?.title ?? '新闻中心',
    description: article?.summary,
    image: article?.image,
  })

  if (!article) return <Navigate to="/news" replace />

  const related = getRelatedNews(article)
  const fmt = (d: string) => d.replaceAll('-', '.')

  const share = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: article.title, url })
      } catch {
        /* 用户取消分享 */
      }
    } else {
      await navigator.clipboard?.writeText(url)
      alert('链接已复制，您可以粘贴分享给好友。')
    }
  }

  return (
    <>
      <PageHeader
        en={article.category}
        title={article.title}
        image={article.image}
        imageAlt={article.imageAlt}
        crumbs={[
          { label: '首页', path: '/' },
          { label: '新闻中心', path: '/news' },
          { label: article.title },
        ]}
      />

      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-content">
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            {/* 正文 */}
            <article>
              <Reveal>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-white/5 pb-6 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Icon name="calendar" className="h-3.5 w-3.5" />
                    <time dateTime={article.date}>{fmt(article.date)}</time>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="doc" className="h-3.5 w-3.5" />
                    来源：{article.source}
                  </span>
                  <span className="border border-white/10 px-2 py-0.5 text-[11px] text-slate-400">
                    {article.category}
                  </span>
                  {/* 分享 */}
                  <button
                    type="button"
                    onClick={share}
                    className="ml-auto flex items-center gap-1.5 text-slate-400 transition-colors hover:text-accent-soft"
                    aria-label="分享本文"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" />
                    </svg>
                    分享
                  </button>
                </div>
              </Reveal>

              {/* 正文段落：以 "## " 开头的渲染为小标题 */}
              <div className="mt-8 space-y-6">
                {article.content.map((block, i) =>
                  block.startsWith('## ') ? (
                    <Reveal key={i}>
                      <h2 className="pt-2 text-lg font-bold text-white md:text-xl">
                        <span className="mr-2 inline-block h-[14px] w-[3px] bg-gradient-to-b from-accent to-energy align-[-2px]" aria-hidden="true" />
                        {block.slice(3)}
                      </h2>
                    </Reveal>
                  ) : (
                    <Reveal key={i}>
                      <p className="text-sm leading-loose text-slate-400 md:leading-[2] md:text-[15px]">{block}</p>
                    </Reveal>
                  )
                )}
              </div>

              <Reveal>
                <div className="mt-10 flex items-center justify-between border-t border-white/5 pt-6 text-sm">
                  <Link to="/news" className="flex items-center gap-1.5 text-slate-400 transition-colors hover:text-accent-soft">
                    <Icon name="arrowRight" className="h-4 w-4 rotate-180" />
                    返回新闻列表
                  </Link>
                  <Link to="/contact" className="text-accent-soft transition-colors hover:text-white">
                    合作咨询 →
                  </Link>
                </div>
              </Reveal>
            </article>

            {/* 相关推荐 */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <Reveal>
                <h2 className="text-base font-semibold text-white">相关推荐</h2>
                <div className="mt-5 space-y-4">
                  {related.map((n) => (
                    <Link key={n.slug} to={`/news/${n.slug}`} className="group card-dark card-dark-hover flex gap-4 p-4">
                      <img src={n.image} alt={n.imageAlt} className="h-16 w-24 shrink-0 object-cover" loading="lazy" />
                      <div className="min-w-0">
                        <span className="text-[11px] text-accent-soft">{n.category}</span>
                        <h3 className="mt-1 line-clamp-2 text-[13px] font-medium leading-snug text-slate-200 group-hover:text-white">
                          {n.title}
                        </h3>
                        <time dateTime={n.date} className="mt-1 block text-[11px] text-slate-600">{fmt(n.date)}</time>
                      </div>
                    </Link>
                  ))}
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
