export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number = 3000
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null;

  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export async function sleep(ms: number) {
  return await new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, ms);
  });
}
