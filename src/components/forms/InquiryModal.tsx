import { useEffect, useState } from 'react'
import { site } from '../../config/site'
import { Icon } from '../ui/Icon'
import { SuccessModal } from './SuccessModal'
import { submitLead, type LeadPayload } from '../../utils/lead'
import { validateAll, type FormValues } from './validate'

/**
 * 快速留言弹窗（右侧工具栏"在线留言"入口）
 * 精简字段：称呼 / 联系电话 / 留言内容
 */
const rules = {
  name: { label: '称呼', rule: { required: true, maxLength: 30 } },
  phone: { label: '联系电话', rule: { required: true, phone: true } },
  message: { label: '留言内容', rule: { required: true, minLength: 5, maxLength: 300 } },
}

export function InquiryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [values, setValues] = useState<FormValues>({ name: '', phone: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

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

  const set = (key: string, v: string) => setValues((s) => ({ ...s, [key]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validateAll(values, rules)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setSubmitting(true)
    const payload: LeadPayload = {
      name: values.name,
      company: '',
      phone: values.phone,
      email: '',
      field: '在线留言',
      message: values.message,
      source: '快速留言弹窗',
      submittedAt: new Date().toISOString(),
    }
    await submitLead(payload)
    setSubmitting(false)
    setSuccess(true)
  }

  const closeAll = () => {
    setSuccess(false)
    setValues({ name: '', phone: '', message: '' })
    setErrors({})
    onClose()
  }

  const inputCls = (err?: string) =>
    `w-full border bg-navy-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-accent ${
      err ? 'border-red-400/70' : 'border-white/10'
    }`

  return (
    <>
      <div
        className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-label="在线留言"
      >
        <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" onClick={onClose} />
        <div className="relative w-full max-w-lg border border-white/10 bg-navy-900 p-7 shadow-2xl shadow-black/50 sm:p-8">
          <span className="corner-frame absolute inset-3" aria-hidden="true" />
          <div className="flex items-start justify-between">
            <div>
              <p className="section-en">ONLINE MESSAGE</p>
              <h3 className="mt-1.5 text-xl font-bold text-white">在线留言</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center border border-white/10 text-slate-400 transition-colors hover:border-white/40 hover:text-white"
              aria-label="关闭留言窗口"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 5l14 14M19 5 5 19" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="q-name" className="mb-1.5 block text-xs text-slate-400">
                  称呼 <span className="text-accent">*</span>
                </label>
                <input
                  id="q-name"
                  className={inputCls(errors.name)}
                  placeholder="怎么称呼您"
                  value={values.name}
                  onChange={(e) => set('name', e.target.value)}
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="q-phone" className="mb-1.5 block text-xs text-slate-400">
                  联系电话 <span className="text-accent">*</span>
                </label>
                <input
                  id="q-phone"
                  type="tel"
                  className={inputCls(errors.phone)}
                  placeholder="方便联系的手机号"
                  value={values.phone}
                  onChange={(e) => set('phone', e.target.value)}
                />
                {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="q-msg" className="mb-1.5 block text-xs text-slate-400">
                留言内容 <span className="text-accent">*</span>
              </label>
              <textarea
                id="q-msg"
                rows={4}
                className={`${inputCls(errors.message)} resize-none`}
                placeholder="简单描述您的合作意向或问题"
                value={values.message}
                onChange={(e) => set('message', e.target.value)}
              />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>
            <button type="submit" className="btn-primary w-full" disabled={submitting}>
              {submitting ? '提交中…' : '提交留言'}
            </button>
            <p className="flex items-center gap-1.5 text-xs text-slate-500">
              <Icon name="shield" className="h-3.5 w-3.5 text-slate-600" />
              {site.form.responseHint}
            </p>
          </form>
        </div>
      </div>

      <SuccessModal open={success} onClose={closeAll} desc="我们已收到您的留言，将尽快与您联系。" />
    </>
  )
}
