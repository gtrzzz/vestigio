window.VestigioStorage = (() => {
  const config = window.EXPERIENCE_CONFIG;
  let storageAvailable = true;

  const defaultState = () => ({
    version: config.meta.version,
    sessionId: VestigioUtils.createSessionId(),
    firstOpenedAt: new Date().toISOString(),
    lastVisitAt: new Date().toISOString(),
    started: false,
    completedLevels: [],
    attempts: {},
    answers: {},
    unlockedHints: {},
    soundEnabled: false,
    achievements: [],
    finalRevealAt: null
  });

  const testStorage = () => {
    try {
      localStorage.setItem("__vestigio_test__", "1");
      localStorage.removeItem("__vestigio_test__");
      storageAvailable = true;
    } catch {
      storageAvailable = false;
    }
    return storageAvailable;
  };

  const load = () => {
    if (!testStorage()) return defaultState();
    try {
      const raw = localStorage.getItem(config.storage.key);
      if (!raw) {
        const fresh = defaultState();
        save(fresh);
        return fresh;
      }
      const parsed = JSON.parse(raw);
      return { ...defaultState(), ...parsed, lastVisitAt: new Date().toISOString() };
    } catch {
      return defaultState();
    }
  };

  const save = (state) => {
    if (!storageAvailable) return false;
    try {
      localStorage.setItem(config.storage.key, JSON.stringify(state));
      return true;
    } catch {
      return false;
    }
  };

  const reset = () => {
    const fresh = defaultState();
    save(fresh);
    return fresh;
  };

  const importState = (jsonText) => {
    const parsed = JSON.parse(jsonText);
    if (!parsed || typeof parsed !== "object" || !parsed.sessionId) {
      throw new Error("El archivo no contiene un progreso válido.");
    }
    const merged = { ...defaultState(), ...parsed, lastVisitAt: new Date().toISOString() };
    if (!save(merged)) throw new Error("No se ha podido guardar el progreso.");
    return merged;
  };

  return {
    load,
    save,
    reset,
    importState,
    isAvailable: () => storageAvailable
  };
})();
