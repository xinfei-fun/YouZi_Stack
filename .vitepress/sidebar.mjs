import { loadJson } from './theme/utils/loadJson.mjs'

const sidebarData = loadJson('./.vitepress/plugins/_sidebar.json');

const blog_basic_items = sidebarData.filter(item => item.url.startsWith('/blog/basic/')).map(item => ({
    text: item.url.split('/').pop().replace(/\.[^/.]+$/, ""),
    link: item.url
}));

const daily_items = sidebarData.filter(item => item.url.startsWith('/daily/')).map(item => ({
    text: item.url.split('/').pop().replace(/\.[^/.]+$/, ""),
    link: item.url
}));

const other_items = sidebarData.filter(item => item.url.startsWith('/other/')).map(item => ({
    text: item.url.split('/').pop().replace(/\.[^/.]+$/, ""),
    link: item.url
}));

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
                ...blog_basic_items
            ]
        }
    ],
    '/daily/': [
        {
            text: '每日一题',
            collapsed: false,
            items: [
                ...daily_items
            ]
        }
    ],
    '/other/': [
        {
            text: '随想录',
            collapsed: false,
            items: [
                ...other_items
            ]
        }
    ]
}

