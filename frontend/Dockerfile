# 1️⃣ Use a lightweight Node.js image
FROM node:18.20.0

# 2️⃣ Set the working directory inside the container
WORKDIR /app

# 3️⃣ Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy the entire frontend source code
COPY . .

COPY .env.sample .env

# 6️⃣ Expose the Vite development server port
EXPOSE 5173

# 7️⃣start the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]

