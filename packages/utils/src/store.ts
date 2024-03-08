import { defTZT } from './common'

export function tztGetLocalData(aKey: string): Promise<string | undefined> | void {
  if (!defTZT()) return
  return new Promise((resolve) => {
    window.T.readLocalMesg([aKey], function (data: Record<string, string>) {
      const upKey = aKey.toUpperCase()
      resolve(data[upKey])
    })
  })
}
