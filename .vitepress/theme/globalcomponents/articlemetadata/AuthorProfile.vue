<template>
    <!-- 头像增加class便于样式控制 -->
    <img :class="['img', { img_loading: isImgLoading }]" @load="handleImgLoad" :src="avatarUrl" alt="作者头像"
        @error="handleAvatarError" />
    <span class="label">作者: </span>
    <!-- 作者名增加空数据保护 -->
    <span class="author">{{ author }}</span>
</template>

<script setup>
    import { ref, computed } from 'vue'
    import { useData } from 'vitepress'

    defineOptions({
        name: 'AuthorProfile'
    })

    const { frontmatter } = useData()

    // 作者信息
    const author = computed(() => frontmatter.value.author || '佚名')

    // 头像处理逻辑
    const fallbackUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    const avatarUrl = ref('')

    // 初始化头像地址
    avatarUrl.value = frontmatter.value.avatar || fallbackUrl

    // 错误处理
    const handleAvatarError = () => {
        if (avatarUrl.value !== fallbackUrl) {
            console.warn('头像加载失败，启用备用头像')
            avatarUrl.value = fallbackUrl
        }
    }

    // 图片加载前
    const isImgLoading = ref(true)

    // 图片加载完成
    const handleImgLoad = () => {
        isImgLoading.value = false
    }
</script>

<style lang="less" scoped>
    .img {
        width: 16px;
        aspect-ratio: 1/1;
        display: inline-block;
        vertical-align: -3px;
        margin-right: 5px;
        border-radius: 50%;
        animation: roateimg 8s linear 3s infinite;
    }

    .img_loading {
        background-color: #7a7878;
    }

    .author {
        margin-right: 5px;
    }

    @keyframes roateimg {
        to {
            transform: rotateZ(1turn);
        }
    }
</style>