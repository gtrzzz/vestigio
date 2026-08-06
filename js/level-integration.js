/**
 * VESTIGIO - Level Integration System
 * Conecta todos los niveles con claves progresivas y narrativa coherente
 */

class LevelIntegrationSystem {
  constructor() {
    this.levels = {};
    this.keyChain = {};
    this.progressionState = 'level1';
  }

  // NIVEL 1: La Orientación
  initLevel1(data = {}) {
    this.levels[1] = {
      id: 1,
      name: 'La Orientación',
      description: 'Una brújula, un ángulo, una clave. Encuentra lo que se oculta en 15 grados.',
      duration: '20-30 minutos',
      requiredKey: null,
      unlocksKey: 'DESVIO',
      narrative: 'El viaje comienza con una pregunta simple: ¿hacia dónde te diriges?',
      assets: {
        image: 'assets/images/compass-rose.svg',
        audio: 'assets/audio/level1-ambient.mp3'
      },
      solution: 'ROSA NO ES EL FINAL',
      intermediateKey: 'DESVIO'
    };

    return this.levels[1];
  }

  // NIVEL 2: La Esencia
  initLevel2(keyFromLevel1) {
    if (keyFromLevel1 !== 'DESVIO') {
      throw new Error('La clave de Nivel 1 es incorrecta');
    }

    this.levels[2] = {
      id: 2,
      name: 'La Esencia',
      description: '10 matrices. Una secuencia. Una verdad sobre quién eres realmente.',
      duration: '45 minutos',
      requiredKey: 'DESVIO',
      unlocksKey: 'MATRIX_SEQUENCE',
      narrative: 'Ahora necesitas mirarte a ti mismo. No hay exterior que valga sin conocer el interior.',
      assets: {
        image: 'assets/images/matrices-grid.svg',
        audio: 'assets/audio/level2-ambient.mp3'
      },
      expectedSequence: '2413142312',
      solution: 'JUST MOI',
      cipherTarget: this.generateCipherTarget()
    };

    this.keyChain['level1_to_level2'] = keyFromLevel1;
    return this.levels[2];
  }

  // NIVEL 3: La Forma
  initLevel3(sequenceFromLevel2) {
    if (!sequenceFromLevel2 || sequenceFromLevel2.length === 0) {
      throw new Error('La secuencia de Nivel 2 es requerida');
    }

    this.levels[3] = {
      id: 3,
      name: 'La Forma',
      description: 'Un rompecabezas. 36 piezas. Kiwi, tu compañero, espera ser encontrado.',
      duration: '45 minutos',
      requiredKey: sequenceFromLevel2,
      unlocksKey: 'PUZZLE_CODE',
      narrative: 'Cada fragmento que reúnas es un paso hacia la verdad. Kiwi nunca se rinde. Tú tampoco.',
      assets: {
        image: 'assets/images/kiwi-puzzle.png',
        audio: 'assets/audio/level3-ambient.mp3'
      },
      puzzleGridSize: 6,
      hiddenMarks: this.generateHiddenMarks(sequenceFromLevel2),
      solution: 'CODIGO_KIWI_001'
    };

    this.keyChain['level2_to_level3'] = sequenceFromLevel2;
    return this.levels[3];
  }

  // NIVEL 4: La Experiencia
  initLevel4(puzzleCodeFromLevel3) {
    if (!puzzleCodeFromLevel3) {
      throw new Error('El código del puzzle de Nivel 3 es requerido');
    }

    this.levels[4] = {
      id: 4,
      name: 'La Experiencia',
      description: 'No es un destino. Es una verdad. Algo que te espera en algún lugar blanco, frío y magnifico.',
      duration: '15-20 minutos',
      requiredKey: puzzleCodeFromLevel3,
      unlocksKey: 'FINAL_REVELATION',
      narrative: `Te has preparado para esto. Cada nivel te ha traído más cerca.
      Ahora sabes quién eres. Ahora necesitas ir donde tu verdadero ser puede florecer.`,
      assets: {
        image: 'assets/images/mountains-final.svg',
        audio: 'assets/audio/level4-ambient.mp3',
        video: 'assets/video/final-revelation.mp4'
      },
      finalMessage: this.generateFinalMessage(puzzleCodeFromLevel3),
      emotionalTone: 'cinematic',
      endingType: 'transformative'
    };

    this.keyChain['level3_to_level4'] = puzzleCodeFromLevel3;
    return this.levels[4];
  }

  /**
   * Genera el objetivo de cifrado basado en la secuencia de matrices
   */
  generateCipherTarget() {
    return {
      method: 'book_coordinates',
      expectedMessage: 'JUST MOI',
      hints: [
        'El mensaje tiene dos palabras',
        'Primera palabra empieza con J',
        'Segunda palabra empieza con M'
      ]
    };
  }

  /**
   * Genera marcas ocultas basadas en la secuencia del puzzle
   */
  generateHiddenMarks(sequence) {
    const marks = [];
    const sequenceDigits = sequence.replace(/0/g, '').split('');
    
    for (let i = 0; i < Math.min(sequenceDigits.length, 8); i++) {
      const digit = parseInt(sequenceDigits[i]);
      marks.push({
        x: (digit % 6) + 1,
        y: Math.floor(digit / 6) + 1,
        symbol: '✦',
        revealed: false
      });
    }
    
    return marks;
  }

  /**
   * Genera el mensaje final basado en todos los códigos anteriores
   */
  generateFinalMessage(puzzleCode) {
    return {
      title: 'El Lugar Existe',
      content: `Tu viaje te ha llevado aquí por una razón.
      
      Cada nivel fue un espejo de tu propia transformación.
      La brújula te enseñó hacia dónde vas.
      Las matrices te mostraron quién eres.
      El puzzle te demostró que puedes restaurar lo fragmentado.
      
      Ahora es momento de vivir la experiencia.
      
      Te espera en las montañas blancas.
      Donde la nieve susurra historias antiguas.
      Donde Kiwi corre libremente.
      Donde tú finalmente te encuentras a ti mismo.
      
      Este es tu VESTIGIO.
      La huella de quién fuiste.
      El camino hacia quien serás.`,
      coordinates: {
        latitude: 36.8,
        longitude: -3.6,
        elevation: 3478,
        place: 'Mulhacén, Sierra Nevada'
      }
    };
  }

  /**
   * Valida la progresión entre niveles
   */
  validateTransition(fromLevel, toLevel, keyProvided) {
    if (fromLevel >= toLevel) return false;
    
    const requiredKey = this.levels[toLevel]?.requiredKey;
    if (requiredKey && keyProvided !== requiredKey) return false;
    
    return true;
  }

  /**
   * Obtiene el estado de progresión
   */
  getProgression() {
    return {
      currentLevel: this.progressionState,
      completedLevels: Object.keys(this.levels).filter(l => 
        this.levels[l].completed === true
      ),
      keyChain: this.keyChain
    };
  }

  /**
   * Marca un nivel como completado
   */
  completeLevel(levelNumber, solution) {
    if (this.levels[levelNumber]) {
      this.levels[levelNumber].completed = true;
      this.levels[levelNumber].completedAt = Date.now();
      this.levels[levelNumber].playerSolution = solution;
      
      if (levelNumber < 4) {
        this.progressionState = `level${levelNumber + 1}`;
      } else {
        this.progressionState = 'complete';
      }
      
      return true;
    }
    return false;
  }
}

window.LevelIntegrationSystem = LevelIntegrationSystem;
