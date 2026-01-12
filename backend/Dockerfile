FROM node:18-alpine AS builder

RUN apk add --no-cache openssl libc6-compat

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY prisma ./prisma
RUN npx prisma generate

RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build

FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/node_modules/@prisma ./node_modules/@prisma

CMD ["node", "dist/main"]
