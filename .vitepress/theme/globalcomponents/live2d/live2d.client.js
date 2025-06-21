import { createApp, h } from 'vue'
import Live2dComponent from './components/Live2dComponent.client.vue'

// 判断 并加载 live2d.js 脚本
function loadLive2dScript() {
    return new Promise((resolve, reject) => {
        if (window.loadlive2d) {
            console.log('live2d脚本已加载')
            resolve()
            return
        }

        const script = document.createElement('script')
        script.src = '/live2d/lib/live2d.js'
        script.onload = () => {
            console.log('live2d脚本加载完成')
            resolve()
        }
        script.onerror = (err) => {
            console.error('live2d脚本加载失败', err)
            reject(err)
        }
        document.head.appendChild(script)
    })
}

/**
 * 创建并挂载Live2d组件
 * @param {Object} options - 配置选项
 * @returns {Object} - 包含destroy方法的对象
 */
export function mountLive2d(options) {
    // 默认配置
    const defaultOptions = {
        enable: true,
        model: {
            url: '/modellib/haru01/haru01.model.json'
        },
        display: {
            position: 'right',
            width: '135px',
            height: '300px',
            xOffset: '35px',
            yOffset: '5px'
        },
        mobile: {
            show: true
        },
        react: {
            opacity: 0.8
        }
    }

    // 合并配置
    const mergedOptions = { ...defaultOptions, ...options }

    // 确保在客户端环境
    if (typeof document === 'undefined') return null

    // 创建容器
    let container = document.getElementById('live2d-container')
    if (!container) {
        container = document.createElement('div')
        container.id = 'live2d-container'
        document.body.appendChild(container)
    }

    return loadLive2dScript().then(() => {
        // 确保脚本加载完成后再创建Vue应用
        return createAndMountApp(container, mergedOptions)
    })
}

/**
 * 创建并挂载Vue应用
 * @param {HTMLElement} container - 容器元素
 * @param {Object} options - 配置选项
 * @returns {Object} - 包含destroy方法的对象
 */
function createAndMountApp(container, options) {
    console.log('创建并挂载Vue应用', options)

    // 创建Vue应用
    const app = createApp({
        render() {
            return h(Live2dComponent, { live2dOptions: options })
        }
    })

    // 挂载应用
    app.mount(container)
    console.log('Vue应用已挂载到容器', container.id)

    window.loadlive2d('live2dCanvasElement', options.model.url)

    // 返回包含destroy方法的对象
    return {
        destroy() {
            console.log('销毁Vue应用')
            app.unmount()
            if (container.parentNode) {
                container.parentNode.removeChild(container)
            }
        }
    }
}
