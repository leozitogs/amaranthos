export function logError(error: unknown, context?: string) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[Error]${context ? ` in ${context}:` : ''} ${message}`);
}
