# Usa la imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de configuración
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código del microservicio
COPY . .

# Genera el cliente de Prisma
RUN npx prisma generate

# Expone el puerto en el que corre NestJS
EXPOSE 3001

# Comando para ejecutar el microservicio
CMD ["npm", "run", "start"]
