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
      {
        icon: {
          svg: '<svg t="1741167583897" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12869" width="64" height="64"><path d="M0 0m87.267556 0l849.464888 0q87.267556 0 87.267556 87.267556l0 849.464888q0 87.267556-87.267556 87.267556l-849.464888 0q-87.267556 0-87.267556-87.267556l0-849.464888q0-87.267556 87.267556-87.267556Z" fill="#444444" p-id="12870"></path><path d="M755.143111 561.265778a33.336889 33.336889 0 1 1 32.995556-33.450667 33.223111 33.223111 0 0 1-32.995556 33.450667m-169.756444 0a33.336889 33.336889 0 1 1 32.995555-33.450667 33.223111 33.223111 0 0 1-32.995555 33.450667m321.194666 47.445333c0-107.861333-96.028444-196.266667-217.884444-203.889778h-17.066667c-129.820444 0-235.064889 91.022222-235.064889 204.8a176.469333 176.469333 0 0 0 7.168 48.355556c25.031111 89.201778 117.532444 155.306667 227.555556 155.306667a261.688889 261.688889 0 0 0 104.334222-21.276445l52.679111 36.067556s14.108444 9.784889 12.743111-9.102223l-14.904889-56.888888a193.422222 193.422222 0 0 0 79.644445-153.713778M311.637333 378.766222a33.336889 33.336889 0 1 1 32.995556-33.336889 33.109333 33.109333 0 0 1-32.995556 33.336889m207.758223-66.673778a33.336889 33.336889 0 1 1-32.995556 33.336889 33.223111 33.223111 0 0 1 32.995556-33.336889M671.288889 386.844444h15.018667C667.306667 273.066667 554.097778 185.571556 417.450667 185.571556c-150.300444 0-272.042667 106.154667-272.042667 236.771555a225.507556 225.507556 0 0 0 97.28 182.044445l-20.138667 75.776S216.177778 704.739556 241.664 694.044444l74.979556-51.2a304.696889 304.696889 0 0 0 100.807111 16.952889h8.988444a194.901333 194.901333 0 0 1-6.712889-50.289777C419.726222 486.627556 532.707556 386.844444 671.288889 386.844444" fill="#FFFFFF" p-id="12871"></path></svg>'
        },
        link: 'https://www.xinfei.fun/wx/index.html',
        // You can include a custom label for accessibility too (optional but recommended):
        ariaLabel: 'wechat'
      },
      { icon: 'github', link: 'https://github.com/1012039590/YouZi_Stack' }
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
