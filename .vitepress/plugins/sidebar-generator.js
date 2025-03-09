// 这是一个vite 前置插件，用于生成 侧边栏数据

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createContentLoader } from 'vitepress'

export default function sidebarGenerator(options = {}) {
    const defaultOptions = {
        contentGlob: './**/*.md',
        outputPath: resolve(process.cwd(), '.vitepress/plugins/_sidebar.json')
    }
    const mergedOpts = { ...defaultOptions, ...options }

    let loader;

    const initLoader = () => {
        if (!loader) {
            loader = createContentLoader(mergedOpts.contentGlob, {
                // transform(result) {
                //     return result.filter(item => item.url.endsWith('.html'))
                // }
            });
        }
    }

    const generateSidebar = async () => {
        initLoader();
        const rawData = await loader.load();
        writeFileSync(mergedOpts.outputPath, JSON.stringify(rawData, null, 2), 'utf-8');

        console.log(`✅ 侧边栏数据已生成: ${mergedOpts.outputPath}`);
    }

    return {
        name: 'vite-plugin-sidebar-generator',

        // 构建时生成
        buildStart: generateSidebar,

        // 开发模式配置
        configureServer(server) {
            initLoader();
            server.watcher.add(loader.watch);
            server.watcher.on('change', async (file) => {
                if (file.endsWith('.md')) {
                    generateSidebar();
                }
            });
        }
    }
}
