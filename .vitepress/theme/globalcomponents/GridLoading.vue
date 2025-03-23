<template>
    <div class="loading-overlay" v-if="modelValue">
        <div class="loading_container">
            <div class="ldio">
                <div style='left:38px;top:38px;animation-delay:0s'></div>
                <div style='left:80px;top:38px;animation-delay:0.125s'></div>
                <div style='left:122px;top:38px;animation-delay:0.25s'></div>
                <div style='left:38px;top:80px;animation-delay:0.875s'></div>
                <div style='left:122px;top:80px;animation-delay:0.375s'></div>
                <div style='left:38px;top:122px;animation-delay:0.75s'></div>
                <div style='left:80px;top:122px;animation-delay:0.625s'></div>
                <div style='left:122px;top:122px;animation-delay:0.5s'></div>
            </div>
        </div>
    </div>
</template>
<script setup>

    defineOptions({
        name: 'GridLoading' // 自定义组件名称
    });

    const props = defineProps({
        modelValue: {
            type: Boolean,
            default: false
        }
    });
</script>
<style lang="less" scoped>
    @keyframes loadingkeyframe {
        0% {
            background: #146eb4
        }

        12.5% {
            background: #146eb4
        }

        12.625% {
            background: #ff9900
        }

        100% {
            background: #ff9900
        }
    }

    .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 20;
    }

    .loading_container {
        width: 200px;
        height: 200px;
        display: inline-block;
        overflow: hidden;
        background: none;

        .ldio {
            width: 100%;
            height: 100%;
            position: relative;
            transform: translateZ(0) scale(1);
            backface-visibility: hidden;
            transform-origin: 0 0;

            &>div {
                box-sizing: content-box;
                position: absolute;
                width: 40px;
                height: 40px;
                background: #ff9900;
                animation: loadingkeyframe 1s linear infinite;
            }
        }
    }
</style>