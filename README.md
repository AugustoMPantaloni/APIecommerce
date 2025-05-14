![Diagrama de código](https://gitdiagram.com/augustompantaloni/newapi)
Este diagrama muestra cómo están organizados los archivos y cómo se conectan entre sí.

🚀 E-commerce API (Node.js + MongoDB)
Arquitectura limpia, escalable y con autenticación JWT

📌 Características

✅ Funcionalidades implementadas:

- CRUD completo de productos, usuarios y carritos.
- Autenticación JWT con cookies seguras (httpOnly, signed).
- Generador de rutas genéricas para evitar código repetitivo en operaciones básicas.
- Carrito automático al registrar usuario.

🔜 Futuras implementaciones:

- Agregar producto al carrito.
- Vaciar carrito.
- Eliminar producto específico del carrito.
- Validaciones extras basicas.

🏗 Arquitectura

flowchart TD
  A[Modelos] --> B[Managers]
  B --> C[Controladores]
  C --> D[Generador de Rutas Genéricas]
  C --> E[Passport/JWT]
  D --> F[Rutas HTTP]
  E --> F

- Models (Product, User, Cart):
Definiciones de esquemas en Mongoose.

- Managers:
Lógica de negocio (ej: CartManager.createCart()).

- Controllers:
Adaptan managers a respuestas HTTP.

- GenericRouter:
Genera rutas CRUD automáticas para modelos simples.

- Auth:
Passport.js + JWT para autenticación

📄 Endpoints
🔐 Autenticación
Método	 Ruta	                   Descripción
POST	 /auth/register	Registro   (crea usuario + carrito automático).
POST	 /auth/login	Login      (devuelve token en cookie).

🛒 Carritos (Ejemplo de endpoints no genéricos)
Método	  Ruta	                     Descripción	                Estado
POST	  /api/carts/:cid/products	Agregar producto al carrito.	🔜 Pendiente
DELETE	  /api/carts/:cid	        Vaciar carrito.	                🔜 Pendiente

🛍 Productos/Usuarios (Rutas generadas por GenericRouter)
GET    /api/products
POST   /api/products
PUT    /api/products/:pid
DELETE /api/products/:pid

🛠 Tecnologías
- Backend: Node.js, Express, Mongoose.
- Autenticación: Passport.js, JWT, cookies firmadas.
- DB: MongoDB.
- Patrones: Arquitectura por capas, DRY (Don't Repeat Yourself).

