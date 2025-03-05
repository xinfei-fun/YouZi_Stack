/** @type {import('vitepress').DefaultTheme.Config.Sidebar}  */
export default {
    '/blog/basic/': [
        {
            text: '基础巩固',
            collapsed: false,
            items: [
                {
                    text: '📖 阅读须知',
                    link: '/blog/basic/index.md'
                },
                {
                    text: '浏览器渲染原理01',
                    link: '/blog/basic/浏览器渲染原理01'
                }
            ]
        }
    ],
    '/daily/': [
        {
            text: '每日一题',
            collapsed: false,
            items: [
                {
                    text: '浏览器精确计时问题',
                    link: '/daily/浏览器精确计时问题'
                }
            ]
        }
    ],
    '/other/': [
        {
            text: '随想录',
            collapsed: false,
            items: [
                {
                    text: 'api-examples',
                    link: '/other/api-examples'
                },
                {
                    text: 'markdown-examples',
                    link: '/other/markdown-examples'
                }
            ]
        }
    ]
}

