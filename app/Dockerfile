# # Сборочный этап
# FROM node:22-alpine AS builder

# WORKDIR /client

# COPY package.json .

# RUN npm install --legacy-peer-deps

# COPY . . 
# RUN npm run build

# # # Этап продакшена — через nginx
# # FROM nginx:stable-alpine
# # COPY --from=builder /client/node_modules ./node_modules
# # COPY --from=builder /client/dist /usr/share/nginx/html
# # EXPOSE 4173
# # CMD ["nginx", "-g", "daemon off;"]

# # Пробная версия
# EXPOSE 80

# ENV PORT=80
# ENV HOST=0.0.0.0
# CMD ["npm", "run", "preview"]





# Сборочный этап
# Сборочный этап
FROM node:22-alpine AS builder

WORKDIR /client

# Копируем package.json и устанавливаем ВСЕ зависимости (включая dev)
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Копируем исходники и собираем
COPY . .
RUN npm run build  # ← создаёт .output/

# Продакшен-этап
FROM node:22-alpine

WORKDIR /client

# Копируем только результат сборки и package.json
COPY --from=builder /client/.output ./.output
COPY --from=builder /client/package*.json ./

# Устанавливаем ТОЛЬКО production-зависимости
RUN npm ci --omit=dev --legacy-peer-deps --production

# Запуск SSR-сервера
ENV PORT=80
EXPOSE 80

USER node

CMD ["node", ".output/server/index.mjs"]