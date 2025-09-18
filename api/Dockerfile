FROM node:lts-alpine

WORKDIR /app
# RUN apk update && apk upgrade && apk add --no-cache make gcc g++ python3 
RUN apk update && apk upgrade
COPY . .

RUN npm i --legacy-peer-deps

RUN chmod +x ./wait-for-db.sh

EXPOSE 3000

CMD ["sh", "./wait-for-db.sh"]
