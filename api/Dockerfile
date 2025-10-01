# Сборка
FROM node:22-alpine AS builder
 
WORKDIR /app

COPY package.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npx prisma generate
RUN npm run build

# Продуктивный образ
FROM node:22-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev --legacy-peer-deps

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/wait-for-db.sh ./wait-for-db.sh

RUN chmod +x ./wait-for-db.sh

EXPOSE 4200

CMD ["sh", "./wait-for-db.sh"]
