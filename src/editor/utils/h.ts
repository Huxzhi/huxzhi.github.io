type Child = HTMLElement | string | number

type Props = {
    className: string
} & Record<`data-${string}`, any>
    & Record<`on${string}`, any>
    & Record<string, any>
export const h = <T extends keyof HTMLElementTagNameMap>(tag: T, props: Partial<Props> = {}, children: Child[] | Child = []) => {
    const el = document.createElement<T>(tag)
    const childs = Array.isArray(children) ? children : [children]
    childs.forEach((c) => {
        if (c instanceof HTMLElement) {
            el.appendChild(c)
            return
        }
        el.textContent = `${c}`
        return
    })
    Object.entries(props).forEach(([k, v]) => {
        if (k === "className") {
            el.className = v as string
            return
        }
        if (k.startsWith("on")) {
            const event = k.replace("on", "").toLowerCase()
            el.addEventListener(event, v as any)
            return
        }
        el.setAttribute(k, v as any)
    })

    return el
}