/**
 * VESTIGIO - SVG Asset Generator
 * Genera imágenes vectoriales procedurales
 */

class SVGAssetGenerator {
  static createSymbol(name, size = 64) {
    const symbols = {
      circle: `<svg width="${size}" height="${size}" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
      
      diamond: `<svg width="${size}" height="${size}" viewBox="0 0 64 64"><polygon points="32,8 56,32 32,56 8,32" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
      
      triangle: `<svg width="${size}" height="${size}" viewBox="0 0 64 64"><polygon points="32,8 56,56 8,56" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
      
      square: `<svg width="${size}" height="${size}" viewBox="0 0 64 64"><rect x="12" y="12" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
      
      hexagon: `<svg width="${size}" height="${size}" viewBox="0 0 64 64"><polygon points="32,8 48,16 48,40 32,56 16,40 16,16" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
      
      star: `<svg width="${size}" height="${size}" viewBox="0 0 64 64"><polygon points="32,8 40,28 60,28 44,40 50,60 32,48 14,60 20,40 4,28 24,28" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
      
      arrow: `<svg width="${size}" height="${size}" viewBox="0 0 64 64"><polygon points="32,12 52,32 40,32 40,48 24,48 24,32 12,32" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
      
      compass: `<svg width="${size}" height="${size}" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="32" y1="8" x2="32" y2="56" stroke="currentColor" stroke-width="1"/>
        <line x1="8" y1="32" x2="56" y2="32" stroke="currentColor" stroke-width="1"/>
        <polygon points="32,8 30,16 34,16" fill="currentColor"/>
      </svg>`
    };
    
    return symbols[name] || symbols.circle;
  }

  static createBackground(type = 'minimal', width = 1920, height = 1080) {
    const backgrounds = {
      minimal: `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#1a1a1e;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#09090b;stop-opacity:1" />
          </radialGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#grad1)"/>
      </svg>`,
      
      pattern: `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <defs>
          <pattern id="dots" x="40" y="40" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="2" fill="#2a2a2f" opacity="0.5"/>
          </pattern>
        </defs>
        <rect width="${width}" height="${height}" fill="#09090b"/>
        <rect width="${width}" height="${height}" fill="url(#dots)"/>
      </svg>`,
      
      wave: `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#1a1a1e;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#09090b;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#waveGrad)"/>
        <path d="M 0,${height/2} Q ${width/4},${height/2-50} ${width/2},${height/2} T ${width},${height/2}" 
              fill="none" stroke="#2a2a2f" stroke-width="2" opacity="0.3"/>
      </svg>`
    };
    
    return backgrounds[type] || backgrounds.minimal;
  }

  static createMatrix(rows = 3, cols = 3, fillPercentage = 0.7) {
    const cellSize = 100;
    const width = cols * cellSize;
    const height = rows * cellSize;
    
    let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" class="matrix-bg">`;
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * cellSize;
        const y = i * cellSize;
        svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/>`;
        
        if (Math.random() < fillPercentage) {
          const shapeCx = x + cellSize / 2;
          const shapeCy = y + cellSize / 2;
          const shapeSize = cellSize * 0.4;
          svg += `<circle cx="${shapeCx}" cy="${shapeCy}" r="${shapeSize}" fill="none" stroke="currentColor" stroke-width="2" opacity="0.6"/>`;
        }
      }
    }
    
    svg += `</svg>`;
    return svg;
  }

  static createDossierPage(pageNumber = 1, title = "EXPEDIENTE") {
    return `<svg width="400" height="600" viewBox="0 0 400 600" class="dossier-page">
      <rect width="400" height="600" fill="#e8e4d0"/>
      <rect x="10" y="10" width="380" height="580" fill="none" stroke="#333" stroke-width="2"/>
      
      <line x1="20" y1="80" x2="380" y2="80" stroke="#333" stroke-width="1"/>
      <text x="200" y="50" text-anchor="middle" font-family="monospace" font-size="14" fill="#333">
        ${title} 214-${String(pageNumber).padStart(2, '0')}
      </text>
      <text x="350" y="570" text-anchor="end" font-family="monospace" font-size="10" fill="#999">
        ${pageNumber}
      </text>
      
      <line x1="200" y1="20" x2="200" y2="580" stroke="#ccc" stroke-width="1" opacity="0.5" stroke-dasharray="5,5"/>
    </svg>`;
  }
}

window.SVGAssetGenerator = SVGAssetGenerator;
