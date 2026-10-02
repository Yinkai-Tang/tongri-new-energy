/**
 * 占位图生成脚本
 * ---------------------------------------------------------------
 * 生成一套与官网配色统一的本地 SVG 占位图（可商用、无版权风险），
 * 每张图左下角带有替换编号与用途说明。
 *
 * 正式上线时：将 public/images/ 下对应文件替换为真实照片
 * （保持同名或同步修改 src/config 中的 image 字段即可）。
 * 详细对照表见 public/images/IMAGES.md
 *
 * 运行：npm run placeholders
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '../public/images')
mkdirSync(OUT, { recursive: true })

// ---------- 基础色板 ----------
const C = {
  bg0: '#060D1A',
  bg1: '#0B1628',
  bg2: '#122036',
  line: '#24405F',
  gray: '#5D7BA3',
  blue: '#2E9BFF',
  blueSoft: '#7CC4FF',
  green: '#34D08C',
  greenSoft: '#8AE6BD',
}

// ---------- 通用元素 ----------
const defs = (id, c1, c2) => `
  <defs>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="0.55" stop-color="${c2}"/>
      <stop offset="1" stop-color="${C.bg0}"/>
    </linearGradient>
    <radialGradient id="glow-b-${id}" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${C.blue}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${C.blue}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow-g-${id}" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${C.green}" stop-opacity="0.5"/>
      <stop offset="1" stop-color="${C.green}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid-${id}" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M 80 0 L 0 0 0 80" fill="none" stroke="${C.line}" stroke-opacity="0.35" stroke-width="1"/>
    </pattern>
  </defs>`

const base = (id, w, h, c1 = C.bg1, c2 = C.bg2) => `
  <rect width="${w}" height="${h}" fill="url(#bg-${id})"/>
  <rect width="${w}" height="${h}" fill="url(#grid-${id})" opacity="0.5"/>
  <rect x="0" y="${h - 4}" width="${w}" height="4" fill="${C.blue}" opacity="0.7"/>`

const glowB = (id, cx, cy, r) => `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.72}" fill="url(#glow-b-${id})"/>`
const glowG = (id, cx, cy, r) => `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.72}" fill="url(#glow-g-${id})"/>`

/** 数据流线：贝塞尔曲线 + 流动虚线 */
const dataLines = (paths, color = C.blue, op = 0.5) => paths
  .map(
    (d) => `
  <path d="${d}" fill="none" stroke="${color}" stroke-opacity="${op * 0.4}" stroke-width="2"/>
  <path d="${d}" fill="none" stroke="${color}" stroke-opacity="${op}" stroke-width="2"
    stroke-dasharray="14 106" stroke-linecap="round"/>`
  )
  .join('')

