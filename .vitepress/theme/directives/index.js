// .vitepress/plugins/loading.js
import { createVNode, render } from 'vue'
import GridLoading from '../globalcomponents/GridLoading.vue'

// 创建指令
const loadingDirective = {
    mounted(el, binding) {
        // 创建容器
        const container = document.createElement('div')
        container.className = 'v-loading-wrapper'

        // 创建虚拟节点
        const vnode = createVNode(GridLoading, {
            modelValue: binding.value,
            // 继承上下文
            _: {
                parent: binding.instance?.$.parent,
                appContext: binding.instance?.$.appContext
            }
        })

        // 渲染到 DOM
        render(vnode, container)

        // 存储引用
        el._loading = { vnode, container }

        // 设置宿主定位
        if (getComputedStyle(el).position === 'static') {
            el.style.position = 'relative'
        }
        el.appendChild(container)
    },
    updated(el, binding) {
        if (el._loading?.vnode.component?.props) {
            // 直接更新 props
            el._loading.vnode.component.props.modelValue = binding.value
            // 触发组件更新
            el._loading.vnode.component.update()
        }
    },
    beforeUnmount(el) {
        if (el._loading) {
            render(null, el._loading.container)
            el._loading.container.remove()
            delete el._loading
        }
    }
}


const loadingPlugin = {
    install(app) {

        // 注册全局指令
        app.directive('loading', loadingDirective)
    }
}

export default loadingPlugin