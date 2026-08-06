/**
 * VESTIGIO - Matrix Storage
 * Persistencia de progreso en matrices
 */

class MatrixStorage {
  constructor(prefix = 'vestigio_matrix_') {
    this.prefix = prefix;
  }

  saveProgress(engine) {
    const data = {
      currentIndex: engine.currentIndex,
      answers: engine.answers,
      state: engine.state,
      startTime: engine.startTime,
      timestamp: Date.now()
    };
    localStorage.setItem(`${this.prefix}progress`, JSON.stringify(data));
  }

  loadProgress() {
    const data = localStorage.getItem(`${this.prefix}progress`);
    return data ? JSON.parse(data) : null;
  }

  hasProgress() {
    const progress = this.loadProgress();
    return progress && progress.currentIndex > 0;
  }

  saveCompletion(sequence, stats) {
    const data = {
      sequence,
      stats,
      completedAt: Date.now()
    };
    localStorage.setItem(`${this.prefix}completion`, JSON.stringify(data));
  }

  loadCompletion() {
    const data = localStorage.getItem(`${this.prefix}completion`);
    return data ? JSON.parse(data) : null;
  }

  getSequence() {
    const completion = this.loadCompletion();
    return completion ? completion.sequence : null;
  }

  clearProgress() {
    localStorage.removeItem(`${this.prefix}progress`);
  }

  clearAll() {
    this.clearProgress();
    localStorage.removeItem(`${this.prefix}completion`);
  }
}

window.MatrixStorage = MatrixStorage;
