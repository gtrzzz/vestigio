/**
 * VESTIGIO - Puzzle Engine
 * Motor interactivo del puzzle Kiwi
 * Piezas rotables, marcas ocultas, generación de código
 */

class PuzzleEngine {
  constructor(imageData, gridSize = 6, hiddenMarkCoordinates = []) {
    this.imageData = imageData;
    this.gridSize = gridSize;
    this.totalPieces = gridSize * gridSize;
    this.pieces = [];
    this.solution = null;
    this.hiddenMarks = hiddenMarkCoordinates;
    this.state = 'playing';
    this.revealedMarks = [];
    
    this.initializePieces();
  }

  initializePieces() {
    this.pieces = [];
    for (let i = 0; i < this.totalPieces; i++) {
      this.pieces.push({
        id: i,
        correctPosition: i,
        currentPosition: i,
        rotation: Math.floor(Math.random() * 4) * 90,
        isFlipped: Math.random() > 0.7,
        placed: false,
        element: null
      });
    }
    
    this.shufflePieces();
  }

  shufflePieces() {
    for (let i = this.pieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.pieces[i].currentPosition, this.pieces[j].currentPosition] = 
      [this.pieces[j].currentPosition, this.pieces[i].currentPosition];
    }
  }

  movePiece(pieceId, newPosition) {
    const piece = this.pieces.find(p => p.id === pieceId);
    if (!piece) return false;

    piece.currentPosition = newPosition;
    return true;
  }

  rotatePiece(pieceId, degrees = 90) {
    const piece = this.pieces.find(p => p.id === pieceId);
    if (!piece) return false;

    piece.rotation = (piece.rotation + degrees) % 360;
    return true;
  }

  flipPiece(pieceId) {
    const piece = this.pieces.find(p => p.id === pieceId);
    if (!piece) return false;

    piece.isFlipped = !piece.isFlipped;
    return true;
  }

  checkCompletion() {
    const isComplete = this.pieces.every(piece => 
      piece.currentPosition === piece.correctPosition &&
      piece.rotation === 0 &&
      !piece.isFlipped
    );

    if (isComplete) {
      this.state = 'completed';
      this.revealMarks();
      return {
        complete: true,
        marks: this.revealedMarks,
        code: this.generateCode()
      };
    }

    return { complete: false };
  }

  revealMarks() {
    this.revealedMarks = this.hiddenMarks.map((mark, index) => ({
      id: index,
      gridX: mark.x,
      gridY: mark.y,
      symbol: mark.symbol || `✦`,
      revealed: true
    }));
  }

  generateCode() {
    if (this.revealedMarks.length === 0) return null;

    const code = this.revealedMarks
      .map(m => `${m.gridX}${m.gridY}`)
      .join('-');

    return code;
  }

  getProgress() {
    const correct = this.pieces.filter(p => 
      p.currentPosition === p.correctPosition &&
      p.rotation === 0 &&
      !p.isFlipped
    ).length;

    return {
      correct,
      total: this.totalPieces,
      percentage: Math.round((correct / this.totalPieces) * 100)
    };
  }

  getPieceAt(position) {
    return this.pieces.find(p => p.currentPosition === position);
  }

  getPieceById(id) {
    return this.pieces.find(p => p.id === id);
  }

  reset() {
    this.state = 'playing';
    this.revealedMarks = [];
    this.initializePieces();
  }

  getStats() {
    const progress = this.getProgress();
    return {
      ...progress,
      state: this.state,
      marks: this.revealedMarks.length
    };
  }
}

window.PuzzleEngine = PuzzleEngine;