/** 节点 */
const node = (x, y, r = 7, color = C.blue) => `
  <circle cx="${x}" cy="${y}" r="${r + 6}" fill="${color}" opacity="0.15"/>
  <circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

/** 建筑群天际线 */
const skyline = (x, y, scale = 1, color = C.bg2, win = C.blue) => {
  const bs = [
    [0, 150, 70, 190], [78, 90, 60, 250], [146, 190, 84, 150], [238, 60, 66, 280],
    [312, 140, 92, 200], [412, 20, 58, 320], [478, 120, 76, 220], [562, 180, 96, 160],
    [666, 80, 62, 260], [736, 160, 88, 180],
  ]
  let s = `<g transform="translate(${x} ${y}) scale(${scale})">`
  for (const [bx, by, bw, bh] of bs) {
    s += `<rect x="${bx}" y="${-bh}" width="${bw}" height="${bh}" fill="${color}" stroke="${C.line}" stroke-width="1"/>`
    for (let wy = -bh + 18; wy < -14; wy += 26) {
      for (let wx = bx + 10; wx < bx + bw - 10; wx += 20) {
        const on = (wx * 7 + wy * 13) % 5
        if (on < 2) s += `<rect x="${wx}" y="${wy}" width="7" height="9" fill="${win}" opacity="${on === 0 ? 0.75 : 0.35}"/>`
      }
    }
  }
  return s + '</g>'
}

/** 机械臂（几何风格） */
const robotArm = (x, y, s = 1, color = C.blue) => `
  <g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round">
    <circle cx="0" cy="0" r="34" fill="${C.bg2}" stroke-width="8"/>
    <path d="M 0 0 L 95 -85"/>
    <circle cx="95" cy="-85" r="16" fill="${C.bg2}" stroke-width="8"/>
    <path d="M 95 -85 L 175 -55 L 225 -120"/>
    <circle cx="225" cy="-120" r="11" fill="${C.bg2}" stroke-width="8"/>
    <path d="M 225 -120 L 252 -158 M 225 -120 L 258 -104 M 225 -120 L 240 -88"/>
  </g>`

/** 光伏板阵列 */
const solarArray = (x, y, s = 1, color = C.blue) => {
  let g = `<g transform="translate(${x} ${y}) scale(${s})">`
  const panel = (px, py, pw = 150, ph = 92, tilt = -0.3) => `
    <g transform="translate(${px} ${py}) rotate(${(tilt * 180) / Math.PI})">
      <rect x="0" y="0" width="${pw}" height="${ph}" fill="${C.bg2}" stroke="${color}" stroke-width="3"/>
      ${[1, 2].map((i) => `<line x1="0" y1="${(ph / 3) * i}" x2="${pw}" y2="${(ph / 3) * i}" stroke="${color}" stroke-opacity="0.6" stroke-width="2"/>`).join('')}
      ${[1, 2, 3].map((i) => `<line x1="${(pw / 4) * i}" y1="0" x2="${(pw / 4) * i}" y2="${ph}" stroke="${color}" stroke-opacity="0.6" stroke-width="2"/>`).join('')}
      <line x1="${pw / 2}" y1="${ph}" x2="${pw / 2 - 14}" y2="${ph + 44}" stroke="${C.gray}" stroke-width="6"/>
      <line x1="${pw / 2 - 14}" y1="${ph + 44}" x2="${pw / 2 + 14}" y2="${ph + 44}" stroke="${C.gray}" stroke-width="6"/>
    </g>`
  g += panel(0, 60) + panel(170, 30) + panel(340, 0) + panel(85, 150, 150, 92) + panel(255, 120)
  return g + '</g>'
}

/** 风机 */
const turbine = (x, y, h = 300, color = C.blueSoft) => `
  <g transform="translate(${x} ${y})" stroke="${color}" fill="none" stroke-linecap="round">
    <line x1="0" y1="0" x2="0" y2="${-h}" stroke-width="10"/>
    <g transform="translate(0 ${-h})">
      <circle r="12" fill="${C.bg2}" stroke-width="8"/>
      <g stroke-width="9">
        <line x1="0" y1="0" x2="0" y2="-96"/>
        <line x1="0" y1="0" x2="84" y2="48"/>
        <line x1="0" y1="0" x2="-84" y2="48"/>
      </g>
    </g>
  </g>`

/** 储能集装箱 */
const essContainer = (x, y, w = 320, h = 150, color = C.green) => `
  <g transform="translate(${x} ${y})">
    <rect x="0" y="0" width="${w}" height="${h}" rx="6" fill="${C.bg2}" stroke="${color}" stroke-width="3"/>
    ${Array.from({ length: Math.floor(w / 34) - 1 }, (_, i) => `<line x1="${22 + i * 34}" y1="18" x2="${22 + i * 34}" y2="${h - 18}" stroke="${color}" stroke-opacity="0.4" stroke-width="4"/>`).join('')}
    <rect x="10" y="${h - 34}" width="${w - 20}" height="6" fill="${color}" opacity="0.7"/>
    <circle cx="${w - 26}" cy="26" r="7" fill="${C.green}"/>
  </g>`

/** 现代温室 */
const greenhouse = (x, y, w = 420, h = 180, color = C.green) => `
  <g transform="translate(${x} ${y})" fill="none" stroke="${color}">
    <path d="M 0 ${h} L 0 ${h * 0.45} Q ${w / 2} ${-h * 0.35} ${w} ${h * 0.45} L ${w} ${h}" fill="${C.bg2}" stroke-width="3"/>
    <path d="M ${w / 2} ${h} L ${w / 2} ${h * 0.06}" stroke-opacity="0.6" stroke-width="2"/>
    ${[0.25, 0.75].map((p) => `<path d="M ${w * p} ${h} L ${w * p} ${h * 0.3}" stroke-opacity="0.5" stroke-width="2"/>`).join('')}
    <path d="M 0 ${h * 0.62} Q ${w / 2} ${h * 0.12} ${w} ${h * 0.62}" stroke-opacity="0.6" stroke-width="2"/>
  </g>`

/** 田垄（透视：纵向垄线向消失点汇聚 + 横向垄线） */
const fieldRows = (x, y, w, h, color = C.green) => {
  let s = `<g transform="translate(${x} ${y})">`
  const k = 0.28 // 顶部收敛系数
  for (let i = 0; i <= 7; i++) {
    const xb = (w / 7) * i
    const xt = w / 2 + (xb - w / 2) * k
    s += `<line x1="${xb}" y1="${h}" x2="${xt}" y2="0" stroke="${color}" stroke-opacity="${0.3 + (i % 2) * 0.12}" stroke-width="${1.5 + (i % 3) * 1.2}"/>`
  }
  let prev = 0
  for (const f of [0.06, 0.16, 0.3, 0.5, 0.75]) {
    const yy = h * f
    const half = (w / 2) * (k + (1 - k) * f)
    s += `<path d="M ${w / 2 - half} ${yy} Q ${w / 2} ${yy - 10} ${w / 2 + half} ${yy}" fill="none" stroke="${color}" stroke-opacity="0.4" stroke-width="2"/>`
    prev = f
  }
  return s + '</g>'
}

/** 芯片 */
const chip = (x, y, s = 1, color = C.blue) => `
  <g transform="translate(${x} ${y}) scale(${s})" stroke="${color}" fill="${C.bg2}">
    <rect x="-60" y="-60" width="120" height="120" stroke-width="4" rx="8"/>
    <rect x="-34" y="-34" width="68" height="68" fill="none" stroke-opacity="0.6" stroke-width="2"/>
    ${Array.from({ length: 6 }, (_, i) => {
      const p = -50 + i * 20
      return `<line x1="${p}" y1="-60" x2="${p}" y2="-84" stroke-width="4"/><line x1="${p}" y1="60" x2="${p}" y2="84" stroke-width="4"/><line x1="-60" y1="${p}" x2="-84" y2="${p}" stroke-width="4"/><line x1="60" y1="${p}" x2="84" y2="${p}" stroke-width="4"/>`
    }).join('')}
  </g>`

/** 能量球（太阳/能源核心） */
const energyOrb = (x, y, r = 90, color = C.green) => `
  <g transform="translate(${x} ${y})">
    <circle r="${r}" fill="none" stroke="${color}" stroke-opacity="0.35" stroke-width="2"/>
    <circle r="${r * 0.72}" fill="none" stroke="${color}" stroke-opacity="0.6" stroke-width="2"/>
    <circle r="${r * 0.4}" fill="${color}" opacity="0.85"/>
    ${Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2
      return `<line x1="${Math.cos(a) * r * 1.15}" y1="${Math.sin(a) * r * 1.15}" x2="${Math.cos(a) * r * 1.45}" y2="${Math.sin(a) * r * 1.45}" stroke="${color}" stroke-opacity="0.5" stroke-width="3"/>`
    }).join('')}
  </g>`

/** 生产线传送带 + 货箱 */
const conveyor = (x, y, s = 1) => {
  let g = `<g transform="translate(${x} ${y}) scale(${s})">`
  g += `<rect x="0" y="70" width="760" height="16" fill="${C.bg2}" stroke="${C.gray}" stroke-width="2"/>`
  for (let i = 0; i < 15; i++) g += `<circle cx="${28 + i * 50}" cy="94" r="10" fill="none" stroke="${C.gray}" stroke-width="3"/>`
  const boxes = [[40, 8, C.blue], [200, -6, C.green], [420, 8, C.blue], [600, -2, C.green]]
  for (const [bx, by, col] of boxes) {
    g += `<rect x="${bx}" y="${by}" width="96" height="62" rx="4" fill="${C.bg2}" stroke="${col}" stroke-width="3"/><line x1="${bx}" y1="${by + 20}" x2="${bx + 96}" y2="${by + 20}" stroke="${col}" stroke-opacity="0.5" stroke-width="2"/>`
  }
  return g + '</g>'
}

/** 底部标注（替换编号 + 用途） */
const label = (w, h, code, name) => `
  <g transform="translate(28 ${h - 24})">
    <rect x="0" y="-24" width="${String(code).length * 13 + String(name).length * 22 + 40}" height="34" rx="4" fill="${C.bg0}" opacity="0.72"/>
    <text x="14" y="0" font-family="Consolas, monospace" font-size="17" fill="${C.blue}" opacity="0.9">${code}</text>
    <text x="${String(code).length * 13 + 22}" y="0" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="17" fill="#B9C7DA" opacity="0.85">${name} · 占位图可替换</text>
  </g>
  <g transform="translate(${w - 28} 28)" stroke="${C.gray}" stroke-width="2" opacity="0.5">
    <line x1="-46" y1="0" x2="0" y2="0"/><line x1="0" y1="0" x2="0" y2="46"/>
  </g>`

const svg = (w, h, id, inner, c1 = C.bg1, c2 = C.bg2) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${defs(id, c1, c2)}${inner}</svg>`

