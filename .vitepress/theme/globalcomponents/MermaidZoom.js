// useLogic.js
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'

export default defineComponent({
    setup() {
        // 逻辑
        const zoomFn = (e) => {
            const target = e.target;
            if (target.closest('.mermaid')) {
                target.closest('.mermaid')?.classList.toggle('zoomed');
            }
        }

        // 生命周期钩子
        onMounted(() => {
            const el = document.querySelectorAll('div.mermaid');
            el.forEach((item) => {
                item.addEventListener('click', zoomFn);
            });
        })

        onBeforeUnmount(() => {
            const el = document.querySelectorAll('div.mermaid');
            el.forEach((item) => {
                item.removeEventListener('click', zoomFn);
            });
        });

        // 返回渲染函数
        return () => null;
    }
})