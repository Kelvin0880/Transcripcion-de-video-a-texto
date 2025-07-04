# 🤝 Guía de Contribución - TranscriptorPro

¡Gracias por tu interés en contribuir a TranscriptorPro! Este documento te guiará a través del proceso de contribución.

## 📋 Tabla de Contenidos

1. [Código de Conducta](#código-de-conducta)
2. [Tipos de Contribución](#tipos-de-contribución)
3. [Proceso de Contribución](#proceso-de-contribución)
4. [Estándares de Código](#estándares-de-código)
5. [Guía de Desarrollo](#guía-de-desarrollo)
6. [Reportar Bugs](#reportar-bugs)
7. [Solicitar Características](#solicitar-características)
8. [Pull Requests](#pull-requests)

## 🤝 Código de Conducta

### Nuestro Compromiso
Nos comprometemos a hacer de la participación en nuestro proyecto una experiencia libre de acoso para todos, independientemente de:
- Edad, tamaño corporal, discapacidad visible o invisible
- Etnia, características sexuales, identidad y expresión de género
- Nivel de experiencia, educación, estatus socioeconómico
- Nacionalidad, apariencia personal, raza, religión
- Orientación sexual o identidad

### Comportamiento Esperado
- Usar un lenguaje acogedor e inclusivo
- Ser respetuoso con diferentes puntos de vista
- Aceptar críticas constructivas
- Enfocarse en lo que es mejor para la comunidad
- Mostrar empatía hacia otros miembros

### Comportamiento Inaceptable
- Uso de lenguaje o imágenes sexualizadas
- Trolling, comentarios insultantes o despectivos
- Acoso público o privado
- Publicar información privada sin permiso
- Otra conducta que podría considerarse inapropiada

## 🎯 Tipos de Contribución

### 📝 Documentación
- Mejorar README.md
- Añadir ejemplos de uso
- Corregir errores tipográficos
- Traducir documentación
- Crear tutoriales

### 🐛 Reportar Bugs
- Identificar problemas en el código
- Reportar errores de interfaz
- Documentar comportamientos inesperados
- Sugerir mejoras de usabilidad

### ✨ Nuevas Características
- Proponer nuevas funcionalidades
- Mejorar características existentes
- Optimizar rendimiento
- Añadir soporte para nuevos idiomas

### 🎨 Mejoras de Diseño
- Mejorar interfaz de usuario
- Optimizar experiencia móvil
- Añadir animaciones
- Mejorar accesibilidad

### 🔧 Mejoras Técnicas
- Refactorización de código
- Optimización de performance
- Mejoras de seguridad
- Actualización de dependencias

## 🚀 Proceso de Contribución

### 1. Fork del Repositorio
```bash
# Crear fork en GitHub
# Clonar tu fork
git clone https://github.com/tu-usuario/transcriptor-pro.git
cd transcriptor-pro

# Añadir upstream
git remote add upstream https://github.com/kelvin8bp/transcriptor-pro.git
```

### 2. Configurar Entorno
```bash
# Instalar dependencias
npm install

# Crear rama para tu feature
git checkout -b feature/nombre-de-tu-feature

# Configurar variables de entorno
cp .env.example .env.local
```

### 3. Realizar Cambios
```bash
# Hacer tus cambios
# Probar localmente
npm run dev

# Verificar que todo funciona
npm run build
npm run lint
```

### 4. Commit y Push
```bash
# Añadir cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: añadir soporte para nuevos formatos de video"

# Push a tu fork
git push origin feature/nombre-de-tu-feature
```

### 5. Crear Pull Request
1. Ve a tu fork en GitHub
2. Crea un Pull Request
3. Describe tus cambios detalladamente
4. Espera revisión y feedback

## 📏 Estándares de Código

### Estilo de Código
- **Prettier**: Formateo automático
- **ESLint**: Linting de código
- **TypeScript**: Tipado estático obligatorio
- **Conventional Commits**: Formato de commits

### Convenciones de Naming
```typescript
// Componentes - PascalCase
const VideoPlayer = () => {}

// Funciones - camelCase
const handleFileUpload = () => {}

// Constantes - UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 100 * 1024 * 1024

// Interfaces - PascalCase con 'I' prefix
interface ITranscriptionResult {}
```

### Estructura de Archivos
```
src/
├── app/
│   ├── page.tsx          # Páginas
│   └── api/              # API routes
├── components/           # Componentes reutilizables
├── hooks/               # Custom hooks
├── lib/                 # Utilidades
├── types/               # Definiciones de tipos
└── styles/              # Estilos globales
```

## 🔧 Guía de Desarrollo

### Configuración del Entorno
```bash
# Node.js 18+
node --version

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev
```

### Scripts Disponibles
```bash
npm run dev        # Desarrollo
npm run build      # Build producción
npm run start      # Iniciar build
npm run lint       # Linting
npm run type-check # Verificar tipos
```

### Testing
```bash
# Ejecutar tests
npm run test

# Tests con cobertura
npm run test:coverage

# Tests en watch mode
npm run test:watch
```

### Debugging
```bash
# Logs detallados
DEBUG=* npm run dev

# Solo logs de Next.js
DEBUG=next:* npm run dev
```

## 🐛 Reportar Bugs

### Antes de Reportar
1. Busca issues similares existentes
2. Verifica con la última versión
3. Reproduce el error consistentemente
4. Recopila información del sistema

### Template de Bug Report
```markdown
**Descripción del Bug**
Descripción clara y concisa del problema.

**Pasos para Reproducir**
1. Ve a '...'
2. Haz clic en '...'
3. Desplázate hacia '...'
4. Ve el error

**Comportamiento Esperado**
Lo que esperabas que sucediera.

**Comportamiento Actual**
Lo que realmente sucedió.

**Screenshots**
Si aplica, añade screenshots.

**Información del Sistema**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Version: [e.g. 1.0.0]
```

## ✨ Solicitar Características

### Template de Feature Request
```markdown
**¿Tu solicitud está relacionada con un problema?**
Descripción clara del problema.

**Describe la solución que te gustaría**
Descripción clara de lo que quieres que suceda.

**Describe alternativas que hayas considerado**
Otras soluciones o características consideradas.

**Información adicional**
Cualquier otro contexto sobre la solicitud.
```

### Criterios de Aceptación
- Debe alinearse con la visión del proyecto
- Debe ser técnicamente factible
- Debe beneficiar a la mayoría de usuarios
- Debe mantener la simplicidad de uso

## 📤 Pull Requests

### Checklist antes de PR
- [ ] Código sigue las convenciones del proyecto
- [ ] Tests pasan correctamente
- [ ] Documentación actualizada
- [ ] Commit messages siguen conventional commits
- [ ] PR describe claramente los cambios

### Template de PR
```markdown
**Descripción**
Descripción breve de los cambios.

**Tipo de Cambio**
- [ ] Bug fix
- [ ] Nueva característica
- [ ] Breaking change
- [ ] Actualización documentación

**Pruebas**
Describe las pruebas realizadas.

**Checklist**
- [ ] Código sigue el estilo del proyecto
- [ ] Self-review completado
- [ ] Comentarios añadidos en código complejo
- [ ] Documentación actualizada
- [ ] Tests añadidos/actualizados
```

### Proceso de Revisión
1. **Revisión Automática**: CI/CD ejecuta tests
2. **Revisión Manual**: Maintainer revisa código
3. **Feedback**: Comentarios y sugerencias
4. **Iteración**: Implementar cambios solicitados
5. **Aprobación**: Merge cuando esté listo

## 🎯 Áreas de Contribución Prioritarias

### 🔥 Alta Prioridad
- Soporte para más formatos de video
- Mejoras de rendimiento
- Optimización móvil
- Accesibilidad (WCAG compliance)

### 🌟 Media Prioridad
- Nuevos idiomas de transcripción
- Mejoras de UI/UX
- Integración con más APIs
- Documentación expandida

### 💡 Baja Prioridad
- Características experimentales
- Integraciones avanzadas
- Herramientas de desarrollo
- Optimizaciones menores

## 🏆 Reconocimiento

### Contribuidores Actuales
- **Kelvin Jose Piña Gomez** - Desarrollador Principal
- *Tu nombre podría estar aquí* - Contribuidor

### Niveles de Contribución
- **🥇 Gold**: 50+ commits significativos
- **🥈 Silver**: 20+ commits significativos  
- **🥉 Bronze**: 5+ commits significativos
- **⭐ Contributor**: 1+ commit aceptado

### Recompensas
- Reconocimiento en README.md
- Acceso a features beta
- Recomendaciones profesionales
- Networking con otros desarrolladores

## 📞 Contacto

Para preguntas sobre contribución:

- **Email**: kelvin8bp@gmail.com
- **GitHub Issues**: Para discusiones técnicas
- **LinkedIn**: Para networking profesional

---

**¡Gracias por contribuir a TranscriptorPro! 🚀**

*Juntos hacemos que la transcripción de video sea más accesible para todos.*
