<template>
    <ClientOnly>
        <Teleport to="body">
            <Transition name="modal">
                <!-- 弹窗结构 -->
                <div v-if="showModal" class="mermaid-zoom-modal" @wheel.prevent="handleWheel" @click.self="closeModal">
                    <div class="modal-content">
                        <!-- 克隆的mermaid图表 -->
                        <div ref="clonedMermaid" :style="transformStyle"></div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </ClientOnly>
</template>

<script setup>
    import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'

    const showModal = ref(false)
    const scale = ref(1)
    const clonedMermaid = ref(null)
    // 样式计算
    const transformStyle = computed(() => ({
        transform: `scale(${scale.value})`
    }));

    // 打开弹窗
    const openModal = (originalEl) => {
        if (!originalEl) return;

        showModal.value = true;

        nextTick(() => {
            if (!clonedMermaid) {
                return;
            }

            // 克隆元素
            const clone = originalEl.cloneNode(true)
            clone.style.userSelect = 'none'
            clone.classList.replace('mermaid', 'mermaid-clone')

            // 插入克隆元素
            clonedMermaid.value.replaceChildren(clone);

            const w = originalEl.clientWidth;
            const h = originalEl.clientHeight;
            clone.style.width = `${w}px`;
            scale.value = Math.min(window.innerWidth * 0.9 / w, window.innerHeight * 0.9 / h);
        })
    }

    // 关闭弹窗
    const closeModal = () => {
        showModal.value = false
        // 清理克隆元素
        // clonedMermaid.value.replaceChildren()
    }

    // 事件处理
    const handleClick = (e) => {
        const mermaidEl = e.target.closest('div.mermaid')
        if (mermaidEl) {
            e.stopPropagation()
            openModal(mermaidEl)
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            console.log("Esc 被按下");
            closeModal()
        }
    };

    // 滚轮缩放
    const handleWheel = (e) => {
        const delta = e.deltaY > 0 ? 0.9 : 1.1
        scale.value = Math.min(Math.max(0.5, scale.value * delta), 9)
    }

    // 生命周期钩子
    onMounted(() => {
        document.addEventListener('click', handleClick);
        window.addEventListener('keyup', handleKeyPress);
    })

    onBeforeUnmount(() => {
        document.removeEventListener('click', handleClick);
        window.removeEventListener('keyup', handleKeyPress);
    });
</script>

<style scoped>
    .mermaid-zoom-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: var(--vp-c-bg);
        z-index: 3000;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        transition: transform 0.2s ease;
        max-width: 90vw;
        max-height: 90vh;
        overflow: visible;
    }


    /* 新增过渡样式 */
    .modal-enter-from,
    .modal-leave-to {
        opacity: 0;
        transform: scale(0.95);
    }

    .modal-enter-active,
    .modal-leave-active {
        transition: all 0.3s ease-out;
    }


</style>