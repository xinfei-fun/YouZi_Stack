// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import googleAnalytics from 'vitepress-plugin-google-analytics'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    googleAnalytics({
      id: 'G-4D78S8YR6M', //跟踪ID，在analytics.google.com注册即可
    })
  }
}
