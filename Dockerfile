# ---- Build stage ----
FROM node:18-alpine AS builder
WORKDIR /app

# Build tools (kerak bo'lsa)
RUN apk add --no-cache python3 make g++ openssl

# Dep'larni cache-friendly o'rnatish
COPY package*.json ./
# CI/servers uchun eng barqaror: npm ci
RUN npm ci --legacy-peer-deps

# Source
COPY . .
# Prisma client va build
RUN npx prisma generate
RUN npm run build

# ---- Runtime stage ----
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

# Minimal paketlar (ixtiyoriy): tini ishlatmasak ham bo'ladi
RUN adduser -D appuser

# Runtime fayllar
COPY --from=builder /app/package*.json ./
# Prisma CLI ishlashi uchun node_modules to'liq olib o'tamiz
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/uploads ./uploads

USER appuser
EXPOSE 3000
# main.js ga to'g'rilandi
CMD ["node", "dist/main.js"]
