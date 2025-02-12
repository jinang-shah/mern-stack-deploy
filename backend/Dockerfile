FROM node:18.20.0

RUN npm install pm2 -g

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

COPY .env.sample .env

RUN npm run build

EXPOSE 5000

CMD ["pm2-runtime", "dist/server.js"]
