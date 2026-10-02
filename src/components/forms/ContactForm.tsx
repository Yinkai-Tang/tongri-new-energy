import { useState } from 'react'
import { site, cooperationOptions } from '../../config/site'
import { Icon } from '../ui/Icon'
import { SuccessModal } from './SuccessModal'
import { submitLead, type LeadPayload } from '../../utils/lead'
import { validateAll, type FormValues } from './validate'

/**
 * 商务合作表单（联系我们页）
 * 字段：姓名 / 公司名称 / 联系电话 / 邮箱 / 合作方向 / 留言内容
 * 前端校验 + 成功弹窗；提交逻辑见 src/utils/lead.ts（预留 API 位）
 */
const rules = {
  name: { label: '姓名', rule: { required: true, maxLength: 30 } },
  company: { label: '公司名称', rule: { maxLength: 60 } },
  phone: { label: '联系电话', rule: { required: true, phone: true } },
  email: { label: '邮箱', rule: { required: true, email: true } },
  field: { label: '合作方向', rule: { required: true } },
  message: { label: '留言内容', rule: { required: true, minLength: 10, maxLength: 500 } },
}

export function ContactForm({ defaultField = '' }: { defaultField?: string }) {
  const [values, setValues] = useState<FormValues>({
    name: '',
    company: '',
    phone: '',
    email: '',
    /** 合作方向：支持从其他页面 ?field= 带入默认值 */
    field: cooperationOptions.includes(defaultField as (typeof cooperationOptions)[number])
      ? defaultField
      : '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const set = (key: string, v: string) => {
    setValues((s) => ({ ...s, [key]: v }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validateAll(values, rules)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setSubmitting(true)
    const payload: LeadPayload = {
      name: values.name,
      company: values.company,
      phone: values.phone,
      email: values.email,
      field: values.field,
      message: values.message,
      source: '联系我们页面',
      submittedAt: new Date().toISOString(),
    }
    await submitLead(payload)
    setSubmitting(false)
    setSuccess(true)
  }

  const reset = () => {
    setSuccess(false)
    setValues({ name: '', company: '', phone: '', email: '', field: '', message: '' })
    setErrors({})
  }

  const inputCls = (err?: string) =>
    `w-full border bg-navy-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-accent ${
      err ? 'border-red-400/70' : 'border-white/10'
    }`
  const errP = (key: string) =>
    errors[key] ? <p className="mt-1 text-xs text-red-400">{errors[key]}</p> : null

  return (
    <div className="card-dark relative p-7 md:p-10">
      <span className="corner-frame absolute inset-3" aria-hidden="true" />
      <p className="section-en">BUSINESS COOPERATION</p>
      <h3 className="mt-2 text-xl font-bold text-white md:text-2xl">商务合作咨询</h3>
      <p className="mt-2 text-sm text-slate-400">
        请填写以下信息，我们会尽快与您取得联系。<span className="text-accent">*</span> 为必填项。
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="f-name" className="mb-1.5 block text-xs text-slate-400">
              姓名 <span className="text-accent">*</span>
            </label>
            <input id="f-name" className={inputCls(errors.name)} placeholder="您的姓名" value={values.name} onChange={(e) => set('name', e.target.value)} />
            {errP('name')}
          </div>
          <div>
            <label htmlFor="f-company" className="mb-1.5 block text-xs text-slate-400">
              公司名称
            </label>
            <input id="f-company" className={inputCls(errors.company)} placeholder="您所在的公司 / 单位" value={values.company} onChange={(e) => set('company', e.target.value)} />
            {errP('company')}
          </div>
          <div>
            <label htmlFor="f-phone" className="mb-1.5 block text-xs text-slate-400">
              联系电话 <span className="text-accent">*</span>
            </label>
            <input id="f-phone" type="tel" className={inputCls(errors.phone)} placeholder="手机号或电话号码" value={values.phone} onChange={(e) => set('phone', e.target.value)} />
            {errP('phone')}
          </div>
          <div>
            <label htmlFor="f-email" className="mb-1.5 block text-xs text-slate-400">
              邮箱 <span className="text-accent">*</span>
            </label>
            <input id="f-email" type="email" className={inputCls(errors.email)} placeholder="name@company.com" value={values.email} onChange={(e) => set('email', e.target.value)} />
            {errP('email')}
          </div>
        </div>

        <div>
          <label htmlFor="f-field" className="mb-1.5 block text-xs text-slate-400">
            合作方向 <span className="text-accent">*</span>
          </label>
          <select
            id="f-field"
            className={`${inputCls(errors.field)} appearance-none ${values.field ? '' : 'text-slate-600'}`}
            value={values.field}
            onChange={(e) => set('field', e.target.value)}
          >
            <option value="" disabled>
              请选择合作方向
            </option>
            {cooperationOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-navy-900 text-white">
                {opt}
              </option>
            ))}
          </select>
          {errP('field')}
        </div>

        <div>
          <label htmlFor="f-message" className="mb-1.5 block text-xs text-slate-400">
            留言内容 <span className="text-accent">*</span>
          </label>
          <textarea
            id="f-message"
            rows={5}
            className={`${inputCls(errors.message)} resize-none`}
            placeholder="请描述您的需求背景、期望与合作方式（不少于 10 个字）"
            value={values.message}
            onChange={(e) => set('message', e.target.value)}
          />
          <div className="mt-1 flex justify-between">
            {errors.message ? <p className="text-xs text-red-400">{errors.message}</p> : <span />}
            <span className="text-xs text-slate-600">{values.message.length}/500</span>
          </div>
        </div>

        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={submitting}>
          {submitting ? '提交中…' : '提交合作意向'}
          <Icon name="arrowRight" className="h-4 w-4" />
        </button>
        <p className="flex items-center gap-1.5 text-xs text-slate-500">
          <Icon name="shield" className="h-3.5 w-3.5 text-slate-600" />
          {site.form.responseHint}（提示语为可配置字段）
        </p>
      </form>

      <SuccessModal open={success} onClose={reset} />
    </div>
  )
}
