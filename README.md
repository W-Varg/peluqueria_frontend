# Peluquería Frontend

Frontend para el sistema de gestión de peluquería desarrollado con Vue.js.

## Enlaces del Proyecto

- Frontend: [https://github.com/W-Varg/peluqueria_frontend.git](https://github.com/W-Varg/peluqueria_frontend.git)
- Backend: [https://github.com/W-Varg/peluqueria_backend.git](https://github.com/W-Varg/peluqueria_backend.git)

## Requisitos Mínimos

- Node.js 20.x o superior
- Yarn 1.22.x o superior
- Vue.js 3.x
- Vite 5.x

## Tecnologías Principales

- Vue.js 3
- Vite
- Vue Router
- Pinia (State Management)
- Tailwind CSS
- Axios

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/W-Varg/peluqueria_frontend.git
cd peluqueria_frontend
```

2. Instalar dependencias:

```bash
yarn install
```

3. Configurar variables de entorno:

```bash
cp .env.example .env
```

Editar el archivo `.env` con tus configuraciones.

4. Iniciar el servidor de desarrollo:

```bash
yarn dev
```

## Scripts Disponibles

- `yarn dev`: Inicia el servidor de desarrollo
- `yarn build`: Compila el proyecto para producción
- `yarn preview`: Vista previa de la build de producción
- `yarn lint`: Ejecuta el linter
- `yarn format`: Formatea el código
- `yarn test:unit`: Ejecuta tests unitarios

## Estado de Docker Compose

⚠️ **Nota Importante**: Actualmente, la configuración de Docker Compose presenta problemas y no está funcionando correctamente. Se recomienda ejecutar el proyecto localmente siguiendo los pasos de instalación manual mencionados arriba.

Los problemas conocidos incluyen:

- Problemas de conexión con el backend
- Conflictos con las variables de entorno
- Problemas de hot-reload en desarrollo

Estamos trabajando en resolver estos problemas. Por ahora, se recomienda el desarrollo local.

## Características Principales

- 📱 Diseño responsive
- 🎨 Interfaz moderna con Tailwind CSS
- 🔐 Autenticación de usuarios
- 📅 Gestión de citas
- 👥 Gestión de clientes
- 💇‍♀️ Catálogo de servicios

## Rutas Principales

- `/`: Página de inicio
- `/auth/login`: Inicio de sesión
- `/mis-reservas`: Mis citas
- `/auth/register`: Registro de usuario
- `/servicios`: Servicios disponibles

## credenciales de prueba

    ### CLIENTE

    - Correo: cliente@gmail.com
    - Contraseña: Cliente123@

    ### ADMINISTRADOR

    - Correo: cambiar@gmail.com
    - Contraseña: Cambiar123@

## Contribución

Si deseas contribuir al proyecto, por favor:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
