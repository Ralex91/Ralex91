import { getGithubData } from "@/utils/github"
import {
  generateLangsSVG,
  generateMusicSVG,
  generateStatsSVG,
  generateTechsSVG,
  getMusicLink,
} from "@/utils/svgs"
import { Hono } from "hono"

const app = new Hono()

app.get("/stats", async (c) => {
  const { stats } = await getGithubData()

  c.header("Content-Type", "image/svg+xml")

  return c.body(generateStatsSVG(stats))
})

app.get("/langs", async (c) => {
  const { langs } = await getGithubData()

  c.header("Content-Type", "image/svg+xml")

  return c.body(generateLangsSVG(langs))
})

app.get("/techs", async (c) => {
  c.header("Content-Type", "image/svg+xml")

  return c.body(await generateTechsSVG())
})

app.get("/music", async (c) => {
  c.header("Content-Type", "image/svg+xml")

  return c.body(await generateMusicSVG())
})

app.get("/music/link", async (c) => {
  const link = await getMusicLink()
  if (!link) {
    return c.text("No link available", 404)
  }
  return c.redirect(link, 302)
})

export default {
  fetch: app.fetch,
  port: 3000,
}
