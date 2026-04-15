import { getGithubData } from "@/utils/github"
import {
  generateLangsSVG,
  generateStatsSVG,
  generateTechsSVG,
} from "@/utils/svgs"
import { Hono } from "hono"

const app = new Hono()

app.get("/stats.svg", async (c) => {
  const { stats } = await getGithubData()

  c.header("Content-Type", "image/svg+xml")
  c.header("Cache-Control", "public, max-age=3600")

  return c.body(generateStatsSVG(stats))
})

app.get("/langs.svg", async (c) => {
  const { langs } = await getGithubData()

  c.header("Content-Type", "image/svg+xml")
  c.header("Cache-Control", "public, max-age=3600")

  return c.body(generateLangsSVG(langs))
})

app.get("/techs.svg", async (c) => {
  c.header("Content-Type", "image/svg+xml")
  c.header("Cache-Control", "public, max-age=86400")

  return c.body(await generateTechsSVG())
})

export default {
  fetch: app.fetch,
  port: 3000,
}
