# 🛠️ VESTIGIO - Guía de Desarrollo

Extensibilidad y personalización de VESTIGIO.

---

## Estructura Modular

Cada sistema es completamente independiente:

```
VestigigoCore (Orquestador)
├── MatrixEngine (Puzzle WAIS)
├── BookCipherEngine (Cifrado)
├── PuzzleEngine (Jigsaw)
├── LevelIntegrationSystem (Progresión)
├── CinematicSystem (Transiciones)
└── AchievementsSystem (Logros)
```

---

## Crear Nuevo Nivel

### 1. Añadir Datos

En `config/experience-config.js`:

```javascript
LEVELS[5] = {
  id: 5,
  name: 'Mi Nivel Custom',
  description: 'Descripción',
  duration: '30-45 minutos',
  mechanics: 'Tipo de mecánica',
  narrative: 'Parte narrativa'
};
```

### 2. Crear Vista HTML

En `index.html`, añadir sección:

```html
<section id="level5View" class="view">
  <div class="card">
    <h1>Mi Nivel</h1>
    <p>Descripción</p>
    <button class="primary" id="level5Button">Comenzar</button>
  </div>
</section>
```

### 3. Implementar Lógica

En `js/app.js`:

```javascript
document.getElementById('level5Button').addEventListener('click', () => {
  // Tu lógica aquí
  app.levels.completeLevel(5, 'SOLUTION');
  showView('level6View');
});
```

---

## Crear Nuevo Logro

En `js/achievements-system.js`:

```javascript
this.achievements.push({
  id: 'my_custom_achievement',
  title: 'Título del Logro',
  description: 'Descripción',
  points: 100,
  icon: '🎯',
  unlocked: false,
  rarity: 'rare' // common, rare, epic, legendary
});
```

Desbloquea con:

```javascript
app.achievements.unlockAchievement('my_custom_achievement');
```

---

## Crear Nuevo Enigma de Matrices

En `config/matrices.js`:

```javascript
{
  "id": "m11",
  "title": "Tu Enigma",
  "difficulty": 2,
  "rule": "rotation",
  "prompt": "¿Cuál es el siguiente patrón?",
  "grid": [
    { "shape": "circle", "rotation": 0 },
    { "shape": "circle", "rotation": 90 },
    // ... 9 elementos total
    null // última es la respuesta
  ],
  "options": [
    { "shape": "circle", "rotation": 180 },
    // ... 6-8 opciones
  ],
  "correct": 0, // índice de respuesta correcta
  "symbol": "✕"
}
```

---

## Crear Transición Customizada

Extender `CinematicSystem`:

```javascript
class CinematicSystem {
  async myCustomTransition() {
    return new Promise(resolve => {
      const element = document.createElement('div');
      // Tu lógica de transición
      element.addEventListener('animationend', () => {
        element.remove();
        resolve();
      });
      document.body.appendChild(element);
    });
  }
}
```

Usar:

```javascript
await app.cinematic.myCustomTransition();
```

---

## Personalizar Estética

### Colores Globales

En `css/main.css`:

```css
:root {
  --color-primary: #0a0e27;      /* Fondo principal */
  --color-secondary: #1a1f3a;    /* Fondo secundario */
  --color-accent: #3b82f6;       /* Acento (botones) */
  --color-text: #e8e8f0;         /* Texto principal */
  --color-text-muted: #8b92a0;   /* Texto secundario */
}
```

### Fuentes

```css
body {
  font-family: 'Tu Fuente', -apple-system, sans-serif;
}
```

### Radiuses

```css
:root {
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}
```

---

## Sistemas de Eventos

### Escuchar Eventos

