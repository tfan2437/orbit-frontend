export const generateId = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback (very basic, not UUID spec-compliant)
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
};

export const generateName = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const getErrorMessage = (
  error: unknown,
  defaultMessage: string = "An unknown error occurred"
): string => {
  return error instanceof Error ? error.message : defaultMessage;
};
