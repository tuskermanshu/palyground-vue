# src/components/Editor.vue
<script setup lang="ts">
import { watchEffect, ref, onMounted, onUnmounted } from 'vue'
import { OutputModes, Repl, useStore, useVueImportMap } from '@vue/repl'
import Monaco from '@vue/repl/monaco-editor'

// 从 URL 获取初始状态
const hash = location.hash.slice(1)
const query = new URLSearchParams(location.search)
const editorRef = ref<any>(null)

// 初始化 store
const { importMap: builtinImportMap, vueVersion } = useVueImportMap()

const store = useStore({
  builtinImportMap,
  vueVersion,
  showOutput: ref(query.has('showOutput')),
  outputMode: ref(query.get('outputMode') as OutputModes || 'preview'),
}, hash)

// 持久化状态到 URL
watchEffect(() => {
  const state = store.serialize()
  if (state !== location.hash.slice(1)) {
    history.replaceState({}, '', `#${state}`)
  }
})

// 主题状态
const theme = ref<'dark' | 'light'>('light')

// 初始化和监听主题变化
onMounted(() => {
  // 设置初始主题
  theme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'

  // 监听主题变化
  const observer = new MutationObserver(() => {
    theme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })

  // 清理
  onUnmounted(() => {
    observer.disconnect()
  })
})

const handleReload = () => {
  editorRef.value?.reload()
}

defineExpose({
  handleReload,
  store
})
</script>

<template>
  <div class="editor-container">
    <Repl
      ref="editorRef"
      :store="store"
      :editor="Monaco"
      :show-compile-output="true"
      :theme="theme"
      class="repl"
    />
  </div>
</template>

<style lang="scss" scoped>
.editor-container {
  @apply flex-1;
  
  .repl {
    @apply h-full;
    
    :deep(.split-pane) {
      @apply h-full;
    }

    :deep(.vue-repl) {
      @apply bg-white dark:bg-dark-800;
    }
  }
}
</style>