// ---------- 生成清单 ----------
const files = []
const save = (name, content) => {
  writeFileSync(resolve(OUT, name), content.trim() + '\n', 'utf-8')
  files.push(name)
}

/* 1. 首页 Hero 1920x1080 —— 智能工厂 / 产业城市 */
{
  const w = 1920, h = 1080, id = 'hero'
  const inner =
    base(id, w, h, '#0A1628', '#122036') +
    glowB(id, 1500, 260, 460) + glowG(id, 360, 820, 420) +
    skyline(430, 880, 1.05, '#0E1E33', C.blue) +
    turbine(1560, 890, 340, C.greenSoft) +
    turbine(1720, 900, 240, C.greenSoft) +
    dataLines([
      'M -40 950 C 380 880, 700 1010, 1060 930 S 1700 840, 1980 900',
      'M -40 1010 C 420 960, 820 1060, 1240 990 S 1780 920, 1980 970',
    ], C.blue, 0.55) +
    dataLines(['M -40 880 C 300 830, 640 940, 1000 880 S 1600 800, 1980 850'], C.green, 0.4) +
    node(1500, 260, 9) + node(360, 820, 7, C.green) +
    label(w, h, 'IMG-001', '首页主视觉 · 智能工厂/产业园区全景')
  save('hero-home.svg', svg(w, h, id, inner))
}

