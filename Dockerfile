# Usa una imagen ligera de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en la carpeta de la aplicación
WORKDIR /usr/src/app

# Copia los archivos de configuración de dependencias
COPY package*.json ./

# Instala las dependencias (solo las necesarias para ejecutar npm start)
RUN npm install 

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que se ejecutará la aplicación (ajústalo según sea necesario)
EXPOSE 4200

# Comando para arrancar la aplicación con npm start
CMD ["npm", "start"]