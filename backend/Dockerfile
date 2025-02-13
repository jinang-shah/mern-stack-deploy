FROM node:18.20.0 AS backend-builder

RUN npm install pm2 -g

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

FROM node:18.20.0-slim

WORKDIR /app

# Install PM2 again in the final image
RUN npm install pm2 -g

COPY --from=backend-builder /app .

COPY .env.sample .env

RUN npm run build

EXPOSE 5000

CMD ["pm2-runtime", "dist/server.js"]