/* 2. OG 分享封面 1200x630 */
{
  const w = 1200, h = 630, id = 'og'
  const inner =
    base(id, w, h, '#0B1628', '#122036') +
    glowB(id, 980, 160, 340) + glowG(id, 200, 520, 300) +
    skyline(90, 540, 0.52, '#0E1E33') +
    energyOrb(950, 220, 64, C.green) +
    dataLines(['M -20 500 C 300 440, 620 560, 940 480 S 1240 430, 1240 430'], C.blue, 0.5) +
    `<g transform="translate(110 210)">
      <text x="0" y="0" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-weight="700" font-size="72" fill="#EAF2FB">同日新能源</text>
      <text x="4" y="64" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="30" fill="${C.blueSoft}" letter-spacing="6">以产业协同，驱动绿色未来</text>
      <rect x="4" y="96" width="360" height="3" fill="${C.green}" opacity="0.8"/>
    </g>` +
    label(w, h, 'IMG-002', '社交分享封面 OG Image')
  save('og-cover.svg', svg(w, h, id, inner))
}

/* 3. 关于我们 · 集团园区 */
{
  const w = 1600, h = 1000, id = 'park'
  const inner =
    base(id, w, h, '#0A1628', '#16283F') +
    glowB(id, 1240, 240, 380) +
    skyline(300, 860, 1.15, '#0F2136', C.blueSoft) +
    dataLines(['M -30 880 C 420 800, 900 950, 1640 830'], C.blue, 0.45) +
    node(1240, 240, 8) +
    label(w, h, 'IMG-003', '集团总部/产业园区实景')
  save('about-park.svg', svg(w, h, id, inner))
}

/* 4. 关于我们 · 团队风貌 */
{
  const w = 1600, h = 1000, id = 'team'
  const person = (px, py, s = 1, col = C.blue) => `
    <g transform="translate(${px} ${py}) scale(${s})" fill="${C.bg2}" stroke="${col}" stroke-width="4">
      <circle cx="0" cy="-58" r="26"/>
      <path d="M -34 96 C -34 18, 34 18, 34 96 Z"/>
    </g>`
  const inner =
    base(id, w, h, '#0B1628', '#152640') +
    glowG(id, 420, 300, 340) +
    `<rect x="220" y="620" width="1160" height="16" fill="${C.bg2}" stroke="${C.line}"/>` +
    person(430, 620, 1.15, C.blue) + person(620, 620, 1.05, C.green) +
    person(800, 620, 1.25, C.blueSoft) + person(1000, 620, 1.05, C.green) +
    person(1180, 620, 1.15, C.blue) +
    dataLines(['M -30 300 C 400 220, 900 360, 1640 260'], C.green, 0.35) +
    label(w, h, 'IMG-004', '团队风貌/企业文化实景')
  save('about-team.svg', svg(w, h, id, inner))
}

