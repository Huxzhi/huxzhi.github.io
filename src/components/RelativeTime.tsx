import { formatSecond } from "../shared/time";

export const mount = (attr: string) => {
  const divs = document.querySelectorAll<HTMLElement>(`[${attr}]`);
  divs.forEach((div) => {
    const accTime = div.getAttribute(attr);
    if (accTime === null) return;
    const time = Number(accTime);
    div.textContent = `${formatSecond(time)}`;
  });
};
