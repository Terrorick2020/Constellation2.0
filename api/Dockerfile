FROM node:18-alpine

RUN apk add --no-cache netcat-openbsd

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN chmod +x ./wait-for-db.sh

# CMD ["./wait-for-db.sh"]
CMD sh -c "./wait-for-db.sh && rm -f ./wait-for-db.sh"