/* 5. 具身智能供应链 · 板块主图（机械臂 + 芯片） */
{
  const w = 1600, h = 1000, id = 'chain'
  const inner =
    base(id, w, h, '#0A1628', '#14263C') +
    glowB(id, 1150, 300, 400) +
    chip(1150, 300, 2.1, C.blue) +
    robotArm(320, 860, 1.5, C.blueSoft) +
    conveyor(360, 700, 1.05) +
    dataLines(['M 60 940 C 500 860, 1000 980, 1640 900'], C.blue, 0.5) +
    label(w, h, 'IMG-005', '具身智能供应链 · 自动化产线/机器人零部件')
  save('biz-supply-chain-hero.svg', svg(w, h, id, inner))
}

/* 6. 具身智能供应链 · 产线细节 */
{
  const w = 1600, h = 1000, id = 'chain2'
  const inner =
    base(id, w, h, '#0A1628', '#152A45') +
    glowG(id, 800, 250, 360) +
    robotArm(620, 900, 2.2, C.green) +
    conveyor(200, 760, 1.5) +
    chip(1310, 300, 1.4, C.blue) +
    node(1310, 300, 8) +
    label(w, h, 'IMG-006', '具身智能供应链 · 智能制造/质检场景')
  save('biz-supply-chain-scene.svg', svg(w, h, id, inner))
}

/* 7. 新能源 · 板块主图（光伏 + 风电） */
{
  const w = 1600, h = 1000, id = 'energy'
  const inner =
    base(id, w, h, '#08131F', '#13293F') +
    glowG(id, 1280, 220, 400) + glowB(id, 300, 260, 340) +
    energyOrb(1280, 220, 78, C.green) +
    turbine(240, 880, 360, C.blueSoft) +
    turbine(440, 890, 260, C.blueSoft) +
    solarArray(620, 640, 1.5, C.green) +
    dataLines(['M -30 940 C 480 850, 1050 990, 1640 880'], C.green, 0.5) +
    label(w, h, 'IMG-007', '新能源 · 光伏/风电/储能电站实景')
  save('biz-energy-hero.svg', svg(w, h, id, inner))
}

/* 8. 新能源 · 储能场景 */
{
  const w = 1600, h = 1000, id = 'ess'
  const inner =
    base(id, w, h, '#08131F', '#152B44') +
    glowB(id, 820, 240, 380) +
    essContainer(140, 700, 420, 190, C.green) +
    essContainer(620, 700, 420, 190, C.blue) +
    essContainer(1100, 700, 380, 190, C.green) +
    batteryIcon(800, 300, 1.6) +
    dataLines(['M -30 640 C 400 560, 900 700, 1640 590'], C.blue, 0.45) +
    label(w, h, 'IMG-008', '新能源 · 储能系统/集装箱储能实景')
  save('biz-energy-scene.svg', svg(w, h, id, inner))

  function batteryIcon(x, y, s) {
    return `
    <g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-110" y="-60" width="200" height="120" rx="10" fill="${C.bg2}" stroke="${C.green}" stroke-width="5"/>
      <rect x="90" y="-24" width="26" height="48" rx="4" fill="${C.green}" opacity="0.85"/>
      <rect x="-92" y="-42" width="46" height="84" fill="${C.green}" opacity="0.55"/>
      <rect x="-36" y="-42" width="46" height="84" fill="${C.green}" opacity="0.3"/>
      <path d="M -20 -34 L -58 12 L -22 12 L -34 46 L 16 -6 L -18 -6 Z" fill="${C.green}"/>
    </g>`
  }
}

/* 9. 现代农业 · 板块主图（温室 + 田垄） */
{
  const w = 1600, h = 1000, id = 'agri'
  const inner =
    base(id, w, h, '#0A1720', '#143026') +
    glowG(id, 480, 260, 380) +
    greenhouse(180, 520, 560, 240, C.greenSoft) +
    fieldRows(880, 620, 620, 320, C.green) +
    node(480, 260, 8, C.green) +
    dataLines(['M -30 900 C 420 820, 980 960, 1640 850'], C.green, 0.5) +
    turbine(1450, 900, 210, C.greenSoft) +
    label(w, h, 'IMG-009', '现代农业 · 智能温室/种植基地实景')
  save('biz-agriculture-hero.svg', svg(w, h, id, inner))
}

