<template>
    <ClientOnly>
        <div class="code-demo">
            <iframe :style="{ height: height }" class="iframe" :src="src" :title="title" frameborder="0"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
        </div>
    </ClientOnly>
</template>

<script>
    export default {
        name: 'CodeDemo',
        props: {
            src: String,
            height: {
                type: String,
                default: '500px'
            },
        }
    }
</script>

<style scoped lang="less">
    .code-demo {
        width: 100%;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        background-color: var(--vp-c-bg);

        .iframe {
            width: 100%;
            height: 500px;
            border: 0;
            border-radius: 4px;
            overflow: hidden;
        }
    }


</style>