```javascript
// Nivel completado
window.addEventListener('vestigio:level_complete', (e) => {
  console.log('Nivel:', e.detail.level);
});

// Logro desbloqueado
window.addEventListener('vestigio:achievement_unlocked', (e) => {
  console.log('Logro:', e.detail.title);
});

// Hito alcanzado
window.addEventListener('vestigio:milestone_reached', (e) => {
  console.log('Hito:', e.detail.message);
});

// Timer de matriz
window.addEventListener('matrixTimer', (e) => {
  console.log('Tiempo:', e.detail.elapsed);
});
```

### Disparar Eventos Custom

```javascript
app.core.dispatchEvent('my_event', { data: 'valor' });
```

---

## Almacenamiento Custom

### Guardar Datos

```javascript
const storage = new VestigigoStorage();
storage.savePlayerData({
  customField: 'valor'
});
```

### Cargar Datos

```javascript
const data = storage.loadPlayerData();
console.log(data.customField);
```

### Limpiar Almacenamiento

```javascript
storage.clearAll();
```

---

## API del Núcleo

### VestigigoCore

```javascript
// Obtener estado
app.core.init()
app.core.getCurrentLevelConfig()
app.core.advanceLevel()
app.core.completedCurrentLevel('solution')
app.core.unlock('item_name')
app.core.getGameStats()
app.core.reset()
```

### MatrixEngine

```javascript
const matrix = new MatrixEngine(matrices);
matrix.init()
matrix.getCurrentMatrix()
matrix.submitAnswer(optionIndex) // Returns completion status
matrix.generateSequence()
matrix.getProgress()
matrix.getStats()
matrix.reset()
```

### PuzzleEngine

```javascript
const puzzle = new PuzzleEngine(imageData, gridSize, hiddenMarks);
puzzle.movePiece(pieceId, position)
puzzle.rotatePiece(pieceId, degrees)
puzzle.flipPiece(pieceId)
puzzle.checkCompletion()
puzzle.generateCode()
puzzle.getProgress()
```

### BookCipherEngine

```javascript
const cipher = new BookCipherEngine(bookPages, matrixSequence);
cipher.generateCoordinates()
cipher.decodeMessage(coordinates)
cipher.getWordFromBook(page, position)
cipher.validateSolution(proposedSolution)
cipher.getHint(level)
```

---

## Testing

### Habilitar Modo Debug

```javascript
// En consola del navegador
window.vestigio = app;

// Explorar
window.vestigio.core.getGameStats()
window.vestigio.achievements.getStats()
window.vestigio.levels.getProgression()
```

### Speedrun de Testing

```javascript
// En consola
app.core.advance Level()
app.levels.completeLevel(1, 'TEST')
app.cinematic.fadeTransition(100)
app.achievements.unlockAchievement('test')
```

### Logging

Añade en cualquier sistema:

```javascript
console.log('🎮 VESTIGIO DEBUG:', { 
  level: app.core.currentLevel,
  progress: app.core.getGameStats()
});
```

---

## Performance Tips

1. **Lazy load de assets:**
```javascript
const loadAsset = (path) => {
  const img = new Image();
  img.src = path;
  return img;
};
```

2. **Debounce de eventos:**
```javascript
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
```

3. **Memoization:**
```javascript
const memoize = (fn) => {
  const cache = {};
  return (arg) => cache[arg] ?? (cache[arg] = fn(arg));
};
```

---

## Accesibilidad

### ARIA Labels

```html
<button aria-label="Descripción del botón">Ícono</button>
```

### Keyboard Navigation

```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { /* Acción */ }
  if (e.key === 'Escape') { /* Cerrar */ }
});
```

### Color Contrast

- Mantén ratio 4.5:1 para texto normal
- Testea con WebAIM Contrast Checker

---

## Git Workflow

```bash
# Crear rama
git checkout -b feature/my-feature

# Hacer cambios y commits
git add .
git commit -m "Add: description"

# Push
git push origin feature/my-feature

# PR y merge a main
```

---

## Recursos para Desarrolladores

- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev](https://web.dev/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Can I Use](https://caniuse.com/)
- [WebAIM](https://webaim.org/)

---

**¡Happy Coding! 🚀**
