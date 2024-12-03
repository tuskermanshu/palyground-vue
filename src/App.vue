<script setup lang='ts'>
import vuePlayground from "./components/VuePlayground/index.vue"

// main.ts 或者在 App.vue 的 onMounted 中
// 检查用户之前是否设置过主题
const theme = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

if (theme === 'dark' || (!theme && prefersDark)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}
</script>

<template>
  <vue-playground />
</template>

<style lang='scss' scoped>

</style>