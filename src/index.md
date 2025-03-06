---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "柚子成长站"
  text: "Front-end learning"
  tagline: 汇聚点滴，有所收获
  # image:
  #   src: /assets/1.png
  #   alt: YouZi_Stack
  actions:
    - theme: brand
      text: 开始阅读 ->
      link: /blog/basic/浏览器渲染原理01
    - theme: alt
      text: 关于
      link: /about

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
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