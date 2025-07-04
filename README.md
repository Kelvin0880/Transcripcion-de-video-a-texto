# 🎬 TranscriptorPro - Sistema Avanzado de Transcripción de Video

![TranscriptorPro](https://img.shields.io/badge/TranscriptorPro-v1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.5-blue)

## 🚀 Descripción

**TranscriptorPro** es una aplicación web de última generación que convierte videos a texto con una precisión extraordinaria usando inteligencia artificial avanzada. Diseñada con una interfaz moderna y responsiva, ofrece funcionalidades premium como traducción automática, marcas de tiempo, y modo protegido.

### ✨ Características Principales

- 🎯 **Transcripción Ultra-Precisa**: Convierte audio de videos a texto con 95%+ de precisión
- 🌍 **Traducción Automática**: Traduce transcripciones a múltiples idiomas instantáneamente
- ⏱️ **Marcas de Tiempo**: Incluye timestamps precisos para cada segmento
- 🔒 **Modo Protegido**: Evita la copia no autorizada del contenido
- 📱 **Diseño Responsivo**: Funciona perfectamente en dispositivos móviles, tablets y desktop
- 🎨 **Interfaz Moderna**: Diseño elegante con animaciones fluidas y efectos visuales
- ⚡ **Súper Rápido**: Procesamiento optimizado para máxima velocidad
- 🔐 **100% Seguro**: Privacidad y seguridad garantizadas
- 📊 **Estadísticas Detalladas**: Análisis completo de confianza, duración, palabras, etc.

### 🎯 Idiomas Soportados

- 🇪🇸 **Español**
- 🇺🇸 **Inglés**
- 🇫🇷 **Francés**
- 🇩🇪 **Alemán**
- 🇮🇹 **Italiano**
- 🇧🇷 **Português**
- 🇷🇺 **Русский**
- 🇯🇵 **日本語**
- 🇰🇷 **한국어**
- 🇨🇳 **中文**
- 🇸🇦 **العربية**
- 🇮🇳 **हिन्दी**

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 15.3.5** - Framework React con SSR y optimizaciones
- **React 19.1.0** - Biblioteca de UI con hooks modernos
- **TypeScript 5.2.2** - Tipado estático para mejor desarrollo
- **Tailwind CSS 3.3.5** - Framework CSS utilitario
- **Framer Motion 10.16.0** - Animaciones fluidas y transiciones

### Backend & APIs
- **Next.js API Routes** - Endpoints optimizados
- **OpenAI Whisper** - Transcripción de audio de alta calidad
- **Google Translate API** - Traducción automática
- **Multer** - Manejo de archivos multimedia

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento CSS
- **UUID** - Generación de identificadores únicos
- **React Hot Toast** - Notificaciones elegantes
- **React Icons** - Iconos modernos

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18.0.0 o superior
- npm o yarn
- Cuenta en OpenAI (para transcripción real)
- Cuenta en Google Cloud (para traducción real)

### Instalación Local

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/transcriptor-pro.git
cd transcriptor-pro
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus claves API:
```env
OPENAI_API_KEY=tu_clave_openai_aqui
GOOGLE_TRANSLATE_API_KEY=tu_clave_google_aqui
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

## 🌐 Despliegue en Render.com

### Configuración Rápida

1. **Crear cuenta en Render.com**
   - Visita [render.com](https://render.com)
   - Crea una cuenta gratuita

2. **Conectar repositorio**
   - Haz clic en "New +"
   - Selecciona "Web Service"
   - Conecta tu repositorio GitHub

3. **Configurar servicio**
   - **Name**: transcriptor-pro
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

4. **Variables de entorno**
   ```
   NODE_ENV=production
   NEXT_PUBLIC_SITE_URL=https://tu-app.onrender.com
   OPENAI_API_KEY=tu_clave_openai
   GOOGLE_TRANSLATE_API_KEY=tu_clave_google
   ```

5. **Desplegar**
   - Haz clic en "Create Web Service"
   - Espera 2-5 minutos para el build
   - ¡Tu app estará disponible!

### Características del Plan Gratuito
- ✅ 750 horas/mes de tiempo de ejecución
- ✅ Certificados SSL automáticos
- ✅ Dominios personalizados
- ✅ Despliegues automáticos desde Git
- ✅ Escalado automático básico

## 📖 Guía de Uso

### 1. Subir Video
- Arrastra y suelta tu video en la zona de carga
- O haz clic para seleccionar un archivo
- Formatos soportados: MP4, AVI, MOV, MKV
- Tamaño máximo: 100MB
- Duración máxima: 10 minutos

### 2. Configurar Opciones
- **Idioma del video**: Selecciona el idioma hablado
- **Idioma de traducción**: Elige el idioma de destino
- **Marcas de tiempo**: Activa/desactiva timestamps
- **Modo protegido**: Evita copia del texto

### 3. Iniciar Transcripción
- Haz clic en "Iniciar Transcripción"
- Observa el progreso en tiempo real
- Espera la transcripción completa

### 4. Obtener Resultados
- **Transcripción original**: Texto en idioma original
- **Traducción**: Texto traducido (si se configuró)
- **Marcas de tiempo**: Timestamps detallados
- **Estadísticas**: Confianza, duración, palabras, etc.

### 5. Exportar Contenido
- **Copiar texto**: Copia al portapapeles (si no está protegido)
- **Descargar archivo**: Descarga archivo .txt completo
- **Compartir**: Comparte resultados

## 🔧 Configuración Avanzada

### Variables de Entorno

```env
# Requeridas
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com

# APIs (opcionales para desarrollo)
OPENAI_API_KEY=sk-...
GOOGLE_TRANSLATE_API_KEY=AIza...

# Configuración opcional
MAX_FILE_SIZE=104857600  # 100MB
MAX_DURATION=600         # 10 minutos
RATE_LIMIT=10           # Requests por minuto
```

### Personalización

#### Cambiar Colores
Edita `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#tu-color-primario',
        secondary: '#tu-color-secundario',
      }
    }
  }
}
```

#### Modificar Límites
Edita `src/app/api/transcribe/route.ts`:
```typescript
// Cambiar límite de tamaño
if (file.size > 200 * 1024 * 1024) { // 200MB
  // ...
}
```

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

### Reportar Bugs

Si encuentras un bug:
1. Verifica que no haya sido reportado antes
2. Crea un issue con:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots si es necesario

### Solicitar Features

Para nuevas funcionalidades:
1. Abre un issue con la etiqueta "enhancement"
2. Describe la funcionalidad detalladamente
3. Explica por qué sería útil
4. Proporciona mockups si es posible

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Desarrollador

**Kelvin Jose Piña Gomez**
- 👨‍💻 Ingeniero en Sistemas
- 📧 Email: [kelvin8bp@gmail.com](mailto:kelvin8bp@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/kelvin-jose-piña-9a5249373](https://www.linkedin.com/in/kelvin-jose-pi%C3%B1a-9a5249373/)
- 🐱 GitHub: [github.com/Kelvin0880](https://github.com/Kelvin0880)

---

### 🌟 Agradecimientos

- OpenAI por la API de Whisper
- Google por la API de Translate
- Vercel por Next.js
- Tailwind CSS por el framework
- Framer Motion por las animaciones
- Render.com por el hosting gratuito

### 🔥 Características Futuras

- [ ] Soporte para más formatos de video
- [ ] Transcripción en tiempo real
- [ ] Integración con YouTube
- [ ] API pública para desarrolladores
- [ ] Aplicación móvil nativa
- [ ] Transcripción de múltiples idiomas simultáneamente
- [ ] Análisis de sentimientos
- [ ] Resumen automático de contenido

### 💡 Soporte

Si necesitas ayuda:
1. Consulta la documentación
2. Busca en issues existentes
3. Crea un nuevo issue
4. Contacta al desarrollador

---

**⭐ Si te gusta este proyecto, no olvides darle una estrella en GitHub!**

Made with ❤️ by Kelvin Jose Piña Gomez
