FROM oven/bun:alpine AS builder

WORKDIR /app

COPY package.json bun.lock tsconfig.json ./

RUN bun install --frozen-lockfile

COPY src ./src
COPY assets/techs ./assets/techs
COPY assets/fonts/caskaydia-latin.woff2 ./assets/fonts/

RUN bun run build

FROM oven/bun:distroless

WORKDIR /app

COPY --from=builder /app/dist/index.js ./index.js
COPY --from=builder /app/assets/techs ./assets/techs
COPY --from=builder /app/assets/fonts ./assets/fonts

ENV DATA_DIR=/data

EXPOSE 3000

CMD ["index.js"]
