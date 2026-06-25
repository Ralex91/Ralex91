import { musicTpl } from "@/templates/music"
import { existsSync, readFileSync } from "fs"
import { encode as encodeXmlEntities } from "html-entities"
import { resolve } from "path"
import { isEmpty, pipe } from "remeda"

interface Song {
  title: string
  artist: string
  url?: string
}

const loadSongs = (): Song[] => {
  const dataDir = process.env.DATA_DIR ?? resolve(process.cwd(), "data")
  const path = resolve(dataDir, "musics.json")
  if (!existsSync(path)) {
    return []
  }
  return JSON.parse(readFileSync(path, "utf-8")) as Song[]
}

const SONGS = loadSongs()

interface iTunesResult {
  collectionName: string
  artworkUrl100: string
  primaryGenreName: string
  releaseDate: string
  trackTimeMillis: number
  trackViewUrl: string
}

const getDailySongIndex = (): number => {
  const date = new Date().toISOString().slice(0, 10)
  const hash = [...date].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0)

  return hash % SONGS.length
}

const truncate = (str: string, max: number): string =>
  str.length > max ? str.slice(0, max - 1) + "…" : str

const formatDuration = (ms: number): string => {
  const total = Math.round(ms / 1000)
  const min = Math.floor(total / 60)
  const sec = total % 60

  return `${min}:${sec.toString().padStart(2, "0")}`
}

const fetchSongMeta = async (
  artist: string,
  title: string,
): Promise<{
  album: string
  coverBase64: string | null
  genre: string
  year: string
  duration: string
  trackViewUrl: string
}> => {
  const empty = {
    album: "",
    coverBase64: null,
    genre: "—",
    year: "—",
    duration: "—",
    trackViewUrl: "",
  }
  const query = encodeURIComponent(`${artist} ${title}`)
  const res = await fetch(
    `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`,
  )

  if (!res.ok) {
    return empty
  }

  const data = (await res.json()) as { results: iTunesResult[] }
  if (isEmpty(data.results)) {
    return empty
  }

  const track = data.results[0]
  const album = track.collectionName ?? ""
  const genre = track.primaryGenreName ?? "—"
  const year = track.releaseDate
    ? String(new Date(track.releaseDate).getFullYear())
    : "—"
  const duration = track.trackTimeMillis
    ? formatDuration(track.trackTimeMillis)
    : "—"
  const trackViewUrl = track.trackViewUrl ?? ""

  const coverUrl = track.artworkUrl100.replace("100x100bb", "300x300bb")
  const imgRes = await fetch(coverUrl)

  if (!imgRes.ok) {
    return { album, coverBase64: null, genre, year, duration, trackViewUrl }
  }

  const buffer = await imgRes.arrayBuffer()
  const base64 = Buffer.from(buffer).toString("base64")

  return {
    album,
    coverBase64: `data:image/jpeg;base64,${base64}`,
    genre,
    year,
    duration,
    trackViewUrl,
  }
}

const EMPTY_SVG = musicTpl({
  title: "no songs",
  artist: "add data/musics.json",
  coverBase64: null,
  genre: "—",
  year: "—",
  duration: "—",
})

let cache: { date: string; svg: string; link: string } | null = null

const buildCache = async (today: string): Promise<void> => {
  if (isEmpty(SONGS)) {
    cache = { date: today, svg: EMPTY_SVG, link: "" }

    return
  }

  const song = SONGS[getDailySongIndex()]

  let coverBase64: string | null = null
  let genre = "—"
  let year = "—"
  let duration = "—"
  let link = song.url ?? ""

  try {
    const meta = await fetchSongMeta(song.artist, song.title)
    coverBase64 = meta.coverBase64
    genre = meta.genre
    year = meta.year
    duration = meta.duration

    if (!link) {
      link = meta.trackViewUrl
    }
  } catch {
    // fallback: render without metadata
  }

  const svg = musicTpl({
    title: pipe(song.title, (s) => truncate(s, 30), encodeXmlEntities),
    artist: pipe(song.artist, (s) => truncate(s, 34), encodeXmlEntities),
    coverBase64,
    genre: pipe(genre, (s) => truncate(s, 13), encodeXmlEntities),
    year,
    duration,
  })

  cache = { date: today, svg, link }
}

export const generateMusicSVG = async (): Promise<string> => {
  const today = new Date().toISOString().slice(0, 10)

  if (!cache || cache.date !== today) {
    await buildCache(today)
  }

  return cache!.svg
}

export const getMusicLink = async (): Promise<string> => {
  const today = new Date().toISOString().slice(0, 10)

  if (!cache || cache.date !== today) {
    await buildCache(today)
  }

  return cache!.link
}
