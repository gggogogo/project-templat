import { defTZT, isFun } from './common'

export enum TZT_LOGIN_TYPE {
  // 系统登录
  SYSTEM = 0,
  // 交易登录
  TRADE = 1,
  // 融资融券登录
  MARGIN = 2,
  // 个股期权登录
  STOCK_OPTION = 8,
  // 担保品划转普通登录
  COLLATERAL_TRANSFER = 9,
}
export enum TZT_LOGIN_KIND {
  WEAK = 0,
  STRONG = 1,
  ADD_ACCOUNT = 2,
}

export interface LoginOption {
  jsfuncname?: string
  url?: string
  logintype?: number // 登录类型，0-系统登录 1-交易登录 2-融资融券登录 8-个股期权登录 9-担保品划转普通登录
  loginkind?: number //当logintype＝1时，判断登录方式，0-弱权限登录(通讯密码登录）1-强权限登录(交易密码登录) 2－添加账号
  isExport?: boolean //是否导出,默认false,true时只返回 url 不执行动作
}

export function login(callback: (() => void) | null, option: LoginOption): void | string {
  if (!defTZT()) return

  let params: LoginOption = {
    logintype: option.logintype || TZT_LOGIN_TYPE.TRADE,
    loginkind: option.loginkind || TZT_LOGIN_KIND.ADD_ACCOUNT,
    url: option.url || '',
    isExport: option.isExport || false,
  }

  if (option.isExport) {
    return encodeURIComponent(window.T.fn.action10090(params))
  }

  if (!option || !option.isExport) {
    window.LoginSucessCallBack = () => {
      if (isFun(callback)) {
        callback && callback()
      }
      window.LoginSucessCallBack = null
    }
    params.jsfuncname = 'LoginSucessCallBack'
  }

  window.T.fn.action10090(params)
  return
}
