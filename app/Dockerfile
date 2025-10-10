FROM node:22-alpine AS builder

WORKDIR /client

COPY package.json .

RUN npm install --legacy-peer-deps

ENV NODE_OPTIONS=--max-old-space-size=4096


COPY . .
RUN npm run build

# EXPOSE 4173
# EXPOSE 3000

ENV PORT=80
EXPOSE 80
CMD ["node", ".output/server/index.mjs"]