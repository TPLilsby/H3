# Brug en officiel Node.js image
FROM node:18-alpine

# Sæt arbejdsdirektoriet i containeren
WORKDIR /app

# Kopiér package.json og package-lock.json
COPY package*.json ./

# Installer afhængigheder
RUN npm install

# Kopiér resten af koden
COPY . .

# Expose porten
EXPOSE 3000

# Start appen
CMD ["node", "server.js"]