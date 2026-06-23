FROM node:24-alpine AS builder
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN DATABASE_URL=local.db npm run build

FROM node:24-alpine AS runner
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/build build/
COPY --from=builder /app/src src/
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=9039
EXPOSE 9039
CMD ["node", "build"]
