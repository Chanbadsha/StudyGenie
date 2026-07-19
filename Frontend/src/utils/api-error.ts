export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (typeof error !== 'object' || error === null) {
    return fallback;
  }

  const errorRecord = error as Record<string, unknown>;
  const response = errorRecord.response;

  if (typeof response === 'object' && response !== null) {
    const responseData = (response as Record<string, unknown>).data;

    if (typeof responseData === 'object' && responseData !== null) {
      const message = (responseData as Record<string, unknown>).message;
      if (typeof message === 'string' && message.length > 0) {
        return message;
      }
    }
  }

  const message = errorRecord.message;
  return typeof message === 'string' && message.length > 0 ? message : fallback;
}
