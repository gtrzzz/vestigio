window.VestigioOrganizer = (() => {
  let longPressTimer = null;
  let tapCount = 0;
  let tapResetTimer = null;

  const init = ({ getState, setState, refresh }) => {
    const dialog = document.getElementById("organizerDialog");
    const brandTrigger = document.getElementById("brandTrigger");
    const loginButton = document.getElementById("organizerLoginButton");
    const passwordInput = document.getElementById("organizerPassword");
    const feedback = document.getElementById("organizerLoginFeedback");

    const openDialog = () => {
      if (!dialog.open) dialog.showModal();
    };

    const startLongPress = () => {
      clearTimeout(longPressTimer);
      longPressTimer = setTimeout(openDialog, 4000);
    };
    const cancelLongPress = () => clearTimeout(longPressTimer);

    brandTrigger.addEventListener("pointerdown", startLongPress);
    brandTrigger.addEventListener("pointerup", cancelLongPress);
    brandTrigger.addEventListener("pointercancel", cancelLongPress);
    brandTrigger.addEventListener("click", () => {
      tapCount += 1;
      clearTimeout(tapResetTimer);
      if (tapCount >= 5) {
        tapCount = 0;
        openDialog();
      }
      tapResetTimer = setTimeout(() => tapCount = 0, 1800);
    });

    if (new URLSearchParams(location.search).get("organizer") === "true") openDialog();

    loginButton.addEventListener("click", () => {
      const expected = VestigioUtils.decode(EXPERIENCE_CONFIG.meta.organizerPasswordObfuscated);
      if (passwordInput.value === expected) {
        document.getElementById("organizerLogin").hidden = true;
        document.getElementById("organizerPanel").hidden = false;
        feedback.textContent = "";
        renderPanel(getState(), setState, refresh);
      } else {
        feedback.textContent = "Acceso no verificado.";
        feedback.className = "feedback is-error";
      }
    });
  };

  const renderPanel = (state, setState, refresh) => {
    document.getElementById("organizerState").textContent = JSON.stringify(state, null, 2);
    const controls = document.getElementById("organizerLevelControls");
    controls.innerHTML = "";

    EXPERIENCE_CONFIG.levels.forEach(level => {
      const button = document.createElement("button");
      const completed = state.completedLevels.includes(level.id);
      button.type = "button";
      button.className = "secondary-button";
      button.textContent = completed
        ? `Marcar Nivel ${level.number} como pendiente`
        : `Completar Nivel ${level.number}`;
      button.addEventListener("click", () => {
        const next = structuredClone(state);
        next.completedLevels = completed
          ? next.completedLevels.filter(id => id !== level.id)
          : [...new Set([...next.completedLevels, level.id])];
        if (level.number === 4 && !completed) next.finalRevealAt = new Date().toISOString();
        setState(next);
        state = next;
        refresh();
        renderPanel(state, setState, refresh);
      });
      controls.append(button);
    });

    document.getElementById("simulateAllButton").onclick = () => {
      const next = structuredClone(state);
      next.started = true;
      next.completedLevels = EXPERIENCE_CONFIG.levels.map(level => level.id);
      next.finalRevealAt = new Date().toISOString();
      setState(next);
      state = next;
      refresh();
      renderPanel(state, setState, refresh);
    };

    document.getElementById("resetProgressButton").onclick = () => {
      if (!confirm("¿Reiniciar todo el progreso local?")) return;
      const next = VestigioStorage.reset();
      setState(next);
      state = next;
      refresh();
      renderPanel(state, setState, refresh);
    };

    document.getElementById("importProgressButton").onclick = () => {
      try {
        const text = document.getElementById("importProgressInput").value;
        const next = VestigioStorage.importState(text);
        setState(next);
        state = next;
        refresh();
        renderPanel(state, setState, refresh);
        alert("Progreso importado.");
      } catch (error) {
        alert(error.message);
      }
    };
  };

  return { init };
})();
