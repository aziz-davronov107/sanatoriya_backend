## Multi-stage Dockerfile for NestJS + Prisma
FROM node:18-alpine AS builder
WORKDIR /app

# install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production=false --silent

# copy sources
COPY prisma ./prisma
COPY tsconfig*.json ./
COPY . .

# generate Prisma client and build
RUN npx prisma generate
RUN npm run build

## Runner image
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# copy production node_modules and build artifacts
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# copy entrypoint
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["node", "dist/main"]
