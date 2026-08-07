/**
 * VESTIGIO - Achievements & Milestones System
 * Logros y hitos narrativos
 */

class AchievementsSystem {
  constructor() {
    this.achievements = [];
    this.milestones = [];
    this.easterEggs = [];
    this.initializeAchievements();
  }

  initializeAchievements() {
    this.achievements = [
      {
        id: 'first_step',
        title: 'El Primer Paso',
        description: 'Completaste el Nivel 1: La Orientación',
        points: 100,
        icon: '🧭',
        unlocked: false
      },
      {
        id: 'know_thyself',
        title: 'Conócete a Ti Mismo',
        description: 'Completaste el Nivel 2: La Esencia',
        points: 150,
        icon: '🔮',
        unlocked: false
      },
      {
        id: 'rebuild_wholeness',
        title: 'Reconstruir la Totalidad',
        description: 'Completaste el Nivel 3: La Forma',
        points: 150,
        icon: '🧩',
        unlocked: false
      },
      {
        id: 'find_experience',
        title: 'La Experiencia',
        description: 'Completaste el Nivel 4: La Experiencia',
        points: 200,
        icon: '⛰️',
        unlocked: false
      },
      {
        id: 'perfect_matrices',
        title: 'Mente Afilada',
        description: 'Resuelve todas las matrices sin errores',
        points: 75,
        icon: '⚡',
        unlocked: false,
        rarity: 'rare'
      },
      {
        id: 'speedrunner',
        title: 'Contra Reloj',
        description: 'Completa la experiencia en menos de 90 minutos',
        points: 100,
        icon: '⏱️',
        unlocked: false,
        rarity: 'epic'
      },
      {
        id: 'detective',
        title: 'Investigador',
        description: 'Descubre todos los mensajes ocultos',
        points: 125,
        icon: '🔍',
        unlocked: false,
        rarity: 'rare'
      },
      {
        id: 'cipher_master',
        title: 'Maestro del Cifrado',
        description: 'Decodifica perfectamente el cifraje de libro',
        points: 100,
        icon: '📖',
        unlocked: false,
        rarity: 'rare'
      }
    ];

    this.milestones = [
      {
        id: 'level1_complete',
        level: 1,
        title: 'Nuevo Camino',
        message: 'Ahora sabes hacia dónde vas...',
        reward: 'desvio_key'
      },
      {
        id: 'level2_complete',
        level: 2,
        title: 'Autoconocimiento',
        message: 'Has visto quién eres realmente...',
        reward: 'cipher_unlock'
      },
      {
        id: 'level3_complete',
        level: 3,
        title: 'Restauración',
        message: 'Has reunido los fragmentos dispersos...',
        reward: 'puzzle_code'
      },
      {
        id: 'level4_complete',
        level: 4,
        title: 'Transformación',
        message: 'Has abierto una experiencia sin nombrarla...',
        reward: 'final_revelation'
      }
    ];

    this.easterEggs = [
      {
        id: 'hidden_message_01',
        title: 'Mensaje Oculto',
        hint: 'Mira el cielo cuando todo esté oscuro',
        reward: 'bonus_scene'
      },
      {
        id: 'secret_symbol',
        title: 'El Símbolo Perdido',
        hint: 'Busca la marca que no parece una pista',
        reward: 'true_ending'
      },
      {
        id: 'developer_mode',
        title: 'Modo Desarrollador',
        hint: 'Presiona Ctrl+Shift+D en la pantalla principal',
        reward: 'developer_tools'
      }
    ];
  }

  unlockAchievement(achievementId) {
    const achievement = this.achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
      achievement.unlockedAt = Date.now();
      this.dispatchAchievement(achievement);
      return true;
    }
    return false;
  }

  unlockMilestone(milestoneId) {
    const milestone = this.milestones.find(m => m.id === milestoneId);
    if (milestone && !milestone.unlocked) {
      milestone.unlocked = true;
      milestone.unlockedAt = Date.now();
      this.dispatchMilestone(milestone);
      return true;
    }
    return false;
  }

  discoverEasterEgg(eggId) {
    const egg = this.easterEggs.find(e => e.id === eggId);
    if (egg && !egg.discovered) {
      egg.discovered = true;
      egg.discoveredAt = Date.now();
      return egg;
    }
    return null;
  }

  dispatchAchievement(achievement) {
    window.dispatchEvent(new CustomEvent('vestigio:achievement_unlocked', {
      detail: achievement
    }));
  }

  dispatchMilestone(milestone) {
    window.dispatchEvent(new CustomEvent('vestigio:milestone_reached', {
      detail: milestone
    }));
  }

  getTotalPoints() {
    return this.achievements
      .filter(a => a.unlocked)
      .reduce((total, a) => total + a.points, 0);
  }

  getCompletionPercentage() {
    const unlockedAchievements = this.achievements.filter(a => a.unlocked).length;
    return Math.round((unlockedAchievements / this.achievements.length) * 100);
  }

  getStats() {
    return {
      totalAchievements: this.achievements.length,
      unlockedAchievements: this.achievements.filter(a => a.unlocked).length,
      totalPoints: this.getTotalPoints(),
      completionPercentage: this.getCompletionPercentage(),
      discoveredEasterEggs: this.easterEggs.filter(e => e.discovered).length,
      totalMilestones: this.milestones.length,
      unlockedMilestones: this.milestones.filter(m => m.unlocked).length
    };
  }

  reset() {
    this.initializeAchievements();
  }
}

window.AchievementsSystem = AchievementsSystem;
