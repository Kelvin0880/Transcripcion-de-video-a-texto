# 🚀 GUÍA COMPLETA PARA DESPLEGAR EN RENDER.COM

## 📋 Requisitos Previos

✅ **Completado:**
- [x] Código subido a GitHub (repositorio limpio)
- [x] Build exitoso (`npm run build`)
- [x] Aplicación probada localmente
- [x] Variables de entorno configuradas
- [x] Documentación completa

## 🎯 Pasos para Desplegar en Render

### 1. Crear Cuenta en Render.com
1. Ve a [render.com](https://render.com)
2. Regístrate con tu cuenta de GitHub
3. Autoriza el acceso a tus repositorios

### 2. Crear Nuevo Web Service
1. Click en "New +" en el dashboard
2. Selecciona "Web Service"
3. Conecta tu repositorio: `Kelvin0880/Transcripcion-de-video-a-texto`
4. Configura los siguientes campos:

#### Configuración Básica
- **Name**: `transcriptor-pro`
- **Region**: `Ohio (US East)`
- **Branch**: `main`
- **Root Directory**: (dejar vacío)
- **Runtime**: `Node`

#### Build & Deploy
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### 3. Configurar Variables de Entorno

En la sección "Environment Variables" añade:

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://transcriptor-pro.onrender.com
OPENAI_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_MAX_FILE_SIZE=104857600
NEXT_PUBLIC_MAX_DURATION=600
NEXT_PUBLIC_SUPPORTED_FORMATS=mp4,avi,mov,mkv,webm,flv,wmv,m4v,mp3,wav,flac,m4a,aac,ogg
RATE_LIMIT_MAX_REQUESTS=10
RATE_LIMIT_WINDOW_MS=60000
```

### 4. Configuración Avanzada

#### Plan de Hosting
- **Free Tier**: Ideal para pruebas
- **Starter ($7/mes)**: Recomendado para producción
- **Pro ($25/mes)**: Para alta demanda

#### Configuración de Región
- **US East (Ohio)**: Recomendado para mejor rendimiento
- **US West (Oregon)**: Alternativa

### 5. Iniciar Despliegue

1. Click en "Create Web Service"
2. Render comenzará el build automáticamente
3. Monitorea los logs en tiempo real
4. El despliegue toma aproximadamente 2-3 minutos

## 🔧 Configuración Post-Despliegue

### 1. Configurar Dominio Personalizado (Opcional)
1. Ve a Settings → Custom Domains
2. Añade tu dominio personalizado
3. Configura los DNS records

### 2. Configurar HTTPS
✅ **Automático**: Render proporciona SSL gratuito

### 3. Configurar Redirects
```
/* /index.html 200
```

## 📊 Monitoreo y Logs

### Acceder a Logs
1. Ve a tu servicio en Render
2. Click en "Logs"
3. Monitorea errores y performance

### Métricas Disponibles
- CPU Usage
- Memory Usage
- Request Count
- Response Times

## 🚨 Solución de Problemas

### Error: Build Failed
```bash
# Verifica que el build funcione localmente
npm run build

# Si hay errores, revisa:
# - Sintaxis TypeScript
# - Imports/exports
# - Variables de entorno
```

### Error: Start Command Failed
```bash
# Verifica el package.json
"scripts": {
  "start": "next start"
}
```

### Error: Environment Variables
- Revisa que todas las variables estén configuradas
- Verifica el formato (sin espacios extra)
- Asegúrate de que OPENAI_API_KEY sea válida

## 🌐 URLs Importantes

### Desarrollo
- **Local**: `http://localhost:3000`
- **GitHub**: `https://github.com/Kelvin0880/Transcripcion-de-video-a-texto`

### Producción
- **Render**: `https://transcriptor-pro.onrender.com`
- **Dashboard**: `https://dashboard.render.com`

## ✅ Checklist Final

Antes de desplegar, verifica:

- [ ] Código en GitHub actualizado
- [ ] Build local exitoso
- [ ] Variables de entorno configuradas
- [ ] API keys válidas (opcional)
- [ ] Documentación completa
- [ ] Tests pasando

## 🎉 Después del Despliegue

1. **Probar la aplicación**
   - Sube archivos de audio/video
   - Verifica transcripción
   - Prueba análisis de sentimiento

2. **Configurar monitoreo**
   - Alertas de uptime
   - Métricas de performance
   - Logs de errores

3. **Documentar URLs**
   - Actualizar README
   - Compartir con usuarios

---

**Desarrollado por:** Kelvin Jose Piña Gomez  
**Fecha:** 4 de Julio, 2025  
**Versión:** 1.0.0  

🚀 **¡TranscriptorPro listo para producción!**
