/**
 * VESTIGIO - Cinematic Transition System
 * Transiciones elegantes y cinematográficas entre niveles
 */

class CinematicSystem {
  constructor() {
    this.isPlaying = false;
    this.queue = [];
  }

  /**
   * Transición tipo fade (desvanecer)
   */
  async fadeTransition(duration = 1000) {
    return new Promise(resolve => {
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000;
        opacity: 0;
        z-index: 9999;
        transition: opacity ${duration}ms ease-in-out;
        pointer-events: none;
      `;
      document.body.appendChild(overlay);

      requestAnimationFrame(() => {
        overlay.style.opacity = '1';
      });

      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), duration);
        resolve();
      }, duration);
    });
  }

  /**
   * Transición tipo scan (escaneo)
   */
  async scanTransition(duration = 1500) {
    return new Promise(resolve => {
      const scanner = document.createElement('div');
      scanner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          180deg,
          transparent 0%,
          rgba(59, 130, 246, 0.3) 50%,
          transparent 100%
        );
        background-size: 100% 200%;
        animation: scan ${duration}ms ease-in-out;
        z-index: 9999;
        pointer-events: none;
      `;

      const style = document.createElement('style');
      style.textContent = `
        @keyframes scan {
          0% { background-position: 0% 0%; }
          50% { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }
      `;
      document.head.appendChild(style);
      document.body.appendChild(scanner);

      setTimeout(() => {
        scanner.remove();
        style.remove();
        resolve();
      }, duration);
    });
  }

  /**
   * Transición tipo zoom
   */
  async zoomTransition(direction = 'in', duration = 800) {
    return new Promise(resolve => {
      const overlay = document.createElement('div');
      const startScale = direction === 'in' ? 0.1 : 1;
      const endScale = direction === 'in' ? 1 : 0.1;

      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #09090b;
        transform: scale(${startScale});
        z-index: 9999;
        transition: transform ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1);
        pointer-events: none;
      `;

      document.body.appendChild(overlay);

      requestAnimationFrame(() => {
        overlay.style.transform = `scale(${endScale})`;
      });

      setTimeout(() => {
        overlay.remove();
        resolve();
      }, duration);
    });
  }

  /**
   * Transición tipo cortina (cortina de cine)
   */
  async curtainTransition(duration = 1200) {
    return new Promise(resolve => {
      const curtain = document.createElement('div');
      curtain.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #09090b;
        clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%);
        animation: curtainClose ${duration}ms ease-in-out;
        z-index: 9999;
        pointer-events: none;
      `;

      const style = document.createElement('style');
      style.textContent = `
        @keyframes curtainClose {
          0% { clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%); }
          50% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
          100% { clip-path: polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%); }
        }
      `;

      document.head.appendChild(style);
      document.body.appendChild(curtain);

      setTimeout(() => {
        curtain.remove();
        style.remove();
        resolve();
      }, duration);
    });
  }

  /**
   * Transición tipo pulse (latido)
   */
  async pulseTransition(duration = 800) {
    return new Promise(resolve => {
      const pulse = document.createElement('div');
      pulse.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        border: 2px solid #3b82f6;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: pulse ${duration}ms ease-out;
        z-index: 9999;
        pointer-events: none;
      `;

      const style = document.createElement('style');
      style.textContent = `
        @keyframes pulse {
          0% {
            width: 100px;
            height: 100px;
            opacity: 1;
          }
          100% {
            width: 200vw;
            height: 200vw;
            opacity: 0;
          }
        }
      `;

      document.head.appendChild(style);
      document.body.appendChild(pulse);

      setTimeout(() => {
        pulse.remove();
        style.remove();
        resolve();
      }, duration);
    });
  }

  /**
   * Efecto de desbloqueo cinematográfico
   */
  async unlockEffect(itemName, duration = 1500) {
    return new Promise(resolve => {
      const unlock = document.createElement('div');
      unlock.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9998;
        text-align: center;
        animation: unlockPulse ${duration}ms ease-out;
      `;

      unlock.innerHTML = `
        <div style="
          font-size: 3rem;
          margin-bottom: 1rem;
          animation: unlockScale ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1);
        ">✦</div>
        <h2 style="
          font-size: 1.5rem;
          letter-spacing: 2px;
          color: #3b82f6;
          animation: unlockFade ${duration}ms ease-out;
        ">${itemName}</h2>
      `;

      const style = document.createElement('style');
      style.textContent = `
        @keyframes unlockScale {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes unlockFade {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes unlockPulse {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `;

      document.head.appendChild(style);
      document.body.appendChild(unlock);

      setTimeout(() => {
        unlock.remove();
        style.remove();
        resolve();
      }, duration);
    });
  }

  /**
   * Secuencia de transición completa entre niveles
   */
  async levelTransition(fromLevel, toLevel) {
    await this.fadeTransition(500);
    await this.scanTransition(800);
    return true;
  }

  /**
   * Final cinematográfico
   */
  async finalCinematic(message) {
    return new Promise(resolve => {
      const screen = document.createElement('div');
      screen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #09090b;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 2rem;
      `;

      screen.innerHTML = `
        <div style="
          text-align: center;
          color: #e8e8f0;
          max-width: 600px;
          animation: fadeInUp 2s ease-out;
        ">
          <h1 style="
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            letter-spacing: 3px;
          ">VESTIGIO</h1>
          <p style="
            font-size: 1.1rem;
            line-height: 1.8;
            margin-bottom: 2rem;
            color: #8b92a0;
          ">${message}</p>
          <button style="
            padding: 1rem 2rem;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 0.5rem;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
          " onclick="this.parentElement.parentElement.remove()">
            Continuar
          </button>
        </div>
      `;

      const style = document.createElement('style');
      style.textContent = `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `;

      document.head.appendChild(style);
      document.body.appendChild(screen);

      setTimeout(resolve, 3000);
    });
  }
}

window.CinematicSystem = CinematicSystem;
