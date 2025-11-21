# FluxAnimate - Plan de Desarrollo MVP

## Objetivo
Crear un demo web interactivo de FluxAnimate que simule una plataforma de edición y conversión de GIF/imágenes con IA, incluyendo sistema completo de exportación a GitHub.

## Arquitectura del Demo
- **Frontend**: React + TypeScript + shadcn-ui + TailwindCSS
- **Funcionalidad**: Simulación de herramientas de procesamiento (sin backend real)
- **Exportación**: Sistema completo de subida a GitHub desde el navegador

## Archivos a Crear (Máximo 8 archivos de código)

### 1. **src/pages/Index.tsx**
- Landing page principal con hero section
- Navegación a las herramientas
- Características destacadas
- Call-to-action

### 2. **src/pages/Tools.tsx**
- Dashboard con todas las herramientas disponibles
- Grid de tarjetas de herramientas
- Categorías: Crear, Convertir, Editar, IA

### 3. **src/pages/Editor.tsx**
- Interfaz de editor unificado
- Drag & drop uploader
- Panel de herramientas lateral
- Vista previa en tiempo real
- Controles de procesamiento simulados

### 4. **src/components/GithubUploader.tsx**
- Modal de configuración de GitHub
- Input para usuario/org, repo, token
- Lógica completa de subida a GitHub API
- Barra de progreso
- Log en tiempo real
- Manejo de errores y rate limits

### 5. **src/services/githubUploader.ts**
- Servicio modular para interactuar con GitHub API
- Crear repositorio
- Subir archivos (Base64)
- Manejo de rutas y estructura
- Gestión de tokens en localStorage

### 6. **src/components/ProjectPanel.tsx**
- Panel de proyectos guardados
- Historial de archivos procesados
- Gestión de localStorage

### 7. **src/lib/tools.ts**
- Definición de todas las herramientas
- Metadata de cada herramienta
- Categorías y descripciones

### 8. **index.html**
- Actualizar título y meta tags para FluxAnimate

## Funcionalidades Principales

### Herramientas Simuladas
1. **Crear**: GIF Maker, Video to GIF, Animated Text
2. **Convertir**: GIF↔WebP↔APNG↔AVIF↔MP4
3. **Editar**: Resize, Crop, Optimize, Speed, Reverse, Effects
4. **IA**: Upscaling, Background Removal, Frame Interpolation, Color Restoration

### Sistema de Exportación a GitHub
- Modal con formulario de configuración
- Validación de token
- Creación automática de repositorio
- Subida de todos los archivos del proyecto
- Progreso visual en tiempo real
- Enlace directo al repositorio creado

### UI/UX
- Modo oscuro/claro
- Diseño minimalista tipo Figma
- Animaciones suaves
- Responsive design
- Drag & drop intuitivo

## Notas de Implementación
- Usar componentes shadcn-ui existentes
- Simular procesamiento con delays y animaciones
- localStorage para persistencia temporal
- GitHub API REST directa desde el navegador
- Sin backend real (demo frontend only)