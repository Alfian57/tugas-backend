FROM node:22-bookworm-slim AS dependencies

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates openssl \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json prisma.config.ts ./
COPY prisma ./prisma

ENV DATABASE_URL="mysql://user:password@localhost:3306/tugas_backend"

RUN npm ci
RUN npx prisma generate

FROM dependencies AS build

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates openssl wget \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json prisma.config.ts ./
COPY prisma ./prisma

RUN npm ci --omit=dev \
  && DATABASE_URL="mysql://user:password@localhost:3306/tugas_backend" npx prisma generate \
  && npm cache clean --force

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.js"]
