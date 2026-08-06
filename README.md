# ✦ VESTIGIO

Una experiencia web tipo ARG (Alternate Reality Game) inspirada conceptualmente en Cicada 3301, completamente original y diseñada para ser accesible sin conocimientos técnicos.

**Duración:** 2-4 horas  
**Plataforma:** Principalmente iPhone (totalmente responsive)  
**Dificultad:** Media-Alta (requiere lógica, observación, deducción)

---

## 🎮 La Experiencia

VESTIGIO es un viaje transformativo en 4 niveles que explora la orientación, la esencia, la forma y finalmente la experiencia.

Cada nivel es un misterio que debes resolver usando:
- Razonamiento abstracto
- Observación cuidadosa
- Conocimiento de símbolos y patrones
- Occasionally, ayuda de una IA

### Los 4 Niveles

#### **Nivel 1: La Orientación** 🧭
- **Duración:** 20-30 minutos
- **Tema:** Navegación y dirección
- **Mecánica:** Brújula, ángulos, cifrado César
- **Solución:** ROSA NO ES EL FINAL
- **Clave desbloquea:** DESVÍO

#### **Nivel 2: La Esencia** 🔮
- **Duración:** 45 minutos
- **Tema:** Autoconocimiento
- **Mecánica:** 10 matrices tipo WAIS + sistema de cifrado de libro
- **Solución:** JUST MOI
- **Generar:** Secuencia numérica para siguiente nivel

#### **Nivel 3: La Forma** 🧩
- **Duración:** 45 minutos
- **Tema:** Restauración
- **Mecánica:** Puzzle interactivo de 36 piezas (Kiwi)
- **Características:** Rotación libre, marcas ocultas, código generado
- **Recompensa:** Figurita 3D del perro Kiwi

#### **Nivel 4: La Experiencia** ⛰️
- **Duración:** 15-20 minutos
- **Tema:** Revelación final
- **Mecánica:** Cinematográfica
- **Mensaje:** Invitación a experiencia real

---

## 🏗️ Arquitectura Técnica

### Sistemas Principales

```
VestigigoCore (Orquestador Central)
├── MatrixEngine (Puzzle sistema WAIS)
├── BookCipherEngine (Cifrado de libro)
├── PuzzleEngine (Puzzle interactivo)
├── LevelIntegrationSystem (Conexión de niveles)
├── CinematicSystem (Transiciones)
├── AchievementsSystem (Logros)
└── VestigigoStorage (Persistencia)
```

### Tecnologías

- **Frontend:** Vanilla JavaScript (sin dependencias)
- **Persistencia:** localStorage
- **Rendering:** SVG procedural
- **Animaciones:** CSS3 + JavaScript
- **Almacenamiento:** 100% client-side

---

## 📁 Estructura de Carpetas

```
vestigio/
├── index.html                 # Punto de entrada
├── config/
│   ├── matrices.js            # Datos de 10 matrices
│   ├── cuaderno-pages.js      # 12 páginas del libro
│   ├── book.js                # Config del Cuaderno
│   └── experience-config.js   # Config general
├── css/
│   ├── main.css               # Estilos principales
│   └── animations.css         # Animaciones
├── js/
│   ├── vestigio-core.js       # Orquestador central
│   ├── level-integration.js   # Sistema de niveles
│   ├── cinematic-system.js    # Transiciones
│   ├── achievements-system.js # Logros
│   ├── svg-generator.js       # Generador SVG
│   ├── matrices/
│   │   ├── matrix-engine.js
│   │   ├── matrix-renderer.js
│   │   └── matrix-storage.js
│   ├── book/
│   │   ├── book-engine.js
│   │   ├── book-cipher.js
│   │   └── book-ui.js
│   ├── puzzle/
│   │   └── puzzle-engine.js
│   ├── app.js                 # Script principal
│   └── storage.js             # Persistencia
├── assets/
│   ├── images/                # SVG generados
│   ├── photos/                # Fotografías
│   ├── dossier/               # Expediente 214
│   ├── documents/             # Documentos
│   └── audio/                 # Sonidos ambientes
└── pages/
    ├── archive.html
    └── book/                  # 12 páginas del Cuaderno
```

