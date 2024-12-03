// src/components/CustomRepl.vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import JSZip from 'jszip'

import Header from '../Header/index.vue'
import Editor from '../Editor/index.vue'

const editorRef = ref()

// 处理 URL hash 变化
const handleHashChange = () => {
  const hash = location.hash.slice(1)
  const store = editorRef.value?.store
  if (store && hash) {
    store.setFiles(hash)
  }
}

onMounted(() => {
  window.addEventListener('hashchange', handleHashChange)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
})

const handleShare = async () => {
  const url = window.location.href
  
  try {
    // 现代浏览器 API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url)
      ElMessage({
        message: '链接已复制到粘贴板',
        type: 'success',
      })
    } else {
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = url
      // 防止滚动到底部
      textArea.style.cssText = 'position:fixed;top:-999px;left:-999px;'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        document.execCommand('copy')
        ElMessage({
          message: '链接已复制到粘贴板',
          type: 'success',
        })
      } catch (err) {
        ElMessage({
          message: '复制失败，请手动复制',
          type: 'error',
        })
      } finally {
        textArea.remove()
      }
    }
  } catch (err) {
    console.error('复制失败:', err)
    ElMessage({
      message: '复制失败，请手动复制',
      type: 'error',
    })
  }
}


const handleDownload = async () => {
  console.log("editorRef",editorRef.value)
  const store = editorRef.value?.store
  if (!store) return

  try {
    // 创建一个新的 zip 实例
    const zip = new JSZip()
    const files = store.files

    // 添加所有文件到 zip 的根目录
    Object.entries(files).forEach(([filename, file]: [string, any]) => {
      // 只获取文件名，不要路径
      const basename = filename.split('/').pop() || filename
      // 直接添加到 zip 根目录
      zip.file(basename, file.code)
    })

    // 生成 zip 文件
    const content = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 9
      }
    })

    // 下载 zip 文件
    const url = URL.createObjectURL(content)
    const a = document.createElement('a')
    a.href = url
    a.download = 'vue-playground-project.zip'
    a.click()
    URL.revokeObjectURL(url)

    ElMessage({
      message: '项目文件已下载',
      type: 'success'
    })
  } catch (error) {
    console.error('下载失败:', error)
    ElMessage({
      message: '下载失败',
      type: 'error'
    })
  }
}

const handleReload = () => {
  editorRef.value.handleReload()
}

const handleGitHub = () => {
  window.open('https://github.com/tuskermanshu', '_blank')
}
</script>

<template>
  <div class="repl-container">
    <Header
      @share="handleShare"
      @download="handleDownload"
      @reload="handleReload"
      @github="handleGitHub"
    />
    <Editor ref="editorRef" />
  </div>
</template>

<style lang="scss" scoped>
.repl-container {
  @apply h-screen flex flex-col;
}
</style>