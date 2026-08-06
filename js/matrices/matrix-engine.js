/**
 * VESTIGIO - Matrix Engine
 * Motor completo de matrices WAIS-like
 * Genera secuencia de respuestas para cifrado de libro
 */

class MatrixEngine {
  constructor(matrices = []) {
    this.matrices = matrices;
    this.currentIndex = 0;
    this.answers = [];
    this.startTime = null;
    this.state = 'ready';
    this.timerInterval = null;
  }

  init() {
    this.currentIndex = 0;
    this.answers = [];
    this.startTime = Date.now();
    this.state = 'playing';
    this.resumeTimer();
  }

  getCurrentMatrix() {
    return this.currentIndex < this.matrices.length ? this.matrices[this.currentIndex] : null;
  }

  submitAnswer(optionIndex) {
    const matrix = this.getCurrentMatrix();
    if (!matrix) return false;

    const isCorrect = optionIndex === matrix.correct;
    this.answers.push({
      matrixId: matrix.id,
      selectedIndex: optionIndex,
      correct: isCorrect,
      timestamp: Date.now() - this.startTime
    });

    this.currentIndex++;

    if (this.currentIndex >= this.matrices.length) {
      this.state = 'completed';
      this.stopTimer();
      return { completed: true, sequence: this.generateSequence() };
    }

    return { completed: false, nextMatrix: this.getCurrentMatrix() };
  }

  generateSequence() {
    return this.answers.map(a => (a.correct ? a.selectedIndex + 1 : 0)).join('');
  }

  getProgress() {
    return {
      current: this.currentIndex + 1,
      total: this.matrices.length,
      percentage: Math.round((this.currentIndex / this.matrices.length) * 100)
    };
  }

  getStats() {
    const correct = this.answers.filter(a => a.correct).length;
    const incorrect = this.answers.length - correct;
    const elapsed = this.startTime ? Date.now() - this.startTime : 0;

    return {
      correct,
      incorrect,
      accuracy: this.answers.length > 0 ? (correct / this.answers.length * 100).toFixed(1) : 0,
      timeElapsed: this.formatTime(elapsed),
      sequence: this.generateSequence()
    };
  }

  resumeTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.state === 'playing') {
        window.dispatchEvent(new CustomEvent('matrixTimer', {
          detail: { elapsed: this.formatTime(Date.now() - this.startTime) }
        }));
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  canResumeProgress() {
    return this.currentIndex > 0 && this.currentIndex < this.matrices.length;
  }

  reset() {
    this.currentIndex = 0;
    this.answers = [];
    this.state = 'ready';
    this.stopTimer();
  }

  destroy() {
    this.stopTimer();
  }
}

window.MatrixEngine = MatrixEngine;
