# 同日新能源企业官网

高端、响应式、多页面企业官网原型。技术栈：**React 18 + TypeScript + Vite + Tailwind CSS + React Router**。

> 设计方向：深海军蓝 / 石墨黑 / 科技灰主色，电光蓝 + 新能源绿强调色；
> 克制的滚动动效与 hover 效果；中文优先、英文辅助；移动端 / 平板 / 桌面端全适配。

## 快速开始

```bash
npm install        # 安装依赖
npm run dev        # 开发模式（http://localhost:5173）
npm run build      # 生产构建（输出 dist/）
npm run preview    # 本地预览生产构建（http://localhost:4173）
npm run placeholders  # 重新生成占位图（见下文"图片替换"）
```

> 部署提示：站点使用 BrowserRouter，部署时需将所有路径回退到 `index.html`
> （GitHub Pages 已通过 404.html 回退实现；Nginx `try_files $uri /index.html;`、Vercel/Netlify 默认支持）。
>
> **线上地址**：https://tungrayenergy.com（GitHub Pages，DNS 托管于 GoDaddy：
> A 记录 @ → 185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153，
> CNAME www → yinkai-tang.github.io）。

## 页面结构

| 路由 | 页面 |
| --- | --- |
| `/` | 首页（Banner / 企业简介 / 三大业务 / 产业协同图 / 核心优势 / 项目案例 / 新闻动态 / 合作 CTA） |
| `/about` | 关于我们（简介 / 使命愿景价值观 / 集团背景 / 发展历程 Timeline / 团队文化 / ESG） |
| `/business` | 业务板块总览 |
| `/business/embodied-intelligence-supply-chain` | 具身智能供应链 |
| `/business/new-energy` | 新能源 |
| `/business/computing-infrastructure` | 算力中心（旧路由 `/business/modern-agriculture` 自动重定向） |
| `/projects`、`/projects/:slug` | 项目案例列表 / 详情（支持按业务筛选） |
| `/news`、`/news/:slug` | 新闻列表 / 详情（支持分类筛选、相关推荐、分享） |
| `/contact` | 联系我们（商务表单 + 联系方式 + 地图占位） |
| `/legal`、`/privacy` | 法律声明 / 隐私政策（占位模板，需法务审定） |

全站固定入口：顶部导航（滚动变玻璃质感深色栏，移动端汉堡菜单）；
右侧功能栏（电话咨询 / 在线留言弹窗 / 返回顶部；移动端为底部悬浮条）。

## 目录结构

```
website/
├── public/
│   ├── images/            # 全站图片（当前为生成的 SVG 占位图）
│   │   └── IMAGES.md      # ★ 每张图的用途与替换对照表
│   └── favicon.svg
├── scripts/
│   └── generate-placeholders.mjs   # 占位图生成脚本（npm run placeholders）
└── src/
    ├── config/            # ★★★ 全站可替换内容都在这里 ★★★
    │   ├── site.ts        #   公司信息 / 导航 / 联系方式 / 备案 / 表单文案
    │   ├── businesses.ts  #   三大业务板块（含详情页全部内容）
    │   ├── projects.ts    #   项目案例数据
    │   ├── news.ts        #   新闻数据（结构与 CMS 接口对齐）
    │   ├── about.ts       #   关于我们页面内容
    │   └── home.ts        #   首页文案（Banner / 数据条 / 协同能力 / 优势）
    ├── components/
    │   ├── layout/        # Header / Footer / SideToolbar / PageHeader / Layout
    │   ├── home/          # 首页各模块组件
    │   ├── forms/         # ContactForm / InquiryModal / SuccessModal / 校验
    │   └── ui/            # Icon（线性图标集）/ Reveal（滚动动效）/ SectionTitle
    ├── pages/             # 10 个页面组件
    ├── hooks/usePageMeta.ts  # 页面级 SEO（title / description / OG）
    └── utils/lead.ts      # ★ 表单提交接口（预留 API / 邮件 / 企业微信）
```

## 如何替换内容

### 1. 文字 / 数据 / 案例 / 新闻

只改 `src/config/` 下的文件，无需动组件：

- 联系电话、邮箱、地址、工作时间、备案号 → `config/site.ts`
  （当前值来自集团资料，均标注【待确认】，发布前逐项核实）
- 业务板块的定位、能力、场景、流程 → `config/businesses.ts`
- 项目案例 → `config/projects.ts`（当前为"待补充"占位模板，
  文件头注释里整理了集团资料中的真实案例线索，确认后填入）
- 新闻 → `config/news.ts`（接入 CMS 时把静态数组替换为接口数据即可，
  结构已对齐 `GET /api/news`、`GET /api/news/:slug`）

### 2. 图片

当前 `public/images/` 下是脚本生成的原创 SVG 占位图（可商用、无版权风险），
每张图左下角带编号（IMG-001 ~ IMG-021）。

- **方式 A（推荐）**：用真实照片**同名覆盖**对应文件，代码零改动；
- **方式 B**：新图片放入 `public/images/`，改 `src/config` 里对应 `image` 字段；
- 完整对照表（哪张图用在哪个页面、建议拍什么内容）见 `public/images/IMAGES.md`。

### 3. Logo

- 页眉 Logo 是组件绘制的品牌组合（`components/ui/SectionTitle.tsx` 中 `BrandLogo`）；
- 页脚使用集团官方 PNG（`public/images/brand/tungray-logo.png`）。
- 有正式品牌规范后替换即可。

## 表单对接（预留）

`src/utils/lead.ts` 的 `submitLead()` 是当前的前端模拟实现，三选一接入：

1. **自建 API**：在 `config/site.ts` 填 `form.apiEndpoint`，放开 fetch 注释；
2. **邮件服务**：Formspree / 阿里云邮件推送等；
3. **企业微信**：群机器人 Webhook 推送。

表单校验规则在 `src/components/forms/ContactForm.tsx` 顶部 `rules` 中。
"1–3 个工作日回复"等文案为可配置字段（`config/site.ts → form.responseHint`）。

## 地图接入

联系我们页的地图为占位组件（`src/pages/ContactPage.tsx` 中 `MapPlaceholder`），
后续可替换为高德/百度地图 iframe 或 JS SDK，坐标在 `config/site.ts` 中补充即可。

## SEO

- `index.html`：默认 title / description / keywords / Open Graph / canonical 占位；
- 每个页面通过 `usePageMeta()` 设置独立的 title / description / OG 图；
- 语义化标签（header / nav / main / article / section / footer）、全站图片 alt；
- 上线前：把 `index.html` 中 canonical 注释替换为真实域名，并补充真实 ICP 备案号。

## 设计说明

- 配色 / 字体 / 动画参数集中在 `tailwind.config.ts`，改一处全局生效；
- 滚动动效基于 IntersectionObserver（`components/ui/Reveal.tsx`），
  并尊重系统"减少动态效果"设置；
- 产业协同图为纯 SVG 绘制（`components/home/SynergySection.tsx`），
  无重型 3D / 音频资源，整站 gzip 后约 94KB。
