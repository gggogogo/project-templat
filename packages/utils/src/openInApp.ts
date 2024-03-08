import type { openWebviewOption } from './open'
import type { LoginOption } from './login'
import { defTZT } from './common'
import { open } from './open'

export interface openInAppOption extends openWebviewOption, LoginOption {}
export function openInApp(h5Url: string, option?: openInAppOption): void {
  // crsecapptzt://crsecpath=http%3A%2F%2Faction%3A10090%2F%3Flogintype%3D1%26%26loginkind%3D2%26%26url%3Dhttp%253A%252F%252Faction%253A50002%252F%253Ffullscreen%253D0%2526%2526secondtype%253D9%2526%2526url%253Dhttps%253A%252F%252Fcrtest13.crsec.com.cn%253A8005%252Fkacs_req%252Fsso_kwl%253Fchannel%253Dgxzq%2526src%253Dall
  if (!defTZT()) return

  let sUrl = open(h5Url, Object.assign({}, option, { isExport: true })) as unknown as string
  // window.T.fn.action10061(Object.assign(defaultParams, { ...option, url: h5Url, isExport: true }))

  const schemeUrl = `crsecapptzt://crsecpath=${sUrl}`
  window.open(schemeUrl)
}
