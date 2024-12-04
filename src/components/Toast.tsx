import { sleep } from "@/shared/debounce";
import { cn } from "@/utils/dom";
import * as React from "jsx-dom";

const SELECTOR_ID = "toast-wrapper";

const Style = {
  success: {
    bg: "bg-green",
    icon: "i-material-symbols:check-circle-outline-rounded",
  },
  warn: {
    bg: "bg-yellow",
    icon: "i-material-symbols:info-outline-rounded",
  },
  error: {
    bg: "bg-red",
    icon: "i-material-symbols:error-outline-rounded",
  },
};

export default function toast(title: string, type: "success" | "error" | "warn" = "success") {
  const root = (() => {
    const rt = document.querySelector<HTMLDivElement>(`#${SELECTOR_ID}`);
    if (rt) return rt;
    const el = (
      <div
        id={SELECTOR_ID}
        class="w-full fixed left-0 top-0 z-[110] pointer-events-none flex flex-col items-center pt-8 p-2 gap-2 transition-all"></div>
    ) as HTMLDivElement;
    document.body.appendChild(el);
    return el;
  })();

  const show = async () => {
    const el = (
      <div
        class={cn(
          "rounded min-w-[200px] max-w-[90vw] px-2 py-1 pointer-events-auto rounded shadow text-white flex justify-center items-center gap-1 transition-all",
          Style[type].bg
        )}>
        <div class={Style[type].icon}></div>
        <div class="flex items-center">{title}</div>
      </div>
    ) as HTMLElement;
    const cs = ["translate-y-[-100%]", "opacity-0"];
    el.classList.add(...cs);
    root.insertBefore(el, root.firstChild);
    await sleep(10);
    el.classList.remove(...cs);
    await sleep(3000);
    el.classList.add(...cs);
    await sleep(200);
    el.remove();
  };
  return show();
}
