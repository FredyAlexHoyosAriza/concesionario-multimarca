# Concesionario Multimarca 🚗

Concesionario Multimarca es una aplicación web desarrollada en **React** que permite a los usuarios explorar y gestionar una variedad de vehículos de diferentes marcas. La aplicación ofrece funcionalidades para visualizar detalles de los vehículos, filtrar por categorías y administrar el inventario disponible.

Este proyecto cuenta con autenticación mediante **Auth0**, donde los nuevos usuarios tendrán inicialmente un rol limitado (`user`). Solo los administradores (`admin`) podrán acceder a todas las funcionalidades. Para inspeccionar la app, es necesario registrarse.

El backend está implementado en un proyecto separado llamado **api-concesionario-multimarca** con **Node.js y Express**. Ambos proyectos están desplegados y el frontend puede ser accedido en:

🔗 [Concesionario Multimarca en Vercel](https://concesionario-multimarca.vercel.app/)

## Características 🌟

- **Exploración de Vehículos**: Navega por una amplia selección de vehículos de diversas marcas y modelos.
- **Detalles del Vehículo**: Visualiza información detallada de cada vehículo, incluyendo especificaciones técnicas, precio y disponibilidad.
- **Filtrado Avanzado**: Filtra vehículos por marca, modelo, año, precio y otras características relevantes.
- **Gestión de Inventario**: Administra el inventario de vehículos disponibles, incluyendo la adición, edición y eliminación de registros (solo accesible para administradores).
- **Autenticación con Auth0**: Manejo de usuarios y roles con inicio de sesión seguro.

## Tecnologías Utilizadas 🛠️

### Frontend

- **React** - Biblioteca principal para la construcción de la interfaz de usuario.
- **React Router** - Manejo de rutas y navegación dentro de la aplicación.
- **Axios** - Realización de solicitudes HTTP para la obtención de datos.
- **Material UI** - Componentes estilizados para una mejor experiencia de usuario.
- **Tailwind CSS** - Estilos modernos y reutilizables.
- **Auth0** - Autenticación segura basada en roles.

### Backend (API Concesionario Multimarca)

- **Node.js** - Entorno de ejecución en el servidor.
- **Express.js** - Framework para la creación de APIs.
- **MongoDB + Mongoose** - Base de datos NoSQL para almacenamiento.
- **GraphQL / REST** - Posible implementación para la comunicación con el frontend.

## Instalación y Ejecución 🚀

Sigue estos pasos para configurar y ejecutar la aplicación en tu entorno local:

### 1. Clonar el repositorio

```bash
git clone https://github.com/FredyAlexHoyosAriza/concesionario-multimarca.git
cd concesionario-multimarca
```

### 2. Instalar dependencias

```bash
npm install
# o con Yarn
yarn install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
REACT_APP_API_URL=http://localhost:4000/api
REACT_APP_AUTH0_DOMAIN=your-auth0-domain
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
```

### 4. Ejecutar la aplicación

```bash
npm start
# o con Yarn
yarn start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Estructura del Proyecto 📁

```plaintext
concesionario-multimarca/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── Header.js
│   │   ├── VehicleList.js
│   │   ├── VehicleDetail.js
│   │   └── ...
│   ├── pages/             # Páginas principales
│   │   ├── HomePage.js
│   │   ├── InventoryPage.js
│   │   └── ...
│   ├── services/          # Módulos para API y autenticación
│   │   └── api.js
│   ├── App.js             # Punto de entrada de la app
│   ├── index.js           # Renderizado principal
│   └── ...
├── package.json
└── README.md
```

## Contribuciones 🤝

¡Las contribuciones son bienvenidas! Si deseas mejorar o ampliar la funcionalidad de la aplicación:

1. Haz un fork del proyecto.
2. Crea una nueva rama: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza tus cambios y haz commit: `git commit -m 'Añadir nueva funcionalidad'`.
4. Sube tus cambios: `git push origin feature/nueva-funcionalidad`.
5. Abre un Pull Request.

## Licencia 📄

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## Contacto 📬

- **GitHub**: [FredyAlexHoyosAriza](https://github.com/FredyAlexHoyosAriza)
- **LinkedIn**: [Fredy Alex Hoyos Ariza](https://www.linkedin.com/in/fredyalexanderhoyosariza/)
- **Email**: [fredy.hoyos@example.com](mailto:fredy.hoyos@example.com)

---

✨ ¡Gracias por revisar este proyecto! Espero que te sea útil. 🚀
