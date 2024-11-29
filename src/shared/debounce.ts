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

interface ThrottleOptions {
  leading?: boolean; // 是否在开始时立即执行
  trailing?: boolean; // 是否在结束时追加一次执行
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number,
  options: ThrottleOptions = { leading: true, trailing: true }
): (...args: Parameters<T>) => void {
  let lastCall = 0; // 上次执行的时间
  let timeoutId: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | null = null;

  const { leading = true, trailing = true } = options;

  return function (...args: Parameters<T>) {
    const now = Date.now();

    if (!lastCall && !leading) {
      lastCall = now; // 如果不支持 leading，初始化 lastCall 为当前时间
    }

    const remaining = limit - (now - lastCall);

    if (remaining <= 0) {
      // 如果时间间隔已超过限制
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCall = now;
      func(...args);
    } else if (trailing) {
      // 如果时间间隔未到，且支持 trailing
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        lastCall = leading ? Date.now() : 0;
        timeoutId = null;
        if (trailing && lastArgs) {
          func(...lastArgs);
          lastArgs = null;
        }
      }, remaining);
    }

    lastArgs = args; // 保存最近一次的参数
  };
}

export async function sleep(ms: number) {
  return await new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, ms);
  });
}
