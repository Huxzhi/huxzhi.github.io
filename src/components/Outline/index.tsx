import { throttle } from "@/shared/debounce";
import * as React from "jsx-dom";
import "./style.scss";

export const mount = (selector: string) => {
  const root = document.querySelector(selector);
  if (!root) return;

  let headings: Element[] = [];

  const onScroll = throttle(() => {
    let i = headings.length - 1;
    for (i; i >= 0; i -= 1) {
      const h = headings[i];
      const v = h.getBoundingClientRect();
      if (v.top <= 80) {
        break;
      }
    }
    const closestElement = headings[i];
    Array.from(root.querySelector(".outlines")?.children ?? []).forEach((v) => {
      if (v.getAttribute("data-anchor-id") === closestElement?.id) {
        v.classList.add("!opacity-100");
      } else {
        v.classList.remove("!opacity-100");
      }
    });
  }, 200);
  document.addEventListener("scroll", onScroll, { passive: true });

  const create = () => {
    const toToggle = () => {
      // child.classList.toggle("[&_.outlines]:hidden");
      const el = child.querySelector<HTMLDivElement>(".outlines");
      if (!el) return;
      if (el?.style.display === "none") {
        el.style.removeProperty("display");
        child.classList.remove("md:w-[32px]");
      } else {
        el.style.display = "none";
        child.classList.add("md:w-[32px]");
      }
    };

    const slot = (
      <div class="outlines flex flex-col text-sm gap-1 py-2 max-h-[60vh] overflow-y-auto <md:hidden break-words"></div>
    );
    const child = (
      <div class="fixed top-[84px] right-[4px] bg-modal p-2 rounded shadow-lg md:shadow-none md:sticky md:top-[88px] <md:[&:focus-within_.outlines]:flex flex flex-col <md:w-auto w-[240px]">
        <div class="flex <md:justify-end" tabIndex={-1}>
          <button onClick={toToggle} title="toggle outline" class="<md:hidden">
            <div class="i-ri:menu-fold-4-fill"></div>
          </button>
          <button title="toggle outline" class="md:hidden">
            <div class="i-ri:menu-fold-4-fill"></div>
          </button>
        </div>
        {slot}
      </div>
    ) as HTMLElement;
    root.replaceChildren(child);
    return slot;
  };

  const slot = create();

  const update = () => {
    const pageRoot = document.querySelector(".ud-root");
    if (!pageRoot) return;
    const tags = ["h1", "h2", "h3", "h4", "h5", "h6"];
    const headingSelector = tags.map((tag) => `${tag}`).join(", ");
    headings = Array.from(pageRoot?.querySelectorAll(headingSelector) ?? []);
    slot?.replaceChildren(
      <>
        {headings.map((h) => (
          <a
            tabIndex={-1}
            href={`#${h.id}`}
            data-anchor-id={h.id}
            data-anchor-tag={h.tagName}
            class="opacity-50 hover:opacity-80 min-w-[180px]">
            {h.textContent}
          </a>
        ))}
      </>
    );
  };
  update();
  onScroll();
  return update;
};
