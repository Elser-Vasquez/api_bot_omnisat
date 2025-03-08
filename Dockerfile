# Usar la imagen oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

# Instalar dependencias
RUN npm install

# Compilar TypeScript a JavaScript
RUN npm run build

# Exponer el puerto en el que corre la API
EXPOSE 3000

# Comando para iniciar la API
CMD ["node", "dist/app.js"]
