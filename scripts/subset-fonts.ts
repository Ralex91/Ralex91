/**
 * Subset the Caskaydia font and embed it in the static SVGs.
 *
 * GitHub renders SVGs through <img>, so fonts must be inlined as base64.
 *
 * - assets/fonts/caskaydia-latin.woff2: Latin subset used by the server templates
 * - assets/banner.svg, assets/separators/*.svg: get a <style id="font"> with
 *   only the glyphs they use
 */
import { decode as decodeEntities } from "html-entities"
import { join, relative } from "path"
import subsetFont from "subset-font"

const ROOT = join(import.meta.dir, "..")
const SOURCE = join(ROOT, "fonts/CaskaydiaCoveNerdFontMono-Regular.ttf")
const LATIN_OUT = join(ROOT, "assets/fonts/caskaydia-latin.woff2")
const LATIN_RANGES: [number, number][] = [
  [0x20, 0x7e],
  [0xa0, 0x17f],
  [0x2010, 0x2027],
  [0x2030, 0x203a],
  [0x20ac, 0x20ac],
  [0x2122, 0x2122],
  [0x266a, 0x266b],
]
const FAMILY = "Caskaydia"

const source = Buffer.from(await Bun.file(SOURCE).arrayBuffer())

const makeSubset = (text: string) =>
  subsetFont(source, text, {
    targetFormat: "woff2",
    noHinting: true,
    keepFeatures: [],
    dropTables: ["GSUB", "GPOS", "GDEF"],
  })

const textChars = (svg: string): string => {
  const chars = new Set([" "])

  for (const [, content] of svg.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)) {
    const plain = decodeEntities(content.replace(/<[^>]+>/g, ""))
    for (const char of plain) {
      if (!/\s/.test(char)) chars.add(char)
    }
  }

  return [...chars].join("")
}

const embed = async (path: string) => {
  const svg = (await Bun.file(path).text()).replace(
    /\s*<style id="font">[\s\S]*?<\/style>/,
    "",
  )
  const data = (await makeSubset(textChars(svg))).toString("base64")
  const style = `<style id="font">@font-face { font-family: ${FAMILY}; src: url(data:font/woff2;base64,${data}) format("woff2"); }</style>`

  await Bun.write(path, svg.replace(/(<svg[^>]*>)/, `$1\n  ${style}`))
  console.log(`${relative(ROOT, path)}: ${data.length} B`)
}

const latinText = LATIN_RANGES.flatMap(([start, end]) =>
  Array.from({ length: end - start + 1 }, (_, i) =>
    String.fromCodePoint(start + i),
  ),
).join("")

await Bun.write(LATIN_OUT, await makeSubset(latinText))
console.log(`${relative(ROOT, LATIN_OUT)}: ${Bun.file(LATIN_OUT).size} B`)

const separators = [
  ...new Bun.Glob("*.svg").scanSync({ cwd: join(ROOT, "assets/separators") }),
]
  .sort()
  .map((file) => join(ROOT, "assets/separators", file))

for (const path of [join(ROOT, "assets/banner.svg"), ...separators]) {
  await embed(path)
}
