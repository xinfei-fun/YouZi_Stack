import { generateSidebar } from 'vitepress-sidebar';

export default generateSidebar([
    {
        documentRootPath: '/src',
        scanStartPath: 'blog/basic',
        basePath: '/blog/basic/',
        resolvePath: '/blog/basic/',
        rootGroupText: '基础巩固'
    },
    {
        documentRootPath: '/src',
        scanStartPath: 'blog/advanced',
        basePath: '/blog/advanced/',
        resolvePath: '/blog/advanced/',
        rootGroupText: '进阶学习'
    },
    {
        documentRootPath: '/src',
        scanStartPath: 'blog/enhancement',
        basePath: '/blog/enhancement/',
        resolvePath: '/blog/enhancement/',
        rootGroupText: '强化拓展'
    },
    {
        documentRootPath: '/src',
        scanStartPath: 'other',
        basePath: '/other/',
        resolvePath: '/other/',
        rootGroupText: '随想录'
    },
    {
        documentRootPath: '/src',
        scanStartPath: 'daily',
        basePath: '/daily/',
        resolvePath: '/daily/',
        rootGroupText: '每日一题'
    }
])