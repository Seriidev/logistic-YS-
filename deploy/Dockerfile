# Production image for server deployment (deploy/ only)
FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS production
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 website

COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./server.js

USER website

EXPOSE 4030
ENV PORT=4030

CMD ["node", "server.js"]
