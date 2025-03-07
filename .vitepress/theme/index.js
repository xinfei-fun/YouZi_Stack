// https://vitepress.dev/guide/custom-theme
import { h, onMounted, watch, nextTick } from 'vue'
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
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import mediumZoom from 'medium-zoom';
import { useData, useRoute } from 'vitepress';

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
  },
  setup() {
    // Get frontmatter and route
    const { frontmatter } = useData();
    const route = useRoute();

    // giscus配置
    giscusTalk({
      repo: 'xinfei-fun/YouZi_Stack', //仓库
      repoId: 'R_kgDOODbeHw', //仓库ID
      category: 'General', // 讨论分类
      categoryId: 'DIC_kwDOODbeH84CnpPS', //讨论分类ID
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'zh-CN',
    },
      {
        frontmatter, route
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    );

    // 图片放大
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  }
}
