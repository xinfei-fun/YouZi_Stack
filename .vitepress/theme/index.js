// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custom.css'
import googleAnalytics from 'vitepress-plugin-google-analytics'
import 'virtual:group-icons.css'
import { Fragment } from 'vue'
import confetti from './globalcomponents/confetti.vue'
import MouseClick from './globalcomponents/MouseClick.vue'
import MouseFollower from './globalcomponents/MouseFollower.vue'
import ArticleMetadata from './globalcomponents/articlemetadata/ArticleMetadata.vue'
import BackToTop from './globalcomponents/BackToTop.vue'
import { inBrowser } from 'vitepress'
import { NProgress } from 'nprogress-v2/dist/index.js' // 进度条组件
import 'nprogress-v2/dist/index.css' // 进度条样式
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from "vitepress-plugin-image-viewer/lib/vImageViewer.vue";
import { useData, useRoute } from 'vitepress';
import MermaidPreview from './globalcomponents/MermaidPreview.vue'
import loadingPlugin from './directives/index.js'

/** @type {import('vitepress').Theme} */
export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            'doc-footer-before': () => h(Fragment, [
                h(BackToTop),
                h(MermaidPreview)
            ]),
            'layout-top': () => h(Fragment, [
                h(confetti),
                h(MouseClick),
                h(MouseFollower),
            ])  // https://vitepress.dev/guide/extending-default-theme#layout-slots
        })
    },
    enhanceApp({ app, router, siteData }) {
        // 注册组件
        app.component('ArticleMetadata', ArticleMetadata);
        app.component("vImageViewer", vImageViewer);

        app.use(loadingPlugin)

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
            id: 'G-XFGL4906FV', //跟踪ID，在analytics.google.com注册即可
        });
    },
    setup() {
        // Get frontmatter and route
        const { frontmatter } = useData();
        const route = useRoute();

        // giscus配置
        giscusTalk(
            {
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
            //您可以使用"comment:true"序言在页面上单独启用它
            true
        );

        // 图片放大
        imageViewer(route, undefined, {
            button: false,
            toolbar: false,
            zoomRatio: 0.2,
            className: 'yz_vimageviewer'
        });

        // 看板娘
        if (inBrowser) {
            console.log('开始加载看板娘组件');
            import('./globalcomponents/live2d/live2d.client.js').then(module => {
                console.log('看板娘模块加载成功');

                const { mountLive2d } = module;
                return mountLive2d({
                    enable: true,
                    model: {
                        url: '/modellib/haru01/haru01.model.json'
                    },
                    display: {
                        position: 'left',
                        width: '135px',
                        height: '300px',
                        xOffset: '30px',
                        yOffset: '10px'
                    },
                    mobile: {
                        show: true
                    },
                    react: {
                        opacity: 0.8
                    }
                })
            }).catch(err => {
                console.error('Failed to load live2d module:', err);
            });
        }
    }
}
