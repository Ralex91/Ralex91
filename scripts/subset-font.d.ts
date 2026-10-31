// @types/subset-font is behind subset-font@2.9 (no noHinting / keepFeatures / dropTables)
declare module "subset-font" {
  interface SubsetFontOptions {
    targetFormat?: "sfnt" | "woff" | "woff2" | "truetype"
    preserveNameIds?: number[]
    keepFeatures?: string[]
    variationAxes?: Record<
      string,
      number | { min: number; max: number; default?: number }
    >
    noLayoutClosure?: boolean
    glyphNames?: boolean
    noHinting?: boolean
    dropTables?: string[]
    keepAllGlyphs?: boolean
  }

  export default function subsetFont(
    buffer: Buffer,
    text: string,
    options?: SubsetFontOptions,
  ): Promise<Buffer>
}
