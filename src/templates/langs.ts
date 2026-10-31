import { FONT_FAMILY } from "@/utils/constants"
import { FONT_FACE } from "@/utils/font"

interface LangRow {
  name: string
  percent: number
  color: string
  barW: number
  textY: number
  barY: number
}

export interface LangsVars {
  width: number
  height: number
  padding: number
  trackWidth: number
  barH: number
  rows: LangRow[]
}

export const langsTpl = ({
  width,
  height,
  padding,
  trackWidth,
  barH,
  rows,
}: LangsVars) => {
  const langRow = ({ name, percent, color, barW, textY, barY }: LangRow) => `
  <g>
    <text x="${padding}" y="${textY}" font-family="${FONT_FAMILY}" font-size="12" font-weight="700" fill="${color}">${name}</text>
    <text x="${width - padding}" y="${textY}" font-family="${FONT_FAMILY}" font-size="11" fill="${color}" text-anchor="end">${percent}%</text>
    <rect x="${padding}" y="${barY}" width="${trackWidth}" height="${barH}" rx="3" fill="${color}10"/>
    <rect x="${padding}" y="${barY}" width="${barW}" height="${barH}" rx="3" fill="${color}" opacity="0.85"/>
  </g>
`

  return `
<svg width="100%" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${FONT_FACE}
  </defs>

  <rect x="0" y="0" width="${width}" height="${height}" rx="6" fill="#292423"/>
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="6" fill="none" stroke="#51403b" stroke-width="1"/>
${rows.map(langRow).join("")}
</svg>
`
}