/* 10. 现代农业 · 农业科技细节 */
{
  const w = 1600, h = 1000, id = 'agri2'
  const leaf = (x, y, s = 1, col = C.green) => `
    <g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round">
      <path d="M 0 0 C -90 -30, -140 -110, -150 -220 C -40 -210, 30 -150, 0 0 Z" fill="${C.bg2}"/>
      <path d="M -8 -18 C -60 -70, -100 -130, -132 -196" stroke-opacity="0.7" stroke-width="4"/>
      <path d="M 40 0 C 40 -70, 90 -130, 170 -160" stroke-opacity="0"/>
    </g>`
  const inner =
    base(id, w, h, '#0A1720', '#15332A') +
    glowG(id, 1100, 280, 380) +
    leaf(700, 880, 1.6, C.greenSoft) +
    leaf(950, 900, 1.1, C.green) +
    `<g stroke="${C.blue}" stroke-width="3" fill="none" opacity="0.7">
      <circle cx="1100" cy="280" r="60"/><circle cx="1100" cy="280" r="100" opacity="0.5"/>
      <line x1="1100" y1="180" x2="1100" y2="220"/><line x1="1100" y1="340" x2="1100" y2="380"/>
      <line x1="1000" y1="280" x2="1040" y2="280"/><line x1="1160" y1="280" x2="1200" y2="280"/>
    </g>` +
    dataLines(['M -30 300 C 400 220, 900 360, 1640 250'], C.green, 0.35) +
    label(w, h, 'IMG-010', '现代农业 · 农业物联网/数字化管理场景')
  save('biz-agriculture-scene.svg', svg(w, h, id, inner))
}

/* 11-14. 项目案例封面（motif 接收 id 参数） */
const projectCover = (file, code, name, motifFn, c1 = '#0A1628', c2 = '#14263C') => {
  const w = 1600, h = 1000, id = code.toLowerCase()
  const inner = base(id, w, h, c1, c2) + motifFn(id) + label(w, h, code, name)
  save(file, svg(w, h, id, inner))
}

projectCover('project-1.svg', 'IMG-011', '案例 · 具身智能供应链项目（待补充）',
  (id) => glowB(id, 520, 300, 380) + robotArm(560, 880, 1.7, C.blueSoft) + chip(1150, 320, 1.5) +
    dataLines(['M -30 940 C 480 860, 1050 990, 1640 890'], C.blue, 0.5))
projectCover('project-2.svg', 'IMG-012', '案例 · 新能源电站项目（待补充）',
  (id) => glowG(id, 1240, 240, 380) + energyOrb(1240, 240, 66, C.green) + solarArray(200, 620, 1.45, C.green) +
    turbine(1400, 900, 230, C.greenSoft) +
    dataLines(['M -30 930 C 480 850, 1050 980, 1640 880'], C.green, 0.5), '#08131F', '#13293F')
projectCover('project-3.svg', 'IMG-013', '案例 · 现代农业项目（待补充）',
  (id) => glowG(id, 420, 280, 360) + greenhouse(240, 500, 620, 260, C.greenSoft) + fieldRows(950, 600, 540, 330) +
    dataLines(['M -30 900 C 420 820, 980 960, 1640 850'], C.green, 0.5), '#0A1720', '#143026')
projectCover('project-4.svg', 'IMG-014', '案例 · 综合产业项目（待补充）',
  (id) => glowB(id, 820, 260, 400) + essContainer(220, 660, 480, 200, C.green) + essContainer(780, 660, 480, 200, C.blue) +
    skyline(1150, 660, 0.5, '#0F2136') +
    dataLines(['M -30 920 C 480 840, 1050 970, 1640 870'], C.blue, 0.5))

