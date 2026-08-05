(() => {
  const config = window.EXPERIENCE_CONFIG;
  let state = VestigioStorage.load();
  let activeLevelId = null;

  const views = {
    intro: document.getElementById("introView"),
    hub: document.getElementById("hubView"),
    level: document.getElementById("levelView"),
    reveal: document.getElementById("revealView")
  };

  const setState = (next) => {
    state = next;
    VestigioStorage.save(state);
  };

  const showView = (name) => {
    Object.values(views).forEach(view => view.classList.remove("is-active"));
    views[name].classList.add("is-active");
    document.getElementById("app").focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isLevelUnlocked = (level) => {
    if (level.number === 1) return state.started;
    const previous = config.levels.find(item => item.number === level.number - 1);
    return state.completedLevels.includes(previous.id);
  };

  const renderStatus = () => {
    document.getElementById("sessionId").textContent = `SESIÓN: ${state.sessionId}`;
    document.getElementById("storageStatus").textContent =
      `ALMACENAMIENTO: ${VestigioStorage.isAvailable() ? "LOCAL ACTIVO" : "NO DISPONIBLE"}`;
  };

  const renderHub = () => {
    const completed = state.completedLevels.length;
    document.getElementById("progressLabel").textContent = `${completed} / ${config.levels.length}`;
    document.getElementById("progressBar").style.width = `${(completed / config.levels.length) * 100}%`;

    const firstOpened = new Date(state.firstOpenedAt);
    const days = Math.max(0, Math.floor((Date.now() - firstOpened.getTime()) / 86400000));
    document.getElementById("welcomeBackMessage").textContent =
      days > 0
        ? `Han pasado ${days} días desde la primera señal. El rumbo continúa intacto.`
        : `La sesión de ${config.meta.playerName} está activa.`;

    const list = document.getElementById("levelList");
    list.innerHTML = "";

    config.levels.forEach(level => {
      const complete = state.completedLevels.includes(level.id);
      const unlocked = isLevelUnlocked(level);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `level-card${complete ? " is-complete" : ""}`;
      button.disabled = !unlocked;
      button.innerHTML = `
        <div class="level-card-top">
          <span class="eyebrow">REGISTRO 0${level.number}</span>
          <span class="level-status">${complete ? "RECUPERADO" : unlocked ? "DISPONIBLE" : "BLOQUEADO"}</span>
        </div>
        <h3>${level.title}</h3>
        <p>${level.subtitle}</p>
      `;
      button.addEventListener("click", () => openLevel(level.id));
      list.append(button);
    });
  };

  const openLevel = (levelId) => {
    const level = VestigioPuzzles.getLevel(levelId);
    if (!level || !isLevelUnlocked(level)) return;
    activeLevelId = levelId;

    document.getElementById("levelKicker").textContent = `REGISTRO 0${level.number}`;
    document.getElementById("levelTitle").textContent = level.title;
    document.getElementById("levelNarrative").textContent = level.narrative;
    document.getElementById("answerInput").value = state.answers[levelId] || "";
    document.getElementById("answerFeedback").textContent = "";
    document.getElementById("hintCodeInput").value = "";
    document.getElementById("hintOutput").textContent = "";

    const prototype = document.getElementById("levelPrototype");
    if (level.id === "form") {
      prototype.innerHTML = `
        <p><strong>Prototipo del Nivel 3.</strong></p>
        <img src="./assets/images/kiwi-reference.jpeg" alt="Kiwi con una pelota de tenis" style="width:100%;max-height:360px;object-fit:cover;border-radius:14px;">
        <p>En la Fase 4 esta referencia se convertirá en una reconstrucción interactiva por capas.</p>
      `;
    } else if (level.id === "destination") {
      prototype.innerHTML = `
        <p><strong>RUTA NO ASIGNADA.</strong></p>
        <p>Región: Europa<br>Fecha: por decidir<br>Destino: por construir juntos</p>
      `;
    } else {
      prototype.innerHTML = `<p>La mecánica visual definitiva se implementará en la Fase 4. En esta fase se prueba el flujo completo.</p>`;
    }

    showView("level");
  };

  const completeActiveLevel = (answer) => {
    if (!activeLevelId) return;
    const level = VestigioPuzzles.getLevel(activeLevelId);
    const next = structuredClone(state);
    next.answers[activeLevelId] = answer;
    next.completedLevels = [...new Set([...next.completedLevels, activeLevelId])];
    if (level.number === 4) next.finalRevealAt = new Date().toISOString();
    setState(next);

    document.getElementById("revealTitle").textContent = level.revealTitle;
    document.getElementById("revealMessage").textContent = level.revealMessage;
    document.getElementById("revealVisual").dataset.level = level.number;
    showView("reveal");
  };

  const refresh = () => {
    renderStatus();
    renderHub();
    if (!state.started) showView("intro");
    else if (!document.querySelector(".view.is-active")) showView("hub");
  };

  document.getElementById("startButton").addEventListener("click", () => {
    const next = structuredClone(state);
    next.started = true;
    setState(next);
    renderHub();
    showView("hub");
  });

  document.getElementById("backToHubButton").addEventListener("click", () => {
    renderHub();
    showView("hub");
  });

  document.getElementById("continueButton").addEventListener("click", () => {
    renderHub();
    showView("hub");
  });

  document.getElementById("answerForm").addEventListener("submit", event => {
    event.preventDefault();
    if (!activeLevelId) return;
    const input = document.getElementById("answerInput");
    const feedback = document.getElementById("answerFeedback");
    const answer = input.value;

    const next = structuredClone(state);
    next.attempts[activeLevelId] = (next.attempts[activeLevelId] || 0) + 1;
    next.answers[activeLevelId] = answer;
    setState(next);

    if (VestigioPuzzles.validateAnswer(activeLevelId, answer)) {
      feedback.textContent = "La señal coincide.";
      feedback.className = "feedback is-success";
      setTimeout(() => completeActiveLevel(answer), 350);
    } else {
      feedback.textContent = "La señal no coincide todavía. Revisa el rumbo.";
      feedback.className = "feedback is-error";
    }
  });

  document.getElementById("hintCodeButton").addEventListener("click", () => {
    const rawCode = document.getElementById("hintCodeInput").value;
    const output = document.getElementById("hintOutput");
    const hint = VestigioPuzzles.getHintByCode(activeLevelId, rawCode);

    if (!hint) {
      output.textContent = "Código no reconocido.";
      return;
    }

    const next = structuredClone(state);
    next.unlockedHints[activeLevelId] = [...new Set([...(next.unlockedHints[activeLevelId] || []), hint.code])];
    setState(next);
    output.textContent = hint.text;
  });

  document.getElementById("exportProgressButton").addEventListener("click", () => {
    VestigioUtils.downloadJson(state, config.storage.backupFileName);
  });

  document.getElementById("soundToggle").addEventListener("click", event => {
    const next = structuredClone(state);
    next.soundEnabled = !next.soundEnabled;
    setState(next);
    event.currentTarget.setAttribute("aria-pressed", String(next.soundEnabled));
    event.currentTarget.innerHTML = next.soundEnabled ? "<span aria-hidden='true'>●</span>" : "<span aria-hidden='true'>◌</span>";
  });

  VestigioOrganizer.init({
    getState: () => state,
    setState,
    refresh
  });

  document.getElementById("entityName").textContent = config.meta.entityName;
  document.getElementById("introTitle").textContent = config.intro.title;
  document.getElementById("introText").textContent = config.intro.body;
  document.getElementById("soundToggle").setAttribute("aria-pressed", String(state.soundEnabled));

  renderStatus();
  renderHub();
  showView(state.started ? "hub" : "intro");
})();
