<template>
  <div class="btn-box" :style="{ bottom: btnStyle?.bottom ? btnStyle?.bottom : '40px' }">
    <div v-if="isWeixin && needWX">
      <div v-show="!showBtn">
        <van-loading type="spinner" color="#ffffff" size="14px" />
      </div>
      <wx-open-launch-app
        id="launch-btn"
        appid="wx2c60b27719caea3d"
        @launch="buryPoint"
        @error="downLoadApp"
        :extinfo="extinfo"
        style="display: block"
      >
        <template>
          <div class="btn" :style="btnStyle">{{ content }}</div>
        </template>
      </wx-open-launch-app>
    </div>
    <div v-if="!isWeixin && needExternal">
      <a :href="aLink" @click="openApp" class="btn" :style="btnStyle">{{ content }}</a>
    </div>
  </div>
</template>
<script>
import fetch from './common'
import { Loading, Field } from 'vant'
import buryPoint from '@/services/yzh/apiProtocol/buryPoint'
import Vue from 'vue'
Vue.use(Loading)
Vue.config.ignoredElements = ['wx-open-launch-app']
const ua = navigator.userAgent.toLowerCase()
export default {
  props: {
    // 是否需要微信跳转
    needWX: {
      type: Boolean,
      default: true,
    },
    // 是否需要浏览器跳转
    needExternal: {
      type: Boolean,
      default: true,
    },
    // 微信跳转的域名
    shareUrl: {
      type: String,
      default:
        process.env.VUE_APP_RELEASE === 'sit'
          ? 'https://wxact.crsec.com.cn:6688/wxtoapp'
          : 'https://wxact.crsec.com.cn:6688',
    },
    // 微信浏览器跳转url
    extinfo: '',
    // 浏览器跳转url
    aLink: '',
    btnStyle: {
      type: Object,
      default: () => {},
    },
    // button的内容
    content: {
      type: String,
      default: '打开APP',
    },
    // 微信分享配置信息
    wxOption: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.initWxConfig()
  },
  components: {
    [Field.name]: Field,
  },
  data() {
    return {
      showBtn: false,
      isWeixin: ua.indexOf('micromessenger') !== -1,
      timer: null,
    }
  },
  destroyed() {
    window.removeEventListener('visibilitychange', null)
  },
  deactivated() {
    window.removeEventListener('visibilitychange', null)
  },
  methods: {
    buryPoint() {
      var json = {
        loginNum: '',
        pageId: 'third_marketing',
        eventId: 'hd_goto_app',
      }
      buryPoint.buryPointCount(json).then(() => {
        this.$emit('trackEvent')
      })
    },
    initWxConfig() {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js'
      document.body.appendChild(script)
      let url = encodeURIComponent(this.shareUrl)
      if (!this.shareUrl) {
        url = window.location.href
        const index = url.indexOf('#')
        if (index > 0) {
          url = url.substring(0, index)
        }
        url = encodeURIComponent(url)
      }
      const params = { url, weixinpk: 'gh_8d6ee6b5ba5c', funcNo: '1000003' }
      fetch('https://weixin.hrsec.com.cn/servlet/json', params).then((res) => {
        const { appid, timestamp, nonceStr, signature } = res.data.results[0]
        // eslint-disable-next-line no-undef
        wx.config({
          debug: false,
          appId: appid,
          timestamp,
          nonceStr,
          signature,
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
          ],
          openTagList: ['wx-open-launch-app'],
        })
        wx.ready(() => {
          console.log('微信参数初始化完毕')
          this.showBtn = true
          if (Object.keys(this.wxOption) > 0 && this.isWeixin) {
            wx.onMenuShareTimeline({
              title: this.wxOption.title, // 分享标题
              desc: this.wxOption.desc, // 分享描述
              imgUrl: this.wxOption.imgUrl, // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              },
            })
            wx.onMenuShareAppMessage({
              title: this.wxOption.title, // 分享标题
              desc: this.wxOption.desc, // 分享描述
              imgUrl: this.wxOption.imgUrl, // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
                this.$emit('successCallback')
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
                this.$emit('cancelCallback')
              },
            })
            wx.onMenuShareQQ({
              title: this.wxOption.title, // 分享标题
              desc: this.wxOption.desc, // 分享描述
              imgUrl: this.wxOption.imgUrl, // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
                this.$emit('successCallback')
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
                this.$emit('cancelCallback')
              },
            })
            wx.onMenuShareWeibo({
              title: option.title, // 分享标题
              desc: option.desc, // 分享描述
              imgUrl: option.imgUrl, // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
                this.$emit('successCallback')
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
                this.$emit('cancelCallback')
              },
            })
          }
        })
      })
    },
    downLoadApp() {
      window.location.href =
        'https://sj.qq.com/myapp/detail.htm?apkName=com.hexin.plat.android.HuarongSecurity'
    },
    watchVisibility() {
      window.addEventListener('visibilitychange', () => {
        // 监听页面visibility
        if (document.hidden) {
          // 如果页面隐藏了，则表示唤起成功，这时候需要清除下载定时器
          clearTimeout(this.timer)
        }
      })
    },
    openApp() {
      this.watchVisibility()
      this.timer = setTimeout(() => {
        this.downLoadApp()
      }, 6000)
    },
  },
}
</script>
<style lang="scss" scoped>
.btn-box {
  position: fixed;
  text-align: center;
  width: 100%;
  z-index: 10;
  .btn {
    display: block;
    background: transparent;
    font-size: 16px;
    border: 1px solid #fff;
  }
}
</style>
