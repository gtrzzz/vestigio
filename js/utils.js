window.VestigioUtils = (() => {
  const stripDiacritics = (value) =>
    String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const normalizeAnswer = (value) =>
    stripDiacritics(value)
      .toUpperCase()
      .trim()
      .replace(/[^A-Z0-9]+/g, " ")
      .replace(/\s+/g, " ");

  const decode = (value) => {
    try {
      return decodeURIComponent(
        Array.from(atob(value))
          .map(char => "%" + char.charCodeAt(0).toString(16).padStart(2, "0"))
          .join("")
      );
    } catch {
      try { return atob(value); } catch { return ""; }
    }
  };

  const createSessionId = () => {
    const now = new Date();
    const datePart = now.toISOString().slice(0, 10).replaceAll("-", "");
    const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `VST-${datePart}-${randomPart}`;
  };

  const downloadJson = (data, fileName) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  return { normalizeAnswer, decode, createSessionId, downloadJson };
})();
