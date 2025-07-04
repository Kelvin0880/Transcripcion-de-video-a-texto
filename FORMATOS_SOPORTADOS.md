# 📁 FORMATOS SOPORTADOS - TranscriptorPro

## 🎬 **Formatos de Video Soportados:**
- **MP4** (.mp4) - Formato más común y recomendado
- **AVI** (.avi) - Formato clásico compatible
- **MOV** (.mov) - Formato QuickTime de Apple
- **MKV** (.mkv) - Formato Matroska de alta calidad
- **WebM** (.webm) - Formato web optimizado
- **FLV** (.flv) - Formato Flash Video
- **WMV** (.wmv) - Formato Windows Media Video
- **M4V** (.m4v) - Formato iTunes/Apple
- **3GP** (.3gp) - Formato móvil

## 🎵 **Formatos de Audio Soportados:**
- **MP3** (.mp3) - Formato más común y recomendado
- **WAV** (.wav) - Formato sin compresión de alta calidad
- **FLAC** (.flac) - Formato sin pérdidas
- **M4A** (.m4a) - Formato Apple Audio
- **AAC** (.aac) - Formato de audio avanzado
- **OGG** (.ogg) - Formato open source
- **WMA** (.wma) - Formato Windows Media Audio

## ⚙️ **Especificaciones Técnicas:**
- **Tamaño máximo:** 100MB por archivo
- **Duración máxima:** Sin límite específico
- **Calidad recomendada:** 16kHz o superior para mejores resultados
- **Canales:** Mono o estéreo
- **Bitrate:** Mínimo 64kbps recomendado

## 🔧 **Detección de Formatos:**
La aplicación utiliza dos métodos para validar archivos:

### 1. **Validación por MIME Type:**
```typescript
// Tipos MIME soportados
'video/mp4', 'video/avi', 'video/mov', 'video/mkv',
'video/webm', 'video/x-msvideo', 'video/quicktime',
'audio/mpeg', 'audio/wav', 'audio/flac', 'audio/m4a',
'audio/aac', 'audio/ogg', 'application/octet-stream'
```

### 2. **Validación por Extensión:**
```typescript
// Extensiones válidas
'.mp4', '.avi', '.mov', '.mkv', '.webm', '.flv', '.wmv',
'.mp3', '.wav', '.flac', '.m4a', '.aac', '.ogg', '.wma'
```

## 🎯 **Recomendaciones:**
1. **Para mejor calidad:** Use WAV o FLAC para audio
2. **Para compatibilidad:** Use MP4 para video y MP3 para audio
3. **Para eficiencia:** Comprima archivos grandes antes de subir
4. **Para velocidad:** Use formatos optimizados como WebM

## ⚠️ **Limitaciones:**
- OpenAI Whisper tiene un límite de 25MB por archivo
- Archivos muy largos pueden tardar más en procesarse
- La calidad del audio afecta la precisión de la transcripción

## 🔄 **Proceso de Validación:**
1. Verifica el tipo MIME del archivo
2. Si no es específico, verifica la extensión
3. Valida el tamaño (máximo 100MB)
4. Procesa con OpenAI Whisper
5. Retorna transcripción con timestamps opcionales

¡Tu aplicación TranscriptorPro soporta una amplia gama de formatos para máxima compatibilidad!
