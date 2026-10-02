/** 表单校验工具（与联系表单、快速留言共用） */

export interface FieldRule {
  required?: boolean
  /** 中国大陆手机号或带区号座机 */
  phone?: boolean
  email?: boolean
  minLength?: number
  maxLength?: number
}

export type FormValues = Record<string, string>

/** 校验单个字段，返回错误信息（空字符串表示通过） */
export function validateField(value: string, rule: FieldRule, label: string): string {
  const v = value.trim()
  if (rule.required && !v) return `请填写${label}`
  if (!v) return ''
  if (rule.phone && !/^(?:\+?86[- ]?)?1[3-9]\d{9}$/.test(v) && !/^\+?[\d-]{7,16}$/.test(v)) {
    return '请填写正确的联系电话'
  }
  if (rule.email && !/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(v)) {
    return '请填写正确的邮箱地址'
  }
  if (rule.minLength && v.length < rule.minLength) return `${label}不能少于 ${rule.minLength} 个字`
  if (rule.maxLength && v.length > rule.maxLength) return `${label}不能超过 ${rule.maxLength} 个字`
  return ''
}

/** 批量校验，返回错误字典 */
export function validateAll(
  values: FormValues,
  rules: Record<string, { label: string; rule: FieldRule }>
): Record<string, string> {
  const errors: Record<string, string> = {}
  for (const key of Object.keys(rules)) {
    const msg = validateField(values[key] ?? '', rules[key].rule, rules[key].label)
    if (msg) errors[key] = msg
  }
  return errors
}
