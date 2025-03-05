import { defineConfig } from 'vitepress'
import sidebarconfig from './sidebar.mjs'
import navconfig from './nav.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN', //语言，可选 en-US
  title: "柚子成长站",
  description: "汇聚点滴，有所收获",
  // appearance: 'dark',
  // 站点地图
  sitemap: {
    hostname: 'https://www.xinfei.fun',
  },
  srcDir: './src',
  vite: {
    publicDir: '../public'  // 相对路径，从 srcDir 向上回退   
  },
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.ico',
    darkModeSwitchLabel: '深浅模式',
    //侧边栏文字更改(移动端) //
    sidebarMenuLabel: '目录',
    //返回顶部文字修改 //
    returnToTopLabel: '返回顶部',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            displayDetails: '详细/简略模式',
            resetButtonTitle: '重置搜索',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '输入',
              navigateText: '导航',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'esc'
            }
          }
        }
      }
    },
    nav: navconfig,
    sidebar: sidebarconfig,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/1012039590' }
    ],

    footer: {
      message: '<a href="https://beian.miit.gov.cn/" target="_blank">鄂ICP备2025094437号-1</a>',
      copyright: 'Copyright © 2025-present Baker Kong'
    },

    outline: {
      level: 'deep',
      label: '当前页大纲'
    },

    lastUpdated: {
      text: '更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  }
})
