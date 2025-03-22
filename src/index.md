---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "柚子成长站"
  text: "Front-end learning"
  tagline: 汇聚点滴，有所收获
  image:
    src: '/img/tororo.png'
    alt: YouZi_Stack
  actions:
    - theme: brand
      text: 开始阅读 ->
      link: /blog/basic/浏览器渲染原理01
    - theme: alt
      text: 关于
      link: /about

features:
  - title: CSS 揭秘
    details: 走进 CSS 世界，探索你不知道的 CSS 秘密
    link: /category/csstrick/    
  - title: 算法专栏
    details: 前端必会算法，培养程序思维，从此告别切图仔
  - title: 资源导航
    details: 汇聚优质资源、开发工具，助您快速定位，提升开发效率
---

<script setup>
import HomeUnderLine from './components/HomeUnderline.vue'
</script>

<HomeUnderLine />

<style>
  .VPHero.VPHomeHero span.text{
    margin-top: 16px;
    margin-bottom: 12px;
  }
</style>
