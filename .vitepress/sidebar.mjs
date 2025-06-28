/*
 * @Author: felixzhou9191 felixzhou9191@gmail.com
 * @Date: 2025-03-25 23:46:24
 * @LastEditors: felixzhou9191 felixzhou9191@gmail.com
 * @LastEditTime: 2025-03-25 23:55:35
 * @FilePath: \YouZi_Stack\.vitepress\sidebar.mjs
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { generateSidebar } from 'vitepress-sidebar';

export default generateSidebar([
    {
        documentRootPath: '/src',
        scanStartPath: 'blog/basic',
        basePath: '/blog/basic/',
        resolvePath: '/blog/basic/',
        rootGroupText: '基础巩固',
        sortMenusByFrontmatterOrder: true
    },
    {
        documentRootPath: '/src',
        scanStartPath: 'blog/advanced',
        basePath: '/blog/advanced/',
        resolvePath: '/blog/advanced/',
        rootGroupText: '进阶学习',
        sortMenusByFrontmatterOrder: true
    },
    {
        documentRootPath: '/src',
        scanStartPath: 'blog/enhancement',
        basePath: '/blog/enhancement/',
        resolvePath: '/blog/enhancement/',
        rootGroupText: '强化拓展',
        sortMenusByFrontmatterOrder: true
    },
    {
        documentRootPath: '/src',
        scanStartPath: 'other',
        basePath: '/other/',
        resolvePath: '/other/',
        rootGroupText: '随想录',
        sortMenusByFrontmatterOrder: true
    },
    {
        documentRootPath: '/src',
        scanStartPath: 'daily',
        basePath: '/daily/',
        resolvePath: '/daily/',
        rootGroupText: '每日一题',
        sortMenusByFrontmatterOrder: true
    },
    {
        documentRootPath: '/src',
        scanStartPath: 'category/csstrick',
        basePath: '/category/csstrick/',
        resolvePath: '/category/csstrick/',
        rootGroupText: 'CSS 揭秘',
        sortMenusByFrontmatterOrder: true
    },
    {
        documentRootPath: '/src',
        scanStartPath: 'category/algorithm',
        basePath: '/category/algorithm/',
        resolvePath: '/category/algorithm/',
        rootGroupText: '算法专栏',
        sortMenusByFrontmatterOrder: true
    },
    {
        documentRootPath: '/src',
        scanStartPath: 'category/resnav',
        basePath: '/category/resnav/',
        resolvePath: '/category/resnav/',
        rootGroupText: '资源导航',
        sortMenusByFrontmatterOrder: true
    }
])
