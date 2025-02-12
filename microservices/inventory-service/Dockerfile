# Usa una imagen base oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración de dependencias
COPY package.json package-lock.json ./

# Instala pnpm y las dependencias del proyecto
RUN npm install -g npm && npm install --frozen-lockfile

# Copia el resto del código fuente
COPY . .

# Expone el puerto de la aplicación
EXPOSE 3002

# Construye la aplicación
RUN npm run build

# Comando de inicio
CMD ["npm", "start"]
