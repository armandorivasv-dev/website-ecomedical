# EcoMedical - Landing Page

Este es el repositorio para la landing page de EcoMedical, un sitio web moderno y responsivo construido con Next.js y React.

## Características

- **Diseño Responsivo**: Adaptable a cualquier dispositivo, desde móviles hasta escritorios.
- **Componentes Reutilizables**: Construido con una arquitectura de componentes para fácil mantenimiento y escalabilidad.
- **Formulario de Contacto**: Integración con una API (`/api/send-email`) para procesar y enviar solicitudes de contacto por correo electrónico.
- **Chat Informativo**: Endpoint de API (`/api/infochat`) para alimentar un posible chatbot o sistema de respuestas automáticas.
- **Optimización SEO**: Incluye `robots.txt` y `sitemap.xml` para un mejor posicionamiento en motores de búsqueda.

## Tecnologías Utilizadas

- [Next.js](https://nextjs.org/) - Framework de React para producción.
- [React](https://react.dev/) - Biblioteca para construir interfaces de usuario.
- [MUI](https://mui.com/) - Biblioteca de componentes de React para un desarrollo más rápido y sencillo.

## Primeros Pasos

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

- Node.js (versión 18.x o superior)
- npm, yarn, pnpm o bun

### Instalación

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/ecomedical.git
    cd ecomedical
    ```

2.  **Instala las dependencias:**

    ```bash
    npm install
    # o
    yarn install
    # o
    pnpm install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto, copiando el ejemplo de `.env.example`.

    ```bash
    cp .env.example .env.local
    ```

    Luego, añade tus credenciales de API (por ejemplo, para el servicio de envío de correos).

    ```ini
    # .env.local
    RESEND_API_KEY=tu_api_key_de_resend
    ```

4.  **Ejecuta el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor en modo de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run start`: Inicia el servidor en modo de producción (requiere `build` previo).
- `npm run lint`: Ejecuta el linter de Next.js para revisar el código.
