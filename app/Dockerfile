FROM node:20-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i
COPY . .

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "node", ".output/server/index.mjs" ]
