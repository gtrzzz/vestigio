window.VestigioPuzzles = (() => {
  const config = window.EXPERIENCE_CONFIG;

  const getLevel = (levelId) => config.levels.find(level => level.id === levelId);

  const validateAnswer = (levelId, rawAnswer) => {
    const level = getLevel(levelId);
    if (!level) return false;
    const normalized = VestigioUtils.normalizeAnswer(rawAnswer);

    return level.acceptedAnswersEncoded
      .map(VestigioUtils.decode)
      .map(VestigioUtils.normalizeAnswer)
      .includes(normalized);
  };

  const getHintByCode = (levelId, rawCode) => {
    const level = getLevel(levelId);
    if (!level) return null;
    const normalizedCode = VestigioUtils.normalizeAnswer(rawCode).replaceAll(" ", "-");
    const entry = Object.entries(level.hintCodes).find(([code]) =>
      VestigioUtils.normalizeAnswer(code).replaceAll(" ", "-") === normalizedCode
    );
    return entry ? { code: entry[0], text: entry[1] } : null;
  };

  return { getLevel, validateAnswer, getHintByCode };
})();
