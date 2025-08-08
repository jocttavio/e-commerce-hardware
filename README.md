# Tienda Ferreteria
## 2022
## Sistema e-commerce para la compra de materiales de Ferreteria e incluyendo un carrito de productos.

## 🚀 Características principales

- ✅ Autenticación de usuarios (login/registro)
- 📅 Adición de productos en Carrito
- 🛠️ Panel administrativo para CRUD de productos

---

## 🧰 Tecnologías utilizadas

| Frontend                                    | Backend            | Base de datos | Otros              |
| ------------------------------------------- | ------------------ | ------------- | ------------------ |
| HTML/CSS, JavaScript, TailwindCSS, React.js | Nodejs , Expressjs | PostgreSQL    | Docker, Axios, Git |

---

## 👨‍💻 Mi rol en este proyecto

> Describe exactamente lo que tú hiciste si fue en equipo, o todo si fue personal.

- Diseñé la arquitectura backend usando Nodejs y Expressjs.
- Implementé las rutas, controladores y validaciones.
- Integré la base de datos con Postgresql.
- Creé componentes reutilizables en Reactjs para el frontend.
- Realicé el despliegue en servidor con Docker y Nginx.

---

## How to run it locally with Docker Compose

1. Clonar el repositorio

```bash
git clone https://github.com/jocttavio/tienda-ferreteria.git
cd tienda-ferreteria
```

2. Configurar las variables de entorno:

```bash
cp .env.example .env
```

- Configurar `.env` con los datos de conexión basado en `.env.copy`

```env
DB_USERNAME='joctavio'
DB_PASSWORD='psswd'
DB_DATABASE='ecommerce'
```

3. Levantar los servicios con docker compose (development)

```bash
docker compose -f docker-compose-dev.yml up -d
```

4. Después ingresa al siguiente enlace:  http://localhost:3000

---