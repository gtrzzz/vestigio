/**
 * VESTIGIO - Core Application Engine
 * Orquestador central de todos los sistemas
 */

class VestigigoCore {
  constructor(config = {}) {
    this.config = config;
    this.currentLevel = 1;
    this.levels = {
      1: { name: 'La Orientación', engine: null, completed: false },
      2: { name: 'La Esencia', engine: null, completed: false },
      3: { name: 'La Forma', engine: null, completed: false },
      4: { name: 'La Experiencia', engine: null, completed: false }
    };
    
    this.matrixEngine = null;
    this.bookCipherEngine = null;
    this.puzzleEngine = null;
    
    this.playerData = {
      startTime: null,
      progress: {},
      solutions: {},
      unlocks: []
    };
    
    this.storage = new VestigigoStorage();
  }

  init() {
    this.playerData.startTime = Date.now();
    this.loadProgress();
    return this.getCurrentLevelConfig();
  }

  getCurrentLevelConfig() {
    return this.levels[this.currentLevel];
  }

  advanceLevel() {
    if (this.currentLevel < 4) {
      this.currentLevel++;
      this.saveProgress();
      return this.getCurrentLevelConfig();
    }
    return null;
  }

  completedCurrentLevel(solution) {
    const level = this.levels[this.currentLevel];
    level.completed = true;
    this.playerData.solutions[this.currentLevel] = solution;
    this.saveProgress();
  }

  unlock(unlockedItem) {
    if (!this.playerData.unlocks.includes(unlockedItem)) {
      this.playerData.unlocks.push(unlockedItem);
      this.dispatchEvent('unlock', { item: unlockedItem });
      this.saveProgress();
    }
  }

  saveProgress() {
    this.storage.savePlayerData(this.playerData);
    this.storage.saveLevelStates(this.levels);
  }

  loadProgress() {
    const savedData = this.storage.loadPlayerData();
    if (savedData) {
      this.playerData = { ...this.playerData, ...savedData };
    }
    
    const savedLevels = this.storage.loadLevelStates();
    if (savedLevels) {
      this.levels = { ...this.levels, ...savedLevels };
    }
  }

  getGameStats() {
    const elapsed = Date.now() - this.playerData.startTime;
    const completedCount = Object.values(this.levels).filter(l => l.completed).length;
    
    return {
      currentLevel: this.currentLevel,
      completedLevels: completedCount,
      timeElapsed: this.formatTime(elapsed),
      unlockedItems: this.playerData.unlocks.length,
      solutions: this.playerData.solutions
    };
  }

  formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    return `${minutes}m ${seconds}s`;
  }

  dispatchEvent(eventName, detail) {
    window.dispatchEvent(new CustomEvent(`vestigio:${eventName}`, { detail }));
  }

  reset() {
    this.currentLevel = 1;
    this.playerData = {
      startTime: Date.now(),
      progress: {},
      solutions: {},
      unlocks: []
    };
    this.levels = Object.keys(this.levels).reduce((acc, key) => {
      acc[key] = { ...this.levels[key], completed: false };
      return acc;
    }, {});
    this.storage.clearAll();
  }
}

class VestigigoStorage {
  constructor(prefix = 'vestigio_') {
    this.prefix = prefix;
  }

  savePlayerData(data) {
    localStorage.setItem(`${this.prefix}player`, JSON.stringify(data));
  }

  loadPlayerData() {
    const data = localStorage.getItem(`${this.prefix}player`);
    return data ? JSON.parse(data) : null;
  }

  saveLevelStates(levels) {
    localStorage.setItem(`${this.prefix}levels`, JSON.stringify(levels));
  }

  loadLevelStates() {
    const data = localStorage.getItem(`${this.prefix}levels`);
    return data ? JSON.parse(data) : null;
  }

  clearAll() {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .forEach(key => localStorage.removeItem(key));
  }
}

window.VestigigoCore = VestigigoCore;
window.VestigigoStorage = VestigigoStorage;
