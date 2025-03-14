<template>
    <Teleport to="body">
        <div v-if="show" class="mermaid-modal" @click.self="close" @wheel.prevent="zoom">
            <div class="modal-box" :style="{ transform: `scale(${scale})` }">
                <div v-html="svgContent" />
                <div class="controls">
                    <button @click="close">×</button>
                    <span>{{ Math.round(scale * 100) }}%</span>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>