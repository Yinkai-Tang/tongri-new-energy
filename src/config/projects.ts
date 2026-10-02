/**
 * ============================================================
 * 项目案例数据（首页展示 + 案例列表页 + 案例详情页）
 * ------------------------------------------------------------
 * 【重要】当前所有案例均为占位模板（"待补充"结构），未虚构任何
 * 客户名称、项目数据。正式上线前请逐条替换为真实项目资料。
 *
 * 可供整理案例时参考的集团资料线索（发布前需逐项确认授权）：
 * - 户用光储系统（德国，13kW 光伏 / 10kWh 储能）
 * - 工商业集装箱储能（新加坡、罗马尼亚、斯洛伐克等）
 * - 工厂光储系统（越南食品厂 250kW/600kWh、缅甸纸巾厂等）
 * - 大型集装箱光储（西非科特迪瓦 2MW/6MWh、柬埔寨 250kW/1.2MWh）
 * - 物流车队电动化改装、叉车/环卫车换电等
 * ============================================================
 */

/** 业务板块分类（用于筛选） */
export type ProjectCategory = '具身智能供应链' | '新能源' | '现代农业'

export interface ProjectDetailBlock {
  background: string
  needs: string
  solution: string
  process: string
  results: string
}

export interface Project {
  slug: string
  name: string
  category: ProjectCategory
  location: string
  /** 列表页摘要 */
  summary: string
  image: string
  imageAlt: string
  /** 详情页结构化内容（均为占位文案） */
  detail: ProjectDetailBlock
  /** 详情页配图（至少 1 张，可追加） */
  gallery: { src: string; alt: string }[]
  /** 是否为占位案例（为 true 时卡片显示"待补充"标签） */
  pending: boolean
}

export const projectCategories: ('全部' | ProjectCategory)[] = [
  '全部',
  '具身智能供应链',
  '新能源',
  '现代农业',
]

export const projects: Project[] = [
  {
    slug: 'project-placeholder-01',
    name: '项目名称待补充',
    category: '具身智能供应链',
    location: '项目地点待补充',
    summary:
      '项目简介待补充：建议描述项目背景、建设内容与合作价值，控制在 60 字以内。此处为占位示例，不会展示任何虚构的客户或数据。',
    image: '/images/project-1.svg',
    imageAlt: '具身智能供应链项目封面（占位图，可替换）',
    detail: {
      background: '项目背景待补充：介绍客户所属行业、面临的发展阶段与本项目的由来。',
      needs: '客户需求待补充：描述客户在产品、交付、成本或技术方面希望解决的问题。',
      solution: '解决方案待补充：描述我方提供的供应链整合 / 制造 / 集成方案与技术路线。',
      process: '实施过程待补充：描述项目关键节点、周期与协同方式。',
      results: '项目成果待补充：描述交付成果与客户价值（需客户确认后发布）。',
    },
    gallery: [
      { src: '/images/project-1.svg', alt: '项目图片占位 1（可替换）' },
      { src: '/images/biz-supply-chain-scene.svg', alt: '项目图片占位 2（可替换）' },
    ],
    pending: true,
  },
  {
    slug: 'project-placeholder-02',
    name: '项目名称待补充',
    category: '新能源',
    location: '项目地点待补充',
    summary:
      '项目简介待补充：建议描述项目类型（光伏 / 储能 / 光储一体）、规模量级与应用场景。发布前请替换为经确认的真实项目信息。',
    image: '/images/project-2.svg',
    imageAlt: '新能源项目封面（占位图，可替换）',
    detail: {
      background: '项目背景待补充：介绍项目所在地区、用能主体与建设缘由。',
      needs: '客户需求待补充：描述用电成本、供电保障或降碳方面的诉求。',
      solution: '解决方案待补充：描述光储配置、设备选型与并网 / 离网方案。',
      process: '实施过程待补充：描述勘察设计、施工并网与运维交接过程。',
      results: '项目成果待补充：描述运行情况与客户价值（需客户确认后发布）。',
    },
    gallery: [
      { src: '/images/project-2.svg', alt: '项目图片占位 1（可替换）' },
      { src: '/images/biz-energy-scene.svg', alt: '项目图片占位 2（可替换）' },
    ],
    pending: true,
  },
  {
    slug: 'project-placeholder-03',
    name: '项目名称待补充',
    category: '现代农业',
    location: '项目地点待补充',
    summary:
      '项目简介待补充：建议描述项目涉及的生产环节（种植 / 加工 / 仓储 / 流通）与数字化、新能源应用点。',
    image: '/images/project-3.svg',
    imageAlt: '现代农业项目封面（占位图，可替换）',
    detail: {
      background: '项目背景待补充：介绍项目所在区域、农业业态与建设目标。',
      needs: '客户需求待补充：描述生产效率、设施条件或能源利用方面的诉求。',
      solution: '解决方案待补充：描述智慧农业设施、数字化管理与新能源应用方案。',
      process: '实施过程待补充：描述建设周期、分期内容与协同方式。',
      results: '项目成果待补充：描述运营情况与综合效益（需确认后发布）。',
    },
    gallery: [
      { src: '/images/project-3.svg', alt: '项目图片占位 1（可替换）' },
      { src: '/images/biz-agriculture-scene.svg', alt: '项目图片占位 2（可替换）' },
    ],
    pending: true,
  },
  {
    slug: 'project-placeholder-04',
    name: '项目名称待补充',
    category: '新能源',
    location: '项目地点待补充',
    summary:
      '项目简介待补充：建议描述项目类型、规模量级与合作模式（投资 / EPC / 设备供应），发布前替换为真实项目。',
    image: '/images/project-4.svg',
    imageAlt: '综合产业项目封面（占位图，可替换）',
    detail: {
      background: '项目背景待补充：介绍项目主体与合作模式。',
      needs: '客户需求待补充：描述客户核心诉求与约束条件。',
      solution: '解决方案待补充：描述整体方案构成与关键设备。',
      process: '实施过程待补充：描述项目里程碑与交付过程。',
      results: '项目成果待补充：描述项目价值（需确认后发布）。',
    },
    gallery: [
      { src: '/images/project-4.svg', alt: '项目图片占位 1（可替换）' },
      { src: '/images/biz-energy-hero.svg', alt: '项目图片占位 2（可替换）' },
    ],
    pending: true,
  },
]

/** 按 slug 获取项目 */
export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug)
