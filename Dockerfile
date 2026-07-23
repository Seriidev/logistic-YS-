# Multi-stage build for Yuusell customer frontend (React + Vite SPA)
FROM node:22-alpine AS base
WORKDIR /app

# ── Dependencies ──────────────────────────────────────────────
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ── Build ─────────────────────────────────────────────────────
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# VITE_* vars are embedded at build time — must be passed as ARG
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ── Runtime image ─────────────────────────────────────────────
FROM node:22-alpine AS production
WORKDIR /app

RUN apk add --no-cache dumb-init
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 website

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build --chown=website:nodejs /app/dist    ./dist
COPY --from=build --chown=website:nodejs /app/server.js ./server.js

USER website
EXPOSE 3000
CMD ["dumb-init", "node", "server.js"]
