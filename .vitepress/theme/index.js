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
    // ...
    googleAnalytics({
      id: 'G-4D78S8YR6M', //跟踪ID，在analytics.google.com注册即可
    });
    // 注册组件
    app.component('Linkcard', Linkcard);
    app.component('xgplayer', xgplayer);
    app.component('ArticleMetadata', ArticleMetadata)
  }
}
