# ====== STAGE 1: Builder ======
FROM node:20 AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build && rm -rf dist/**/*.map

# ====== STAGE 2: Runner ======
FROM node:20-alpine
RUN apk add --no-cache tini

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "dist/main"]