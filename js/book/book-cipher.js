/**
 * VESTIGIO - Book Cipher Engine
 * Convierte secuencia de matrices en coordenadas
 * Coordenadas apuntan a palabras en el Cuaderno de la Deriva
 */

class BookCipherEngine {
  constructor(bookPages = [], matrixSequence = '') {
    this.bookPages = bookPages;
    this.matrixSequence = matrixSequence;
    this.solution = null;
  }

  /**
   * Convierte la secuencia de matrices en coordenadas
   * Formato: matriz:posición (ej: 1:3, 2:1, etc)
   */
  generateCoordinates() {
    const coords = [];
    const sequence = this.matrixSequence.replace(/0/g, '');
    
    for (let i = 0; i < sequence.length; i += 2) {
      if (i + 1 < sequence.length) {
        const page = parseInt(sequence[i]);
        const position = parseInt(sequence[i + 1]);
        coords.push({ page, position });
      }
    }
    
    return coords;
  }

  /**
   * Extrae palabras del Cuaderno usando coordenadas
   */
  decodeMessage(coordinates) {
    const words = [];
    
    for (const coord of coordinates) {
      const word = this.getWordFromBook(coord.page, coord.position);
      if (word) words.push(word);
    }
    
    return words.join(' ');
  }

  /**
   * Obtiene una palabra específica del libro
   */
  getWordFromBook(page, position) {
    if (page < 1 || page > this.bookPages.length) return null;
    
    const pageContent = this.bookPages[page - 1];
    if (!pageContent || !pageContent.words) return null;
    
    const words = pageContent.words;
    if (position < 1 || position > words.length) return null;
    
    return words[position - 1];
  }

  /**
   * Valida si la solución es correcta
   */
  validateSolution(proposedSolution) {
    const coords = this.generateCoordinates();
    const decodedMessage = this.decodeMessage(coords);
    
    return decodedMessage.toLowerCase().trim() === 
           proposedSolution.toLowerCase().trim();
  }

  /**
   * Obtiene el mensaje esperado
   */
  getExpectedMessage() {
    const coords = this.generateCoordinates();
    return this.decodeMessage(coords);
  }

  /**
   * Proporciona pistas parciales
   */
  getHint(level = 1) {
    const message = this.getExpectedMessage();
    const words = message.split(' ');
    
    switch (level) {
      case 1:
        return `El mensaje tiene ${words.length} palabras`;
      case 2:
        return `Primeras letras: ${words.map(w => w[0]).join('')}`;
      case 3:
        return `Primera palabra: ${words[0]}`;
      case 4:
        return message;
      default:
        return null;
    }
  }
}

window.BookCipherEngine = BookCipherEngine;
