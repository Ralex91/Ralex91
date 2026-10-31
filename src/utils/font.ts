import { readFileSync } from "fs"
import { join } from "path"

const FONT_PATH = join(process.cwd(), "assets/fonts/caskaydia-latin.woff2")
const fontBase64 = readFileSync(FONT_PATH).toString("base64")

export const FONT_FACE = `<style>@font-face { font-family: Caskaydia; src: url(data:font/woff2;base64,${fontBase64}) format("woff2"); }</style>`