/* 15-17. 新闻封面 */
const newsCover = (file, code, name, motifFn) => {
  const w = 1600, h = 1000, id = code.toLowerCase()
  const inner = base(id, w, h, '#0B1628', '#16283F') + motifFn(id) + label(w, h, code, name)
  save(file, svg(w, h, id, inner))
}
newsCover('news-1.svg', 'IMG-015', '新闻封面 · 公司动态（可替换）',
  (id) => glowB(id, 800, 320, 400) +
  `<g transform="translate(800 420)" stroke="${C.blue}" stroke-width="6" fill="${C.bg2}">
     <rect x="-170" y="-110" width="340" height="220" rx="14"/>
     <line x1="-120" y1="-60" x2="60" y2="-60" stroke-opacity="0.8"/>
     <line x1="-120" y1="-10" x2="120" y2="-10" stroke-opacity="0.5"/>
     <line x1="-120" y1="40" x2="90" y2="40" stroke-opacity="0.5"/>
   </g>` +
    dataLines(['M -30 780 C 480 700, 1050 840, 1640 730'], C.blue, 0.5))
newsCover('news-2.svg', 'IMG-016', '新闻封面 · 行业洞察（可替换）',
  (id) => glowG(id, 1000, 300, 380) +
  `<g transform="translate(640 430)">
     ${[0, 1, 2].map((i) => `<rect x="${i * 90}" y="${-i * 70}" width="70" height="${180 + i * 70}" fill="${i === 2 ? C.green : C.bg2}" stroke="${i === 2 ? C.green : C.blue}" stroke-width="4"/>`).join('')}
   </g>` +
    dataLines(['M -30 800 C 480 720, 1050 860, 1640 750'], C.green, 0.45))
newsCover('news-3.svg', 'IMG-017', '新闻封面 · 项目动态（可替换）',
  (id) => glowB(id, 500, 300, 360) + glowG(id, 1150, 320, 340) +
  essContainer(200, 640, 380, 180, C.green) + robotArm(900, 860, 1.2, C.blue) + turbine(1380, 860, 200, C.greenSoft) +
  dataLines(['M -30 900 C 480 820, 1050 960, 1640 850'], C.blue, 0.5))

/* 18. 首页企业简介配图 */
{
  const w = 1400, h = 1050, id = 'intro'
  const inner =
    base(id, w, h, '#0A1628', '#16283F') +
    glowG(id, 1080, 260, 340) +
    skyline(220, 880, 1.0, '#0F2136', C.blueSoft) +
    turbine(1180, 890, 240, C.greenSoft) +
    dataLines(['M -30 900 C 400 820, 900 960, 1440 860'], C.blue, 0.45) +
    node(1080, 260, 7, C.green) +
    label(w, h, 'IMG-018', '首页企业简介 · 园区/工厂实景')
  save('intro-company.svg', svg(w, h, id, inner))
}

/* 19. 关于我们 · 产业基础 */
{
  const w = 1600, h = 900, id = 'mfg'
  const inner =
    base(id, w, h, '#0A1628', '#152A45') +
    glowB(id, 780, 260, 380) +
    robotArm(420, 860, 1.5, C.blueSoft) + conveyor(700, 720, 1.1) + chip(1240, 300, 1.3, C.blue) +
    dataLines(['M -30 930 C 480 850, 1050 980, 1640 880'], C.blue, 0.5) +
    label(w, h, 'IMG-019', '关于我们 · 集团智能制造产业基础实景')
  save('about-manufacturing.svg', svg(w, h, id, inner))
}

/* 20. 联系我们 · 顶部图 */
{
  const w = 1920, h = 640, id = 'contact'
  const inner =
    base(id, w, h, '#0A1628', '#14263C') +
    glowB(id, 1520, 180, 360) + glowG(id, 300, 480, 320) +
    skyline(120, 600, 0.55, '#0E1E33') +
    dataLines(['M -30 560 C 480 480, 1100 620, 1960 500'], C.blue, 0.45) +
    label(w, h, 'IMG-020', '联系我们 · 页头背景（可替换为办公区实景）')
  save('contact-banner.svg', svg(w, h, id, inner))
}

/* 21. ESG 模块配图 */
{
  const w = 1400, h = 900, id = 'esg'
  const inner =
    base(id, w, h, '#0A1720', '#143026') +
    glowG(id, 700, 300, 400) +
    `<g transform="translate(700 430)">
       <circle r="170" fill="none" stroke="${C.green}" stroke-width="3" opacity="0.7"/>
       <ellipse rx="170" ry="64" fill="none" stroke="${C.green}" stroke-width="2" opacity="0.5" transform="rotate(-18)"/>
       <ellipse rx="170" ry="64" fill="none" stroke="${C.green}" stroke-width="2" opacity="0.5" transform="rotate(52)"/>
       <circle r="64" fill="${C.green}" opacity="0.25"/>
       <path d="M -36 10 C -10 44, 26 40, 44 -6 C 20 6, 2 2, -6 -18 C -20 -2, -30 2, -36 10 Z" fill="${C.green}"/>
     </g>` +
    fieldRows(120, 620, 480, 240, C.green) +
    solarArray(880, 640, 0.95, C.green) +
    dataLines(['M -30 880 C 400 800, 1000 940, 1440 840'], C.green, 0.45) +
    label(w, h, 'IMG-021', '可持续发展 ESG · 绿色园区/生态实景')
  save('esg-green.svg', svg(w, h, id, inner))
}

