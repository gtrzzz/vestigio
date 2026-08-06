# 🚀 VESTIGIO - Guía de Despliegue

## Despliegue en GitHub Pages

VESTIGIO está listo para ser desplegado en **GitHub Pages** sin configuración adicional.

### Pasos para Desplegar

1. **Habilitar GitHub Pages en tu repositorio:**
   - Ve a `Settings` → `Pages`
   - En "Source", selecciona `main` branch
   - Selecciona `/root` como directorio
   - Guarda

2. **Tu sitio estará disponible en:**
   ```
   https://gtrzzz.github.io/vestigio/
   ```

3. **Para acceder desde iPhone:**
   - Abre la URL en Safari
   - Toca el ícono de compartir
   - Selecciona "Agregar a pantalla de inicio"
   - Se crea como app web nativa

### Características de Despliegue

✅ **Sin servidor requerido** - 100% static site  
✅ **Sin base de datos** - localStorage solo  
✅ **Sin CDN requerido** - Todos los assets locales  
✅ **Sin build process** - Deploy directo  
✅ **HTTPS automático** - GitHub Pages proporciona SSL  

---

## Despliegue Local

### Desarrollo

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server

# Ruby
ruby -run -ehttpd . -p8000
```

Abre: `http://localhost:8000`

### Testing en iPhone

```bash
# Descubre tu IP local
ifconfig | grep "inet " | grep -v 127.0.0.1

# En iPhone, accede a:
http://[tu-ip]:8000
```

---

## Personalización Antes de Desplegar

### 1. Cambiar Receptor (Por Defecto: Ania)

En `config/cuaderno-pages.js`:
```javascript
// Página 12
{
  id: 12,
  content: "Para [NOMBRE] con amor. Que este viaje..."
}
```

### 2. Cambiar Ubicación Final

En `js/level-integration.js`:
```javascript
coordinates: {
  latitude: 36.8,
  longitude: -3.6,
  elevation: 3478,
  place: 'Mulhacén, Sierra Nevada'
}
```

### 3. Personalizar Colores

En `css/main.css`:
```css
:root {
  --color-accent: #3b82f6; /* Cambiar a tu color */
}
```

### 4. Añadir Sonidos

Coloca archivos MP3 en `assets/audio/`:
- `level1-ambient.mp3`
- `level2-ambient.mp3`
- `level3-ambient.mp3`
- `level4-ambient.mp3`

Actualiza `config/experience-config.js`:
```javascript
assets: {
  audio: 'assets/audio/level1-ambient.mp3'
}
```

---

## Optimización Pre-Despliegue

### 1. Comprimir Imágenes

```bash
# Para PNGs
optipng -o2 assets/images/*.png

# Para JPGs
jpegoptim --max=85 assets/photos/*.jpg
```

### 2. Minificar CSS/JS (Opcional)

```bash
# Instalar terser
npm install -g terser

# Minificar
terser js/vestigio-core.js -o js/vestigio-core.min.js
```

### 3. Validar HTML

```bash
npm install -g html-validate
html-validate index.html
```

---

## Monitoring Post-Despliegue

### 1. Verificar Performance

```bash
# Lighthouse CLI
npm install -g @lhci/cli@*
lhci autorun
```

### 2. Testing en Dispositivos Reales

**iPhone:**
- Safari: inspecciona con Web Inspector
- Performance: comprueba en iPhone 8+ y iPhone 14+

**Android:**
- Chrome DevTools
- Performance en Pixel 4+ y Samsung S21+

### 3. Google Analytics (Opcional)

Añade en el `<head>` del `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## Troubleshooting

### "Blank screen en iPhone"

**Solución:**
- Habilita "Usar HTTPS"
- Clearea Safari cache: Settings → Privacy → Clear History
- Reinicia Safari

### "localStorage no funciona"

**Solución:**
- Verifica modo privado (desactívalo)
- Aumenta cuota de almacenamiento en `js/storage.js`

### "Imágenes no cargan"

**Solución:**
- Verifica rutas relativas
- Comprueba que los archivos existen en `assets/`
- Check CORS headers (GitHub Pages no requiere)

### "Transiciones lentas"

**Solución:**
- Reduce duración en `js/cinematic-system.js`
- Desactiva animaciones innecesarias
- Comprime imágenes

---

## Checklist de Despliegue

- [ ] Verificar que todos los enlaces funcionan
- [ ] Test en iPhone (mínimo iOS 14)
- [ ] Test en Android (mínimo Android 10)
- [ ] Verificar localStorage
- [ ] Test todas las transiciones
- [ ] Comprobar que los audios cargan
- [ ] Verificar tiempos de carga
- [ ] Test offline (service worker en desarrollo)
- [ ] Validar HTML/CSS
- [ ] Compactar imágenes
- [ ] Actualizar README con URL final
- [ ] Añadir a GitHub description
- [ ] Documentar endpoints custom
- [ ] Backup de datos antes de deploy

---

## Después del Despliegue

### Recolectar Feedback

Crea un formulario simple para feedback:
```javascript
// En js/app.js
function openFeedbackForm() {
  const feedback = prompt('¿Qué te pareció la experiencia?');
  // Guardar en analytics o email
}
```

### Actualizaciones Futuras

El proyecto está estructurado para permitir:
- ✅ Nuevos niveles (copiar estructura existente)
- ✅ Nuevos enigmas (añadir a `config/matrices.js`)
- ✅ Nuevos logros (extender `achievements-system.js`)
- ✅ Temas personalizados (CSS variables)

---

## Recursos Útiles

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Mobile Web Best Practices](https://web.dev/mobile-web-specialist/)
- [Web Performance](https://web.dev/performance/)
- [Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Última actualización:** Agosto 2026  
**Estado:** Listo para producción ✓