---

## 🚀 Cómo Comenzar

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/gtrzzz/vestigio.git
cd vestigio
```

2. Sirve localmente:
```bash
python3 -m http.server 8000
# o
npx http-server
```

3. Abre en tu navegador:
```
http://localhost:8000
```

### En iPhone

1. Abre `index.html` en Safari
2. Toca el ícono de compartir
3. Selecciona "Agregar a pantalla de inicio"

---

## 🔑 Cómo Jugar

### Progresión de Claves

```
Nivel 1
    ↓
Resultado: ROSA NO ES EL FINAL
Clave: DESVÍO
    ↓ (requerida para Nivel 2)
Nivel 2: Matrices
    ↓
Genera: Secuencia numérica (ej: 2413142312)
    ↓ (requerida para Nivel 3)
Nivel 3: Puzzle
    ↓
Código oculto generado
    ↓ (requerida para Nivel 4)
Nivel 4: Experiencia
    ↓
REVELACIÓN FINAL
```

### Sistema de Cifrado de Libro

1. Resuelve las 10 matrices
2. Tu secuencia de respuestas se convierte en coordenadas
3. Las coordenadas apuntan a palabras en el Cuaderno de la Deriva
4. Descifra el mensaje oculto

---

## 🎨 Estética

Inspiración visual:
- Apple & Nothing design
- Interfaces de IA modernas
- Películas: Interstellar, Arrival, Dark, Annihilation
- Editoriales modernas y limpias

**Sin:**
- Estética hacker
- Pantallas verdes
- Código falso
- Anything that's not elegant

---

## 🏆 Sistemas de Progresión

### Achievements (8 total)
- El Primer Paso
- Conócete a Ti Mismo
- Reconstruir la Totalidad
- La Experiencia
- Mente Afilada
- Contra Reloj
- Investigador
- Maestro del Cifrado

### Milestones
- Nuevo Camino (Nivel 1)
- Autoconocimiento (Nivel 2)
- Restauración (Nivel 3)
- Transformación (Nivel 4)

### Easter Eggs
- Mensaje Oculto
- El Símbolo Perdido
- Modo Desarrollador

---

## 📱 Optimización Móvil

- Touch-friendly UI
- Viewport meta tags
- iOS safe-area support
- Gesture recognition
- Orientación portrait/landscape
- Performance optimizado

---

## 🔐 Privacidad

- 100% local (sin servidor)
- Sin rastreo
- Sin cookies de terceros
- Todos los datos en localStorage del usuario

---

## 🛠️ Desarrollo

### Extensibilidad

Todos los sistemas son modularizados y pueden extenderse:

```javascript
// Crear nuevo nivel
const myLevel = app.levels.createLevel(5, {
  name: 'Mi Nivel',
  difficulty: 3
});

// Añadir logro
app.achievements.unlockAchievement('my_custom_achievement');

// Trigger transición
await app.cinematic.levelTransition(3, 4);
```

### Testing

```bash
# Abrir consola y:
window.vestigio.reset()
window.vestigio.getGameStats()
```

---

## 📄 Licencia

VESTIGIO es una creación original. Todos los derechos reservados.

---

## 👤 Autor

Creado por **Iván** como un regalo especial para **Ania**.

Una experiencia que comienza con una brújula y termina con una transformación.

---

## 🌟 Notas Finales

> *Vestigio significa huella. Un rastro de lo que fue y lo que será.*
>
> Este proyecto no es solo un juego.
> Es un viaje de autoconocimiento.
> Es una invitación a la aventura.
> Es un regalo del corazón.

---

**Para empezar tu viaje: abre `index.html` en tu navegador.**

✦ El camino comienza aquí. ✦