// 汇总清单写入 IMAGES.md
const md = `# 占位图片清单与替换说明

> 所有图片均为本项目生成的原创 SVG 占位图（可商用、无版权风险），正式上线前请按需替换为真实摄影图。
> 替换方式 A：用同名图片直接覆盖 \`public/images/\` 下的文件（推荐，代码无需改动）。
> 替换方式 B：将新图片放入 \`public/images/\`，并修改 \`src/config/*.ts\` 中对应的 \`image\` 字段。

| 文件 | 编号 | 建议替换内容 | 使用位置 |
| --- | --- | --- | --- |
${[
  ['hero-home.svg', 'IMG-001', '智能工厂 / 产业园区全景大图（1920×1080）', '首页首屏 Banner'],
  ['og-cover.svg', 'IMG-002', '品牌分享封面（1200×630）', '微信/Twitter 等社交分享卡片'],
  ['about-park.svg', 'IMG-003', '集团总部 / 产业园区实景', '关于我们 · 公司简介'],
  ['about-team.svg', 'IMG-004', '团队合影 / 会议 / 车间人员实景', '关于我们 · 团队风貌'],
  ['biz-supply-chain-hero.svg', 'IMG-005', '自动化产线 / 机器人零部件', '具身智能供应链 · 页头与总览卡片'],
  ['biz-supply-chain-scene.svg', 'IMG-006', '智能制造 / 质检场景', '具身智能供应链 · 能力区'],
  ['biz-energy-hero.svg', 'IMG-007', '光伏 / 风电 / 储能电站', '新能源 · 页头与总览卡片'],
  ['biz-energy-scene.svg', 'IMG-008', '储能系统 / 集装箱储能', '新能源 · 能力区'],
  ['biz-agriculture-hero.svg', 'IMG-009', '智能温室 / 种植基地', '现代农业 · 页头与总览卡片'],
  ['biz-agriculture-scene.svg', 'IMG-010', '农业物联网 / 数字化管理', '现代农业 · 能力区'],
  ['project-1.svg', 'IMG-011', '具身智能供应链项目现场', '项目案例（待补充资料）'],
  ['project-2.svg', 'IMG-012', '新能源电站项目现场', '项目案例（待补充资料）'],
  ['project-3.svg', 'IMG-013', '现代农业项目现场', '项目案例（待补充资料）'],
  ['project-4.svg', 'IMG-014', '综合产业项目现场', '项目案例（待补充资料）'],
  ['news-1.svg', 'IMG-015', '公司动态配图', '新闻中心'],
  ['news-2.svg', 'IMG-016', '行业洞察配图', '新闻中心'],
  ['news-3.svg', 'IMG-017', '项目动态配图', '新闻中心'],
  ['intro-company.svg', 'IMG-018', '园区 / 工厂实景（1400×1050）', '首页企业简介'],
  ['about-manufacturing.svg', 'IMG-019', '智能制造产业基础实景', '关于我们 · 集团背景'],
  ['contact-banner.svg', 'IMG-020', '办公区 / 园区实景（1920×640）', '联系我们页头'],
  ['esg-green.svg', 'IMG-021', '绿色园区 / 生态实景', '关于我们 · ESG 模块'],
]
  .map(([f, c, s, u]) => `| ${f} | ${c} | ${s} | ${u} |`)
  .join('\n')}

## 摄影图选型建议
优先选择：智能工厂、自动化产线、机器人零部件、光伏板阵列、储能集装箱、风机、现代温室、
农业机械、产业园区航拍、技术人员工作照等方向的**正版可商用**图片，色调偏冷、深色天空更贴合站点气质。
`
writeFileSync(resolve(OUT, 'IMAGES.md'), md, 'utf-8')
console.log(`已生成 ${files.length} 张占位图 + IMAGES.md → ${OUT}`)
