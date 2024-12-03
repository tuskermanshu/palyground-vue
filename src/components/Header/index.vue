# src/components/Header.vue
<script setup lang="ts">
import { Share2, Download, Github, Sun, Moon, RefreshCw } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'

const emit = defineEmits<{
  (e: 'share'): void
  (e: 'download'): void
  (e: 'github'): void
  (e: 'reload'): void
}>()

const isDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
</script>

<template>
  <header class="header">
    <div class="header-left">
      <svg class="vue-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196.32 170.02">
        <path fill="#42b883" d="M120.83 0L98.16 39.26 75.49 0H0l98.16 170.02L196.32 0h-75.49z"/>
        <path fill="#35495e" d="M120.83 0L98.16 39.26 75.49 0H39.26l58.9 102.01L157.06 0h-36.23z"/>
      </svg>
      <span class="title">Vue Playground</span>
    </div>

    <div class="toolbar">
      <button class="toolbar-btn" @click="emit('share')" title="分享链接">
        <Share2 class="icon" />
      </button>
      <button class="toolbar-btn" @click="emit('download')" title="下载文件">
        <Download class="icon" />
      </button>
      <button class="toolbar-btn" @click="emit('reload')" title="重新加载">
        <RefreshCw class="icon" />
      </button>
      <button class="toolbar-btn" @click="toggleTheme" :title="isDark ? '切换到亮色模式' : '切换到暗色模式'">
        <Sun v-if="!isDark" class="icon" />
        <Moon v-else class="icon" />
      </button>
      <button class="toolbar-btn" @click="emit('github')" title="GitHub">
        <Github class="icon" />
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  @apply flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-dark-800 border-b border-gray-200 dark:border-gray-700;
  
  .header-left {
    @apply flex items-center gap-2;
    
    .vue-logo {
      @apply w-8 h-8;
    }

    .title {
      @apply text-lg font-semibold text-gray-800 dark:text-gray-200;
    }
  }

  .toolbar {
    @apply flex items-center gap-2;
    
    .toolbar-btn {
      @apply p-2 rounded-md hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors;
      
      .icon {
        @apply w-5 h-5 text-gray-600 dark:text-gray-300;
      }
    }
  }
}
</style>