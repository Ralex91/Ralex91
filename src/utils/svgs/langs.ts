import { langsTpl } from "@/templates/langs"
import { TRACK_WIDTH } from "@/utils/constants"
import type { LangData } from "@/utils/github/types"
import { sumBy } from "remeda"

export const generateLangsSVG = (langs: LangData[]): string => {
  const total = sumBy(langs, (l: LangData) => l.percent)
  const ROW_H = 38
  const HEADER_H = 10
  const PADDING_B = 12
  const height = HEADER_H + langs.length * ROW_H + PADDING_B

  const rows = langs.map((lang, i) => {
    const barW = Math.round((lang.percent / total) * TRACK_WIDTH)
    const y = HEADER_H + i * ROW_H
    return {
      name: lang.name,
      percent: lang.percent,
      color: lang.color,
      barW,
      textY: y + 14,
      barY: y + 20,
    }
  })

  const clipPaths = langs
    .map((_, i) => {
      const barY = HEADER_H + i * ROW_H + 20
      return `<clipPath id="clip-${i}"><rect x="18" y="${barY}" width="${TRACK_WIDTH}" height="8" rx="3"/></clipPath>`
    })
    .join("\n    ")

  return langsTpl({
    height,
    heightInner: height - 1,
    clipPaths,
    rows,
  })
}
