import { className } from "jsx-dom";

export const useAttrRef = <Attr extends Record<string, any>>(attar: Attr, batch = false) => {
  const refs: any[] = [];
  const setRef = (v: any) => {
    if (batch === false) {
      refs[0] = v;
    } else if (!refs.includes(v)) {
      refs.push(v);
    }
    set(attar);
  };
  const set = (v: Partial<Attr> | ((ref: any) => Partial<Attr>)) => {
    refs.forEach((ref) => {
      const t = typeof v === "function" ? v(ref) : v;
      Object.entries({ ...attar, ...t }).forEach(([k, v]) => {
        if (v === false) {
          (ref as HTMLElement).removeAttribute(k);
          return;
        }
        (ref as HTMLElement)?.setAttribute(k, v);
      });
    });
  };
  return [setRef, set] as const;
};

export const useMemoFn = <T>(fn: () => T) => {
  let memo: T | undefined;
  const run = () => {
    if (memo) return memo;
    memo = fn();
    return memo;
  };
  const clear = () => {
    memo = undefined;
  };
  return [run, clear] as const;
};

export const withCreated = <P extends any[], R, F extends (...args: P) => R>(
  fn: (onCreated: (f: (v: R) => void) => void) => F
) => {
  const createdFns: any[] = [];
  const onCreated = (fn: any) => {
    createdFns.push(fn);
  };
  const runner = (...args: P) => {
    const f = fn(onCreated);
    const res = f(...args);
    createdFns.forEach((fn) => fn(res));
    return res;
  };
  return runner as F;
};

export const cn = (...args: (string | boolean | undefined)[]) =>
  className(args.filter((arg) => arg !== false || arg !== undefined) as string[]);
