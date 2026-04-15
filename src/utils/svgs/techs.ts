import { techsTpl } from "@/templates/techs"
import { TECH_DISPLAY_NAMES } from "@/utils/constants"
import { basename, join } from "path"

const SVG_W = 800
const SVG_H = 194
const CARD_W = 76
const CARD_H = 76
const CARD_GAP = 14
const STEP = CARD_W + CARD_GAP
const SCROLL_SPEED = 30

interface Icon {
  slug: string
  label: string
  content: string
}

interface IconRef {
  slug: string
  label: string
}

const TECHS_DIR = join(process.cwd(), "assets/techs")

function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function processIcon(
  svgContent: string,
  slug: string,
): { symbol: string; defs: string } {
  const viewBox = svgContent.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 128 128"

  let inner = svgContent
    .replace(/<\?xml[^?]*\?>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<svg[^>]*>/i, "")
    .replace(/<\/svg>/gi, "")
    .replace(/\s+xmlns(?::\w+)?="[^"]*"/g, "")
    .trim()

  const ids = [...inner.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1])
  for (const id of ids) {
    inner = inner
      .replaceAll(`id="${id}"`, `id="${slug}-${id}"`)
      .replaceAll(`url(#${id})`, `url(#${slug}-${id})`)
      .replaceAll(`href="#${id}"`, `href="#${slug}-${id}"`)
  }

  let defs = ""
  inner = inner.replace(/<defs>([\s\S]*?)<\/defs>/g, (_, content) => {
    defs += content.trim()
    return ""
  })

  return {
    symbol: `<symbol id="s-${slug}" viewBox="${viewBox}">${inner.trim()}</symbol>`,
    defs,
  }
}

function buildCard(x: number, slug: string, label: string): string {
  const cx = Math.round(CARD_W / 2)
  const iconSize = 40
  const iconX = Math.round((CARD_W - iconSize) / 2)

  return (
    `<g transform="translate(${x},0)">` +
    `<rect width="${CARD_W}" height="${CARD_H}" rx="6" fill="#231f1e" stroke="#3a3534" stroke-width="0.5"/>` +
    `<use href="#s-${slug}" x="${iconX}" y="8" width="${iconSize}" height="${iconSize}"/>` +
    `<text x="${cx}" y="68" class="cl">${escapeXml(label)}</text>` +
    `</g>`
  )
}

function buildRow(
  icons: IconRef[],
  direction: "left" | "right",
  y: number,
): { track: string; animDist: number } {
  const minCards = Math.ceil(SVG_W / STEP) + 1
  const set = [...icons]

  while (set.length < minCards) {
    const offset = Math.floor(icons.length / 2)
    const rotated = [...icons.slice(offset), ...icons.slice(0, offset)]
    set.push(...rotated.slice(0, minCards - set.length))
  }

  const animDist = set.length * STEP
  const cards = [...set, ...set]
    .map((icon, i) => buildCard(i * STEP, icon.slug, icon.label))
    .join("")

  return {
    track:
      `<g transform="translate(0,${y})">` +
      `<g class="${direction === "left" ? "tl" : "tr"}">${cards}</g>` +
      `</g>`,
    animDist,
  }
}

let cache: string | null = null

export async function generateTechsSVG(): Promise<string> {
  if (cache) return cache

  const files = [...new Bun.Glob("*.svg").scanSync({ cwd: TECHS_DIR })].sort()

  const icons: Icon[] = await Promise.all(
    files.map(async (file) => {
      const slug = basename(file, ".svg")
      return {
        slug,
        label: TECH_DISPLAY_NAMES[slug] ?? slug,
        content: await Bun.file(join(TECHS_DIR, file)).text(),
      }
    }),
  )

  const allDefs: string[] = []
  const allSymbols: string[] = []

  for (const { slug, content } of icons) {
    const { symbol, defs } = processIcon(content, slug)
    allSymbols.push(symbol)
    if (defs) allDefs.push(defs)
  }

  const mid = Math.ceil(icons.length / 2)
  const row1 = icons.slice(0, mid)
  const row2 = icons.slice(mid)

  const { track: track1, animDist: dist1 } = buildRow(row1, "left", 14)
  const { track: track2, animDist: dist2 } = buildRow(row2, "right", 104)

  cache = techsTpl({
    size: { w: SVG_W, h: SVG_H },
    assets: { defs: allDefs, symbols: allSymbols },
    rows: [
      { dist: dist1, dur: (dist1 / SCROLL_SPEED).toFixed(1), track: track1 },
      { dist: dist2, dur: (dist2 / SCROLL_SPEED).toFixed(1), track: track2 },
    ],
  })

  return cache
}
