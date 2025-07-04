# 🚀 Guía de Instalación - TranscriptorPro

## 📋 Requisitos Previos

Antes de instalar TranscriptorPro, asegúrate de tener:

### Requisitos del Sistema
- **Node.js**: Versión 18.0.0 o superior
- **npm**: Versión 9.0.0 o superior (incluido con Node.js)
- **Git**: Para clonar el repositorio

### Cuentas de Servicios (Opcional)
- **OpenAI**: Para transcripción real con Whisper API
- **Google Cloud**: Para traducción automática
- **Render.com**: Para despliegue gratuito

## 🔧 Instalación Local

### 1. Verificar Requisitos

```bash
# Verificar versión de Node.js
node --version

# Verificar versión de npm
npm --version

# Verificar Git
git --version
```

### 2. Clonar el Repositorio

```bash
# Clonar desde GitHub
git clone https://github.com/tu-usuario/transcriptor-pro.git

# Navegar al directorio
cd transcriptor-pro
```

### 3. Instalar Dependencias

```bash
# Instalar todas las dependencias
npm install

# O si prefieres usar yarn
yarn install
```

### 4. Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar el archivo con tus configuraciones
# Windows: notepad .env.local
# macOS/Linux: nano .env.local
```

**Configuración básica** (`.env.local`):
```env
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
OPENAI_API_KEY=tu-clave-openai-aqui
GOOGLE_TRANSLATE_API_KEY=tu-clave-google-aqui
```

### 5. Ejecutar en Modo Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# El sitio estará disponible en:
# http://localhost:3000
```

## 🎯 Configuración de APIs

### OpenAI API (Transcripción Real)

1. **Crear cuenta en OpenAI**
   - Visita: https://platform.openai.com/
   - Crea una cuenta o inicia sesión

2. **Obtener API Key**
   - Ve a: https://platform.openai.com/api-keys
   - Crea una nueva clave API
   - Copia la clave generada

3. **Configurar en .env.local**
   ```env
   OPENAI_API_KEY=sk-tu-clave-aqui
   ```

### Google Translate API (Traducción Real)

1. **Crear proyecto en Google Cloud**
   - Visita: https://console.cloud.google.com/
   - Crea un nuevo proyecto

2. **Habilitar API**
   - Ve a: APIs & Services > Library
   - Busca "Cloud Translation API"
   - Haz clic en "Enable"

3. **Crear credenciales**
   - Ve a: APIs & Services > Credentials
   - Crea una clave API
   - Copia la clave generada

4. **Configurar en .env.local**
   ```env
   GOOGLE_TRANSLATE_API_KEY=tu-clave-google-aqui
   ```

## 🌐 Despliegue en Render.com

### Preparación del Repositorio

1. **Subir código a GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

### Configuración en Render.com

1. **Crear cuenta**
   - Visita: https://render.com
   - Regístrate con GitHub

2. **Crear Web Service**
   - Haz clic en "New +"
   - Selecciona "Web Service"
   - Conecta tu repositorio

3. **Configurar Servicio**
   ```
   Name: transcriptor-pro
   Environment: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Variables de Entorno**
   ```
   NODE_ENV=production
   NEXT_PUBLIC_SITE_URL=https://tu-app.onrender.com
   OPENAI_API_KEY=tu-clave-openai
   GOOGLE_TRANSLATE_API_KEY=tu-clave-google
   ```

5. **Desplegar**
   - Haz clic en "Create Web Service"
   - Espera 2-5 minutos para el despliegue

## 🔍 Verificación de la Instalación

### Verificar Funcionamiento Local

1. **Página principal carga correctamente**
   - Abre: http://localhost:3000
   - Verifica que el diseño se muestre correctamente

2. **Subir archivo de prueba**
   - Arrastra un video pequeño
   - Verifica que se muestre la vista previa

3. **Probar transcripción**
   - Haz clic en "Iniciar Transcripción"
   - Verifica que el proceso funcione

### Verificar APIs (Opcional)

Si configuraste las APIs reales:

1. **OpenAI API**
   ```bash
   # Probar en terminal
   curl -X POST "http://localhost:3000/api/transcribe" \
     -F "video=@test-video.mp4" \
     -F "language=es"
   ```

2. **Google Translate API**
   ```bash
   # Probar traducción
   curl -X POST "http://localhost:3000/api/translate" \
     -H "Content-Type: application/json" \
     -d '{"text":"Hola mundo","from":"es","to":"en"}'
   ```

## 🛠️ Solución de Problemas

### Problemas Comunes

#### Error: "Module not found"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

#### Error: "Port already in use"
```bash
# Cambiar puerto
PORT=3001 npm run dev
```

#### Error: "API Key invalid"
```bash
# Verificar variables de entorno
echo $OPENAI_API_KEY
echo $GOOGLE_TRANSLATE_API_KEY
```

### Logs de Depuración

```bash
# Ver logs detallados
DEBUG=* npm run dev

# Solo logs de Next.js
DEBUG=next:* npm run dev
```

## 🔧 Configuración Avanzada

### Personalización del Puerto

```bash
# Cambiar puerto por defecto
PORT=4000 npm run dev
```

### Configuración de Proxy (Opcional)

Si estás detrás de un proxy corporativo:

```bash
# Configurar proxy npm
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

### Configuración de SSL Local (Opcional)

Para HTTPS en desarrollo:

```bash
# Generar certificados
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

## 📊 Monitoreo y Métricas

### Verificar Rendimiento

```bash
# Análisis de bundle
npm run build
npx @next/bundle-analyzer
```

### Logs de Producción

```bash
# Ver logs en Render.com
# Dashboard > Service > Logs
```

## 🔄 Actualización

### Actualizar Dependencias

```bash
# Verificar actualizaciones
npm outdated

# Actualizar todas las dependencias
npm update

# Actualizar Next.js específicamente
npm install next@latest
```

### Actualizar el Proyecto

```bash
# Obtener últimos cambios
git pull origin main

# Reinstalar dependencias
npm install

# Reiniciar servidor
npm run dev
```

## 🚀 Optimización para Producción

### Build Optimizado

```bash
# Crear build de producción
npm run build

# Probar build localmente
npm start
```

### Análisis de Performance

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun
```

## 📞 Soporte

Si tienes problemas durante la instalación:

1. **Revisa este documento** completamente
2. **Busca en GitHub Issues** problemas similares
3. **Crea un nuevo issue** con detalles específicos
4. **Contacta al desarrollador** en kelvin8bp@gmail.com

---

**✅ ¡Instalación Completada!**

Tu TranscriptorPro debería estar funcionando correctamente. Si encuentras algún problema, no dudes en contactar al desarrollador.

---

Made with ❤️ by Kelvin Jose Piña Gomez
