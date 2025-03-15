import { defineConfig } from 'vitepress'
import sidebarconfig from './sidebar.mjs'
import navconfig from './nav.mjs'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import taskLists from 'markdown-it-task-checkbox'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { visualizer } from 'rollup-plugin-visualizer'
import sidebarGenerator from './plugins/sidebar-generator'

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

// https://vitepress.dev/reference/site-config
const config = defineConfig({
  base: '/',
  lang: 'zh-CN', //语言，可选 en-US
  title: "柚子成长站",
  description: "汇聚点滴，有所收获",
  // appearance: 'dark',
  // 站点地图
  sitemap: {
    hostname: 'https://www.xinfei.fun',
  },
  cleanUrls: false,
  srcDir: './src',
  vite: {
    publicDir: '../public', // 相对路径，从 srcDir 向上回退   
    plugins: [
      visualizer({
        template: "treemap",
        sourcemap: false,
        open: false,
        gzipSize: true,
        brotliSize: true
      }),
      groupIconVitePlugin(), //代码组图标
      sidebarGenerator()
    ],
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks: {
            'live2d': ['.vitepress/theme/globalcomponents/live2d/index.ts']
          }
        }
      }
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true
    },
    config(md) {
      md.use(groupIconMdPlugin); //代码组图标
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options);
        if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`;
        return htmlResult;
      }
      md.use(taskLists) //todo
    },
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
      provider: 'algolia',
      options: {
        appId: 'IQL7R3ODWD',
        apiKey: 'beb5404457e245cc1397d34625586ac4',
        indexName: 'xinfei',
        locales: {
          root: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                },
              },
            },
          },
        },
      },
    },
    nav: navconfig,
    sidebar: sidebarconfig,

    socialLinks: [
      {
        icon: {
          svg: '<svg t="1703483542872" class="icon" viewBox="0 0 1309 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6274" width="200" height="200"><path d="M1147.26896 912.681417l34.90165 111.318583-127.165111-66.823891a604.787313 604.787313 0 0 1-139.082747 22.263717c-220.607239 0-394.296969-144.615936-394.296969-322.758409s173.526026-322.889372 394.296969-322.889372C1124.219465 333.661082 1309.630388 478.669907 1309.630388 656.550454c0 100.284947-69.344929 189.143369-162.361428 256.130963zM788.070086 511.869037a49.11114 49.11114 0 0 0-46.360916 44.494692 48.783732 48.783732 0 0 0 46.360916 44.494693 52.090549 52.090549 0 0 0 57.983885-44.494693 52.385216 52.385216 0 0 0-57.983885-44.494692z m254.985036 0a48.881954 48.881954 0 0 0-46.09899 44.494692 48.620028 48.620028 0 0 0 46.09899 44.494693 52.385216 52.385216 0 0 0 57.983886-44.494693 52.58166 52.58166 0 0 0-57.951145-44.494692z m-550.568615 150.018161a318.567592 318.567592 0 0 0 14.307712 93.212943c-14.307712 1.080445-28.746387 1.768001-43.283284 1.768001a827.293516 827.293516 0 0 1-162.394168-22.296458l-162.001279 77.955749 46.328175-133.811485C69.410411 600.858422 0 500.507993 0 378.38496 0 166.683208 208.689602 0 463.510935 0c227.908428 0 427.594322 133.18941 467.701752 312.379588a427.463358 427.463358 0 0 0-44.625655-2.619261c-220.24709 0-394.100524 157.74498-394.100525 352.126871zM312.90344 189.143369a64.270111 64.270111 0 0 0-69.803299 55.659291 64.532037 64.532037 0 0 0 69.803299 55.659292 53.694846 53.694846 0 0 0 57.852923-55.659292 53.465661 53.465661 0 0 0-57.852923-55.659291z m324.428188 0a64.040926 64.040926 0 0 0-69.574114 55.659291 64.302852 64.302852 0 0 0 69.574114 55.659292 53.694846 53.694846 0 0 0 57.951145-55.659292 53.465661 53.465661 0 0 0-57.951145-55.659291z" p-id="6275"></path></svg>'
        },
        link: 'https://www.xinfei.fun/wx/index.html',
        // You can include a custom label for accessibility too (optional but recommended):
        ariaLabel: 'wechat'
      },
      { icon: 'github', link: 'https://github.com/xinfei-fun/YouZi_Stack' }
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
    },

    //编辑本页 //
    editLink: {
      pattern: 'https://github.com/xinfei-fun/YouZi_Stack/edit/main/src/:path', // 改成自己的仓库
      text: '在GitHub编辑本页'
    },

    //自定义上下页名 //
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
  }
})

export default withMermaid(config)
