
export function debounce(fn: (...args: any[])=> void, delay: number) {
  let timer: null | NodeJS.Timeout = null
  return (...args: any[]) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
        fn(...args)
    }, delay)
  }
}

export const UUID = ()=> {
    return String(
        Date.now().toString(32) +
        Math.random().toString(16)
    ).replace(/\./g, '')
}