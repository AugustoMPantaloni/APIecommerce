# API E-commerce - Node.js + MongoDB

Backend robusto con arquitectura limpia y JWT para autenticación.  
CRUD completo para productos, usuarios y carritos, con rutas genéricas para acelerar el desarrollo y evitar código repetitivo.

---

## 🚀 Estado del proyecto

- **En desarrollo**.
- Arquitectura por capas (Modelos, DAO, Servicios, Controladores, Rutas).
- Autenticación segura con Passport.js y JWT usando cookies firmadas (httpOnly).
- Base preparada para crecer y escalar fácilmente.

---

## 🛠 Tecnologías

- **Backend:** Node.js, Express.js, Mongoose  
- **Base de datos:** MongoDB   
- **Autenticación:** Passport.js, JWT, cookies firmadas  
- **Patrones:** Arquitectura limpia, DRY (Don't Repeat Yourself)  
- **Herramientas:** nodemon para desarrollo, Postman para pruebas  

---

## 📦 Instalación y configuración

### Requisitos previos

- Node.js v18 o superior  
- MongoDB (local o Atlas)  
- Git (opcional)

### Pasos

1. Clonar repositorio:  
```bash
git clone https://github.com/AugustoMPantaloni/APIecommerce.git
cd APIecommerce

2. Instalar dependencias:
npm install

3. Crear archivo .env y configurar variables:
PORT=
URL_MONGOOSE=
PASSWORD_COOKIE=
PASSWORD_JWT=
PERSISTENCE=mongo
FRONTEND_URL=
MAILER_EMAIL=
MAILER_PASS=

4. Ejecutar servidor en modo desarrollo:
npm run dev
O en modo producción:
npm start
```

---

## Uso básico y verificación
Para facilitar las pruebas de la API, se incluyen colecciones de Postman listas para importar.

### Cómo importar la colección

1. Descargar la colección desde la carpeta `postman` en este repositorio.
2. Abrir Postman.
3. Hacer clic en el botón **Import** en la parte superior izquierda.
4. Seleccionar el archivo `.json` de la colección descargada.
5. ¡Listo! Podrás probar todas las rutas con su configuración ya lista. 

---

## 🗂 Arquitectura y estructura del proyecto

- Modelos: Esquemas Mongoose para productos, usuarios y carritos.
- DAO: Operaciones CRUD desacopladas de la lógica.
- Repository: Puente entre logica de negocios y DAO
- Servicios: Lógica de negocio, validaciones, reglas.
- Controladores: Adaptan servicios para responder a peticiones HTTP.
- Rutas: Definen los endpoints y conectan con controladores.
- Autenticación: Passport.js con JWT y cookies seguras.

En la carpeta assets pueden encontrar un archivo .drawio que se puede abrir en https://app.diagrams.net/ para visualziar de manera menos abstracta la arquitectura del proyecto

---

## 🔜 Roadmap / Próximas funcionalidades
- Funcionalidades de reduccion de cantidad de producto en el carrito
- Suite de tests unitarios e integración
- Documentación Swagger/OpenAPI
- Paginación y filtros avanzados

---

## 📋 Contribuir
- Haz un fork del repositorio.
- Crea una rama para tu feature o fix: git checkout -b feature/nombre.
- Realiza commits claros y concisos.
- Abre un Pull Request detallando los cambios.
- Por favor, sigue las buenas prácticas de código y escribe tests si es posible.

---

## ⚠️ Troubleshooting común
- MongoDB no conecta: Verifica que MONGO_URI en .env esté bien configurada y que MongoDB esté corriendo.
- Errores de autenticación: Revisa que JWT_SECRET y COOKIE_SECRET sean correctos y consistentes.
- Puerto ocupado: Cambia el valor de PORT en .env o detén procesos que usen el puerto.

---

🛠 Scripts disponibles
| Comando       | Descripción                                  | Ejecución               |
| ------------- | -------------------------------------------- | ----------------------- |
| `npm start`   | Inicia servidor en modo producción           | `node src/server.js`    |
| `npm run dev` | Inicia servidor en modo desarrollo (nodemon) | `nodemon src/server.js` |
| `npm test`    | Ejecuta tests (próximamente)                 |                         |

---

## Licencia
MIT License © Augusto M. Pantaloni