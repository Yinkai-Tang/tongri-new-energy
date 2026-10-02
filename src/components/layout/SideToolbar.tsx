import { useEffect, useState } from 'react'
import { site } from '../../config/site'
import { Icon } from '../ui/Icon'
import { InquiryModal } from '../forms/InquiryModal'

/**
 * 固定右侧功能入口：电话咨询 / 在线留言 / 返回顶部
 * 深色玻璃质感竖条，返回顶部滚动超过一屏后出现
 */
export function SideToolbar() {
  const [showTop, setShowTop] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <aside
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 md:block"
        aria-label="快速功能入口"
      >
        <div className="flex flex-col overflow-hidden border border-white/10 bg-navy-950/80 shadow-xl shadow-black/30 backdrop-blur-md">
          {/* 电话咨询 */}
          <a
            href={`tel:${site.contact.phone.replace(/[^+\d]/g, '')}`}
            className="group relative flex h-14 w-14 flex-col items-center justify-center border-b border-white/5 text-slate-300 transition-colors hover:bg-accent/20 hover:text-accent-soft"
            aria-label={`电话咨询 ${site.contact.phone}`}
          >
            <Icon name="phone" className="h-5 w-5" />
            <span className="mt-1 text-[10px] leading-none">电话</span>
            {/* 悬浮提示 */}
            <span className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap border border-white/10 bg-navy-900 px-3 py-1.5 text-xs text-slate-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {site.contact.phone}
            </span>
          </a>
          {/* 在线留言 */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="group relative flex h-14 w-14 flex-col items-center justify-center border-b border-white/5 text-slate-300 transition-colors hover:bg-accent/20 hover:text-accent-soft"
            aria-label="在线留言"
          >
            <Icon name="message" className="h-5 w-5" />
            <span className="mt-1 text-[10px] leading-none">留言</span>
            <span className="absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap border border-white/10 bg-navy-900 px-3 py-1.5 text-xs text-slate-200 opacity-0 transition-opacity duration-300 group-hover:pointer-events-none group-hover:opacity-100">
              在线留言
            </span>
          </button>
          {/* 返回顶部 */}
          <button
            type="button"
            onClick={toTop}
            className={`flex h-14 w-14 flex-col items-center justify-center text-slate-300 transition-all duration-300 hover:bg-accent/20 hover:text-accent-soft ${
              showTop ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            aria-label="返回顶部"
          >
            <Icon name="arrowUp" className="h-5 w-5" />
            <span className="mt-1 text-[10px] leading-none">顶部</span>
          </button>
        </div>
      </aside>

      {/* 移动端底部悬浮条（仅留言 + 电话） */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 flex border-t border-white/10 bg-navy-950/90 backdrop-blur-md transition-transform duration-300 md:hidden ${
          showTop ? '' : ''
        }`}
      >
        <a
          href={`tel:${site.contact.phone.replace(/[^+\d]/g, '')}`}
          className="flex flex-1 items-center justify-center gap-2 py-3 text-sm text-slate-200"
        >
          <Icon name="phone" className="h-4 w-4 text-accent-soft" /> 电话咨询
        </a>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex flex-1 items-center justify-center gap-2 border-l border-white/10 py-3 text-sm text-slate-200"
        >
          <Icon name="message" className="h-4 w-4 text-accent-soft" /> 在线留言
        </button>
        <button
          type="button"
          onClick={toTop}
          className={`flex w-14 items-center justify-center border-l border-white/10 text-slate-300 transition-opacity ${
            showTop ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-label="返回顶部"
        >
          <Icon name="arrowUp" className="h-4 w-4" />
        </button>
      </div>

      <InquiryModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
