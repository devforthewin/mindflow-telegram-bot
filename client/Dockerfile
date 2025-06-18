# ====== STAGE 1: Builder ======
FROM node:20-alpine AS builder
WORKDIR /app

# Only production
RUN apk add --no-cache tini

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY index.html ./

COPY public ./public
COPY src ./src
COPY tsconfig*.json vite.config.ts ./

RUN yarn build && \
    find /app/dist -name "*.map" -delete

# ====== STAGE 2: Nginx ======
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf