import { env } from './env'
import { login } from './login'

//是否隐藏客户端标题 1隐藏，0或不传不隐藏
export enum TZT_HIDDEN_TITLE_ENUM {
  HIDDEN = 1,
  NOT_HIDDEN = 0,
}

// 是否全屏展示 0-否，1-是
export enum TZT_FULL_SCREEN_ENUM {
  NOT_FULL_SCREEN = 0,
  FULL_SCREEN = 1,
}

const DefaultOptions: openWebviewOption = {
  secondtype: 9,
  fullscreen: TZT_FULL_SCREEN_ENUM.NOT_FULL_SCREEN,
  tzthiddentitle: TZT_HIDDEN_TITLE_ENUM.NOT_HIDDEN,
  tztadjustnever: 0,
  tzthtopstatusBar: 1,
}

/*
 * 参数说明：
 * type/secondtype
 *  @0、个股查询
 *  @1、修改字体(客户端处理)
 *  @2、订阅(后面需要带上订阅点击打开的地址）
 *  @3、修改(需要带上修改所要打开的地址）
 *  @4、我要开户(需要带上开户地址）
 *  @5、在线客服(需要带上在线客服地址）
 *  @6、筛选 （文字）(需要带上筛选链接地址）
 *  @7、筛选1（图片）(需要带上筛选链接地址）
 *  @8、快捷方式
 *  @9、右侧没有按钮
 *  @98:自定义(显示对应图片)
 *  @99:自定义(设置为默认底图，显示对应文本)
 * fullScreen@是否全屏展示 0-否，1-是
 * url@当前需要打开的url地址
 * secondurl@右侧按钮根据type不同，返回的链接地址，用于type(或secondtype)对应按钮点击的界面跳转，未设置secondjsfuncname有效
 * secondjsfuncname@页面对应JS函数名(就是函数的调用'js()')
 * firstjsfuncname@页面对应JS函数名
 * firsturl@左侧按钮根据firsttype不同，返回的链接地址，用于firsttype对应按钮点击的界面跳转，未设置firstjsfuncname有效
 * firsttext@firsttype=99时有效，显示对应文本或firsttype=98时有效，显示对应图片
 * skintype:   默认背景色 0-黑色 1-白色，为空，则默认当前使用的主题颜色
 * tzthiddentitle 是否隐藏客户端标题 1隐藏，0或不传不隐藏
 * tzthtopstatusBar 是否空出系统状态栏，0-预留出系统状态栏，其他不预留
 * tztadjustnever：1-不保留，0-保留，默认是保留
 * */
export interface openWebviewOption {
  fullscreen?: TZT_FULL_SCREEN_ENUM //是否全屏展示 0-否，1-是
  tzthiddentitle?: TZT_HIDDEN_TITLE_ENUM //是否隐藏客户端标题 1隐藏，0或不传不隐藏
  tzthtopstatusBar?: number //是否空出系统状态栏，0-预留出系统状态栏，其他不预留
  secondtype?: number
  tztadjustnever?: number
  isExport?: boolean
  aTitle?: string //10061使用的标题字段
  title?: string //标题
  hiddenTitle?: boolean //隐藏标题栏快捷配置
  login?: boolean //是否需要登录
}

/**
 * TZT 10061 跳转
 * @param url
 * @param option
 */
export function open(url: string, options: openWebviewOption = {}): void | string {
  // 非导出链接，且在浏览器、APP内无TZT 环境下直接打开
  if (!options?.isExport && (env.isBrowser || (env.isAPP && !window.T))) {
    window.open(url)
    return
  }

  /**
   * 自定义参数 title、hiddenTitle、login 逻辑处理
   */
  if (options?.title) {
    options.aTitle = options.title
    delete options.title
  }

  if (options?.hiddenTitle) {
    options.fullscreen = 1
    options.tzthiddentitle = 1
    options.tztadjustnever = 1
    options.tzthtopstatusBar = 1
    delete options.hiddenTitle
  }

  let sUrl = ''
  let param = Object.assign({}, DefaultOptions, options, {
    aTitle: encodeURIComponent(options?.aTitle || ''),
    url,
  })

  if (options?.login || options?.isExport) {
    param.isExport = true
    sUrl = window.T.fn.action10061(param)
    if (options?.login && options?.isExport) {
      sUrl = login(null, {
        url: sUrl,
        isExport: true,
      }) as unknown as string
      return sUrl
    } else if (options?.login && !options?.isExport) {
      login(null, {
        url: sUrl,
      })
      return
    } else if (!options?.login && options?.isExport) {
      return sUrl
    }
  }

  window.T.fn.action10061(param)
}
