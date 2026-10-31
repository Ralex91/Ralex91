import { FONT_FAMILY } from "@/utils/constants"
import { FONT_FACE } from "@/utils/font"

interface StatTile {
  value: number
  delta: number
  label: string
  color: string
  icon: string
}

interface StatsVars {
  tiles: StatTile[]
}

const CELL_W = 195
const CELL_H = 106
const PAD = 24

const tile = ({ value, delta, label, color, icon }: StatTile, i: number) => {
  const x = (i % 2) * CELL_W
  const y = Math.floor(i / 2) * CELL_H

  return `
  <g transform="translate(${x}, ${y})">
    <rect x="${PAD}" y="${PAD}" width="26" height="26" rx="6" fill="${color}1f"/>
    <g transform="translate(${PAD + 4}, ${PAD + 4}) scale(0.75)" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${icon}
    </g>
    <text x="${PAD + 36}" y="${PAD + 17}" font-family="${FONT_FAMILY}" font-size="12" fill="#c8b0ab">${label}</text>
    <text x="${PAD}" y="${PAD + 55}" font-family="${FONT_FAMILY}" font-size="28" font-weight="700" fill="${color}">${value}</text>
    <text x="${CELL_W - PAD}" y="${PAD + 42}" font-family="${FONT_FAMILY}" font-size="14" font-weight="700" fill="${color}" opacity="${delta > 0 ? 1 : 0.4}" text-anchor="end">+${delta}</text>
    <text x="${CELL_W - PAD}" y="${PAD + 55}" font-family="${FONT_FAMILY}" font-size="9" fill="#c8b0ab" opacity="0.6" text-anchor="end">this month</text>
  </g>`
}

export const statsTpl = ({ tiles }: StatsVars) => `
<svg width="100%" viewBox="0 0 390 212" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${FONT_FACE}
  </defs>

  <rect x="0" y="0" width="390" height="212" rx="6" fill="#292423"/>
  <rect x="0.5" y="0.5" width="389" height="211" rx="6" fill="none" stroke="#51403b" stroke-width="1"/>
  <line x1="${CELL_W}" y1="18" x2="${CELL_W}" y2="${CELL_H * 2 - 18}" stroke="#3a3534" stroke-width="1"/>
  <line x1="18" y1="${CELL_H}" x2="${CELL_W * 2 - 18}" y2="${CELL_H}" stroke="#3a3534" stroke-width="1"/>
${tiles.map(tile).join("")}
</svg>
`
