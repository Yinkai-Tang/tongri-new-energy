import { useEffect } from 'react'
import { site } from '../../config/site'
import { Icon } from '../ui/Icon'

/** 通用成功反馈弹窗（表单提交成功后展示） */
export function SuccessModal({
  open,
  onClose,
  title = site.form.successTitle,
  desc = site.form.successDesc,
}: {
  open: boolean
  onClose: () => void
  title?: string
  desc?: string
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="提交成功"
    >
      <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md border border-white/10 bg-navy-900 p-8 text-center shadow-2xl shadow-black/50">
        <span className="corner-frame absolute inset-3" aria-hidden="true" />
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-energy/40 bg-energy/10">
          <Icon name="check" className="h-8 w-8 text-energy" strokeWidth={2.2} />
        </span>
        <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{desc}</p>
        <p className="mt-1 text-xs text-slate-500">{site.form.responseHint}</p>
        <button type="button" className="btn-primary mt-7 w-full" onClick={onClose}>
          好的
        </button>
      </div>
    </div>
  )
}
