# 🐾 App de Pokemones

Aplicación full stack para explorar, filtrar y visualizar Pokemones con datos dinámicos. Integra un frontend moderno con React + Vite y un backend robusto con Express, TypeScript y Drizzle ORM sobre PostgreSQL.

---

## 🧩 Descripción general

Esta app permite:

- 🔍 Filtrar Pokemones por tipo  
- 📸 Visualizar imágenes y datos técnicos  
- 🧠 Practicar manejo de estado y renderizado condicional en React  
- 🗃️ Persistir datos en una base relacional con migraciones automáticas  
- 🧼 Aplicar buenas prácticas de modularización, validación y diseño visual  

---

## ⚙️ Tecnologías utilizadas

### Frontend

- ⚛️ React + TypeScript  
- ⚡ Vite como entorno de desarrollo  
- 🎨 CSS plano con clases semánticas  
- 📦 Componentes organizados por lógica, estilos y estructura  
- 🧠 Estado con `useState` y renderizado condicional  

### Backend

- 🔧 Express + TypeScript  
- 🐘 PostgreSQL con Drizzle ORM  
- 🔐 Autenticación con JWT y validación con `express-validator`  
- 🌐 Rutas REST (`GET`, `POST`, `DELETE`) para gestionar Pokemones  
- 🧪 Scripts para migrar y resetear la base de datos  

---

## 🐘 Configuración de la base de datos

Antes de ejecutar el backend, es necesario tener una base de datos PostgreSQL creada y accesible.

### 1. Crear la base de datos

Podés hacerlo desde tu cliente favorito (pgAdmin, DBeaver, consola, etc.):

```sql
CREATE DATABASE pokemones;

## 🐘 Base de datos con Drizzle ORM

El backend usa **Drizzle ORM** para interactuar con PostgreSQL de forma segura y tipada.

**Estructura:**

- `db/schema.ts`: define las tablas y relaciones  
- `db/index.ts`: configura la conexión  
- `drizzle.config.ts`: configuración para migraciones  

**Scripts útiles:**

```bash
npm run migrate     # Aplica migraciones con drizzle-kit
npm run reset-db    # Reinicia la base de datos desde cero

