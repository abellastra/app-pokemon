## 🐾 App de Pokemones Aplicación **full stack** para explorar, filtrar y visualizar Pokemones con datos dinámicos. Integra un frontend moderno con **React + Vite** y un backend robusto con **Express, TypeScript y Drizzle ORM** sobre **PostgreSQL**. 

---
 ## 🧩 Descripción general Esta app permite:
  - 🔍 Filtrar Pokemones por tipo 
  - 📸 Visualizar imágenes y datos técnicos 
  - 🧠 Practicar manejo de estado y renderizado condicional en React 
  - 🗃️ Persistir datos en una base relacional con migraciones automáticas 
  - 🧼 Aplicar buenas prácticas de modularización, validación y diseño visual 
  --- 
  ## ⚙️ Tecnologías utilizadas 
  
  ### 🖥️ Frontend 
  - ⚛️ **React + TypeScript** 
  - ⚡ **Vite** como entorno de desarrollo 
  - 🎨 **CSS plano** con clases semánticas 
  - 📦 Componentes organizados por lógica, estilos y estructura 
  - 🧠 Estado con useState y renderizado condicional 
  
  ### ⚙️ Backend 
  - 🔧 **Express + TypeScript** 
  - 🐘 **PostgreSQL con Drizzle ORM** 
  - 🔐 Autenticación con **JWT** y validación con **express-validator** 
  - 🌐 Rutas **REST (GET, POST, DELETE)** para gestionar Pokemones 
  - 🧪 Scripts para migrar y resetear la base de datos 
  
  --- 
  
  ## 🧠 Requisitos previos Antes de comenzar, asegurate de tener instalado: 
  - 🟢 Node.js 18 o superior 
  - 🐘 PostgreSQL corriendo en tu máquina 
  - 📦 npm o pnpm 
  
  --- 
  ## 🐘 Configuración de la base de datos Antes de ejecutar el backend, es necesario tener una base de datos **PostgreSQL** creada y accesible. 
  
  ### 1. Crear la base de datos

  sql
  CREATE DATABASE pokemones;


  ### 2. Configurar conexión
  Crea un archivo .env en la raíz del backend con las siguientes variables:

    ini
    Copiar código
    PORT=4000
    DB_HOST=localhost
    DB_USER=usuario
    DB_PASSWORD=contraseña
    DB_NAME=pokemones
    JWT_SECRET=secreto


### 3. Migrar base de datos

  bash
  Copiar código
  npm run migrate     # Aplica migraciones con drizzle-kit
  npm run reset-db    # Reinicia la base de datos desde cero


🚀 Instalación y ejecución
bash
Copiar código
# Clonar repositorio
git clone https://github.com/abellastra/app-pokemon
cd app-pokemon

# Frontend
cd frontend
npm install
npm run dev

# Backend
cd ../backend
npm install
npm run dev


## 🎯 Uso de la app
🧍‍♀️ Crear una cuenta y loguearse

🔍 Explorar y filtrar Pokemones por tipo

📸 Ver detalles e imágenes de cada Pokemon

🤝 Contribuciones
Hacer fork del repositorio

Crear un branch:

bash
Copiar código
git checkout -b feature/nueva-funcionalidad
Hacer commit de tus cambios

Enviar pull request

📄 Licencia
Este proyecto está bajo la licencia MIT.