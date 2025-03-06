// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custom.css'
import googleAnalytics from 'vitepress-plugin-google-analytics'
import 'virtual:group-icons.css'
import { Fragment } from 'vue'
import Linkcard from './globalcomponents/Linkcard.vue'
import xgplayer from './globalcomponents/xgplayer.vue'
import confetti from './globalcomponents/confetti.vue'
import MouseClick from './globalcomponents/MouseClick.vue'
import MouseFollower from './globalcomponents/MouseFollower.vue'
import ArticleMetadata from './globalcomponents/ArticleMetadata.vue'
import BackToTop from './globalcomponents/BackToTop.vue'
import { inBrowser } from 'vitepress'
import { NProgress } from 'nprogress-v2/dist/index.js' // 进度条组件
import 'nprogress-v2/dist/index.css' // 进度条样式

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(BackToTop),
      'layout-top': () => h(Fragment, [
        h(confetti),
        h(MouseClick),
        h(MouseFollower),
      ])  // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 注册组件
    app.component('Linkcard', Linkcard);
    app.component('xgplayer', xgplayer);
    app.component('ArticleMetadata', ArticleMetadata);

    if (inBrowser) {
      NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start() // 开始进度条
      }
      router.onAfterRouteChange = () => {        
        NProgress.done() // 停止进度条
      }
    }

    // ...
    googleAnalytics({
      id: 'G-4D78S8YR6M', //跟踪ID，在analytics.google.com注册即可
    });
  }
}
