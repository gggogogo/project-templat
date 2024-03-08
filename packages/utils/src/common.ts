export function defTZT(): boolean {
  if (!window.T) {
    console.log('window.T is not defined')
  }
  return !!(window && window.T)
}

export function isFun(fn: any): boolean {
  return typeof fn === 'function'
}

export default {
  defTZT,
  isFun,
}
