import { site } from '../config/site'

export interface LeadPayload {
  name: string
  company: string
  phone: string
  email: string
  /** 合作方向 */
  field: string
  message: string
  source: string
  submittedAt: string
}

/**
 * 提交合作线索（前端占位实现）
 * ------------------------------------------------------------
 * 未来对接方式（三选一，只需修改本函数）：
 * 1. 自建 API：将 site.form.apiEndpoint 填为后端地址并放开 fetch 注释；
 * 2. 邮件服务：接入 Formspree / 阿里云邮件推送等；
 * 3. 企业微信：推送至企业微信群机器人 Webhook。
 */
export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean }> {
  // 开发阶段：打印到控制台，模拟网络延迟
  console.info('[lead] 表单提交（前端模拟）:', payload)

  if (site.form.apiEndpoint) {
    // await fetch(site.form.apiEndpoint, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // })
    // return { ok: true }
  }

  await new Promise((r) => setTimeout(r, 600))
  return { ok: true }
}
