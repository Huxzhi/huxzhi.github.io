import { formatSecond } from '@/utils/time'

export const mount = (attr: string = 'data-acc-time') => {
  const selector = `[${attr}]`

  const update = () => {
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      const v = el.getAttribute(attr)
      if (!v) return
      const t = Number(v)
      if (isNaN(t)) return
      el.textContent = formatSecond(t)
    })
  }

  // Initial update
  update()

  // Update every minute to keep relative times fresh
  const timer = setInterval(update, 60 * 1000)

  // Return unmount function
  return () => {
    clearInterval(timer)
  }
}

export default { mount }
