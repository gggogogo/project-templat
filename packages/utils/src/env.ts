class Env {
  /**
   * 是否是APP环境
   */
  isAPP: boolean

  /**
   * 是否是浏览器环境
   */
  isBrowser: boolean

  /**
   * 是否是Node环境
   */
  isNode: boolean

  /**
   * 是否是IOS APP
   */
  isIOS: boolean

  /**
   * 是否是Android APP
   */
  isAndroid: boolean

  /**
   * 测试环境
   */
  isBeta: boolean

  constructor() {
    this.isAPP = false
    this.isNode = false
    this.isBrowser = true

    this.isIOS = false
    this.isAndroid = false

    this.isBeta = false

    this.createEnv()
  }

  createEnv(context?: any) {
    const ua = context?.ua || window.navigator.userAgent

    this.isAPP = /crsectzt/i.test(ua)
    this.isBrowser = !this.isAPP
    this.isNode =
      typeof process !== 'undefined' && process.versions != null && process.versions.node != null

    this.isIOS = this.isAPP && /iphone|ipad|ipod|ios/i.test(ua)
    this.isAndroid = this.isAPP && /android/i.test(ua)

    this.isBeta = /beta=1/i.test(location.href) || /(local)|(localhost)/i.test(location.host)
  }
}

export const env = new Env()
// export default env
