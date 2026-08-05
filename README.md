# VESTIGIO — Prototipo estructural · Fase 2

Este proyecto implementa la estructura funcional de la experiencia para Ania, todavía sin los enigmas visuales definitivos.

## Incluido en esta fase

- pantalla inicial narrativa;
- navegación lineal de cuatro niveles;
- respuestas normalizadas;
- respuestas alternativas con ofuscación ligera;
- persistencia mediante `localStorage`;
- registro de intentos;
- códigos de pista;
- revelaciones provisionales;
- Cuaderno de la Deriva;
- exportación e importación del progreso en JSON;
- modo organizador;
- soporte básico para iPhone, iPad y escritorio;
- imagen de referencia de Kiwi;
- viaje final configurable y sin destino cerrado.

## Abrir con Live Server

1. Abre la carpeta en Visual Studio Code.
2. Instala la extensión **Live Server**.
3. Pulsa con el botón derecho sobre `index.html`.
4. Elige **Open with Live Server**.
5. Abre la dirección resultante desde el iPhone si ambos dispositivos están en la misma red.

## Abrir con Python

Desde la carpeta del proyecto:

```bash
python -m http.server 8000
```

Después abre:

```text
http://localhost:8000
```

Para acceder desde un iPhone de la misma red, utiliza la IP local del ordenador:

```text
http://IP_DEL_ORDENADOR:8000
```

## Despliegue estático

Puede publicarse directamente en GitHub Pages, Netlify o Vercel. No necesita compilación, Node.js, backend ni base de datos.

## Modo Organizador

- Mantén pulsado el símbolo durante 4 segundos, o tócalo 5 veces.
- También puedes abrir `index.html?organizer=true`.
- Contraseña provisional: `280625`.

La contraseña está ofuscada, no protegida de forma real. Cualquier persona con acceso al código puede encontrarla. No guardes datos sensibles.

## Configuración principal

Edita:

```text
/config/experience-config.js
```

Ahí están centralizados:

- nombre de la entidad;
- nombre de Ania;
- fecha de entrega;
- respuestas aceptadas;
- pistas y códigos;
- textos de revelación;
- datos de Kiwi;
- posibilidades provisionales del viaje;
- contraseña del organizador.

## Estado de los niveles

En esta fase las mecánicas visuales de los niveles 1, 2 y 4 son marcadores estructurales. El nivel 3 muestra la fotografía de Kiwi como referencia.

## Pruebas manuales iniciales

- [ ] Safari iPhone en vertical.
- [ ] Safari iPhone en horizontal.
- [ ] Safari iPad.
- [ ] Chrome escritorio.
- [ ] Firefox escritorio.
- [ ] iniciar y recargar;
- [ ] cerrar y reabrir;
- [ ] completar niveles en orden;
- [ ] probar respuestas con mayúsculas, tildes y espacios;
- [ ] desbloquear una pista por código;
- [ ] exportar progreso;
- [ ] reiniciar desde organizador;
- [ ] importar progreso;
- [ ] comprobar modo de movimiento reducido;
- [ ] comprobar funcionamiento sin sonido;
- [ ] probar tras desconectar internet.

## Siguiente fase

La Fase 3 desarrollará la identidad visual definitiva: símbolo, tipografía, atmósfera, transiciones, Cuaderno animado, sistema de iluminación y adaptación móvil refinada.
