FROM node:18.20.0

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

COPY .env.sample .env

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "prod"]
