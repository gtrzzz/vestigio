/**
 * VESTIGIO - Matrix Renderer
 * Renderiza matrices WAIS en SVG
 */

class MatrixRenderer {
  static shapes = {
    circle: (x, y, size) => 
      `<circle cx="${x}" cy="${y}" r="${size/2}" fill="currentColor" opacity="0.8"/>`,
    
    square: (x, y, size) =>
      `<rect x="${x-size/2}" y="${y-size/2}" width="${size}" height="${size}" fill="currentColor" opacity="0.8" rx="2"/>`,
    
    triangle: (x, y, size) =>
      `<polygon points="${x},${y-size/2} ${x+size/2},${y+size/2} ${x-size/2},${y+size/2}" fill="currentColor" opacity="0.8"/>`,
    
    diamond: (x, y, size) =>
      `<polygon points="${x},${y-size/2} ${x+size/2},${y} ${x},${y+size/2} ${x-size/2},${y}" fill="currentColor" opacity="0.8"/>`,
    
    arrow: (x, y, size) =>
      `<polygon points="${x},${y-size/2} ${x+size/3},${y} ${x+size/6},${y} ${x+size/6},${y+size/2} ${x-size/6},${y+size/2} ${x-size/6},${y} ${x-size/3},${y}" fill="currentColor" opacity="0.8"/>`,
    
    line: (x, y, size) =>
      `<line x1="${x-size/2}" y1="${y}" x2="${x+size/2}" y2="${y}" stroke="currentColor" stroke-width="2" opacity="0.8"/>`,
    
    dots: (x, y, size, count = 3) => {
      const dots = [];
      const radius = size / (count + 1);
      const dotSize = radius * 0.4;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        dots.push(`<circle cx="${px}" cy="${py}" r="${dotSize}" fill="currentColor" opacity="0.8"/>`);
      }
      return dots.join('');
    }
  };

  static renderGrid(matrix, options = {}) {
    const cellSize = options.cellSize || 100;
    const padding = options.padding || 10;
    const cols = 3;
    const rows = 3;
    const width = cols * cellSize + padding * 2;
    const height = rows * cellSize + padding * 2;

    let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" class="matrix-svg">`;
    svg += `<style>.matrix-svg { color: inherit; }</style>`;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * cellSize + cellSize / 2 + padding;
        const y = i * cellSize + cellSize / 2 + padding;
        const index = i * cols + j;
        const item = matrix.grid[index];

        // Bordes de celda
        svg += `<rect x="${j * cellSize + padding}" y="${i * cellSize + padding}" width="${cellSize}" height="${cellSize}" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/>`;

        // Renderizar contenido
        if (item === null) {
          svg += `<text x="${x}" y="${y + 5}" text-anchor="middle" font-size="24" opacity="0.3">?</text>`;
        } else {
          svg += this.renderShape(item, x, y, cellSize * 0.6);
        }
      }
    }

    svg += `</svg>`;
    return svg;
  }

  static renderShape(item, x, y, size) {
    if (!item) return '';

    let result = '';
    
    if (item.shape === 'dots') {
      result = this.shapes.dots(x, y, size, item.count || 3);
    } else if (this.shapes[item.shape]) {
      result = this.shapes[item.shape](x, y, size);
    }

    if (item.rotation && item.rotation !== 0) {
      result = `<g transform="rotate(${item.rotation} ${x} ${y})">${result}</g>`;
    }

    return result;
  }

  static renderOptions(options, selectedIndex = -1, cellSize = 80) {
    let html = '';
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const isSelected = i === selectedIndex;
      const svg = `<svg width="${cellSize}" height="${cellSize}" viewBox="0 0 ${cellSize} ${cellSize}" class="option-svg">
        <rect width="${cellSize}" height="${cellSize}" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2" rx="4"/>
        ${this.renderShape(option, cellSize / 2, cellSize / 2, cellSize * 0.5)}
      </svg>`;

      html += `<button class="matrix-option ${isSelected ? 'selected' : ''}" data-index="${i}" title="Opción ${i + 1}">
        ${svg}
        <span class="option-label">${i + 1}</span>
      </button>`;
    }
    return html;
  }
}

window.MatrixRenderer = MatrixRenderer;
