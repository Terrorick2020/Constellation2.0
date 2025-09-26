FROM node:22-alpine AS builder

WORKDIR /client

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]