import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { Icon } from '../components/ui/Icon'

/** 404 页面 */
export function NotFoundPage() {
  usePageMeta({ title: '页面未找到' })
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-navy-950 pt-[72px]">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div className="relative px-6 text-center">
        <p className="font-mono text-7xl font-bold text-white/10 md:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white md:text-3xl">页面未找到</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500">
          您访问的页面可能已被移动或不存在，欢迎返回首页或浏览我们的业务板块。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-primary">
            返回首页
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
          <Link to="/business" className="btn-ghost">业务板块</Link>
        </div>
      </div>
    </section>
  )
}
