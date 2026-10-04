/**
 * ============================================================
 * 站点全局配置（公司信息 / 导航 / 页脚 / 联系方式 / 表单文案）
 * ------------------------------------------------------------
 * 本文件是全站文案与联系信息的唯一入口，替换后全站生效。
 * 带【待确认】标记的内容来自集团宣传资料，正式发布前请逐项核实。
 * ============================================================
 */

import { asset } from '../utils/asset'

export const site = {
  /** 品牌名（导航、页脚、SEO 使用） */
  name: '同日新能源',
  /** 公司全称【待确认：以公司最终对外主体名称为准】 */
  fullName: '上海同日新能源技术有限公司',
  fullNameEn: 'Shanghai Tungray Green Energy Technology Co., Ltd.',
  /** 集团名称（关于我们/页脚使用） */
  groupName: '同日集团',
  groupNameEn: 'Tungray Group',
  /** 品牌口号（来自集团资料） */
  slogan: '未来同创享',
  sloganEn: 'We Create, We Share',
  /**
   * 品牌资产（官方 Tungray 彩色透明底 Logo）
   * 目录：public/brand/ —— 全站统一经 BrandLogo 组件引用，勿在页面内手动放置。
   * 白色/黑色单色版待公司提供 SVG/AI/EPS/PDF 原始文件后再制作。
   */
  brand: {
    /** 彩色透明底横版 Logo（深色页头当前临时方案） */
    logo: asset('brand/tungray-logo-color-transparent.png'),
    /** Logo 替代文本（全站统一） */
    alt: 'Tungray 同日集团',
  },
  /** ============ 联系方式（来自集团资料，均【待确认】） ============ */
  contact: {
    /** 商务咨询电话 */
    phone: '+86 158-6269-6888',
    /** 备用电话 */
    phoneAlt: '+886 939-402-968',
    /** 商务邮箱 */
    email: 'hui_tang@tungray.com.cn',
    /** 总部地址【待确认】 */
    address: '上海市嘉定区南翔镇佳通路31弄5幢1707-08',
    /** 新加坡总部地址（集团） */
    addressEn: '31 Mandai Estate, #02-01 Innovation Place, Singapore 729933',
    /** 工作时间【占位，请按实际修改】 */
    hours: '周一至周五 9:00 – 18:00',
    /** 集团官网 */
    website: 'www.tungray.com',
  },

  /** ============ 法务与备案（占位） ============ */
  legal: {
    /** ICP 备案号【占位：上线前替换为真实备案号】 */
    icp: '沪ICP备XXXXXXXX号',
    /** 公安备案【占位，可留空不显示】 */
    police: '',
    copyright: `© ${new Date().getFullYear()} 同日新能源 · 上海同日新能源技术有限公司`,
  },

  /** ============ 表单与咨询文案 ============ */
  form: {
    /** 提交后提示语（可配置字段） */
    responseHint: '提交后我们将在 1–3 个工作日内与您联系。',
    /** 成功弹窗文案 */
    successTitle: '提交成功',
    successDesc: '感谢您的关注！我们已收到您的合作咨询，将尽快与您联系。',
    /**
     * 预留接口：未来在此填入真实后端地址。
     * 当前 submitLead() 仅为前端模拟，见 src/utils/lead.ts
     */
    apiEndpoint: '',
  },

  /** ============ 社交 / 平台 ============ */
  wechatQr: asset('images/qrcode-wechat.svg'),
} as const

/** ============ 顶部导航 ============ */
export interface NavItem {
  label: string
  en: string
  path: string
  /** 子菜单（业务板块下拉） */
  children?: { label: string; en: string; path: string; desc: string }[]
}

export const navItems: NavItem[] = [
  { label: '首页', en: 'HOME', path: '/' },
  { label: '关于我们', en: 'ABOUT US', path: '/about' },
  {
    label: '业务板块',
    en: 'BUSINESS',
    path: '/business',
    children: [
      {
        label: '具身智能供应链',
        en: 'Embodied Intelligence Supply Chain',
        path: '/business/embodied-intelligence-supply-chain',
        desc: '核心零部件 · 智能制造 · 供应链整合',
      },
      {
        label: '新能源',
        en: 'New Energy',
        path: '/business/new-energy',
        desc: '光伏储能 · 动力电池 · 能源管理',
      },
      {
        label: '算力中心',
        en: 'Computing Infrastructure',
        path: '/business/computing-infrastructure',
        desc: '模块化数据中心 · 供配电 · 制冷与网络',
      },
    ],
  },
  { label: '新闻中心', en: 'NEWS', path: '/news' },
  { label: '联系我们', en: 'CONTACT', path: '/contact' },
]

/** 页脚导航（复用主导航，另加法务链接） */
export const footerLegalLinks = [
  { label: '法律声明', path: '/legal' },
  { label: '隐私政策', path: '/privacy' },
]

/**
 * 合作方向下拉选项（联系表单使用）
 * 与业务板块保持一致，新增业务时同步修改
 */
export const cooperationOptions = [
  '具身智能供应链',
  '新能源',
  '算力中心',
  '其他',
] as const
