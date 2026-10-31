import { langsTpl } from "@/templates/langs"
import { CARD_PADDING, SIDE_CARD_H, SIDE_CARD_W } from "@/utils/constants"
import type { LangData } from "@/utils/github/types"
import { sumBy } from "remeda"

const TRACK_WIDTH = SIDE_CARD_W - CARD_PADDING * 2
const LABEL_CAP_H = 9
const BAR_OFFSET = 6
const BAR_H = 8
const MAX_ROW_STEP = 40

export const generateLangsSVG = (langs: LangData[]): string => {
  const total = sumBy(langs, (l: LangData) => l.percent)

  // Spread rows between the top and bottom padding, centered when there are few
  const firstTextY = CARD_PADDING + LABEL_CAP_H
  const lastTextY = SIDE_CARD_H - CARD_PADDING - BAR_H - BAR_OFFSET
  const step =
    langs.length > 1
      ? Math.min(MAX_ROW_STEP, (lastTextY - firstTextY) / (langs.length - 1))
      : 0
  const offset = (lastTextY - firstTextY - step * (langs.length - 1)) / 2

  const rows = langs.map((lang, i) => {
    const textY = Math.round(firstTextY + offset + i * step)

    return {
      name: lang.name,
      percent: lang.percent,
      color: lang.color,
      barW: Math.round((lang.percent / total) * TRACK_WIDTH),
      textY,
      barY: textY + BAR_OFFSET,
    }
  })

  return langsTpl({
    width: SIDE_CARD_W,
    height: SIDE_CARD_H,
    padding: CARD_PADDING,
    trackWidth: TRACK_WIDTH,
    barH: BAR_H,
    rows,
  })
}
