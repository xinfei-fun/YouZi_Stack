<template>
  <div class="file-slicer">
    <div class="container">
      <div>
        <button @click="selectFile" :disabled="!isApiSupported">选择文件</button>
        <span class="fn">{{ fileName || '未选择文件' }}</span>
      </div>

      <div class="file-info">
        文件大小: {{ formatFileSize(fileSize) }}<br>
        切片大小: <input type="number" v-model.number="chunkSize" min="1024"> bytes (默认5MB)
      </div>

      <button
        @click="sliceAndSave"
        :disabled="!selectedFile || isProcessing"
      >
        {{ isProcessing ? '处理中...' : '切片并保存到磁盘' }}
      </button>

      <div class="progress-container">
        <progress :value="progress" max="100"></progress>
        <div class="status" :class="statusClass">{{ statusMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';

interface FileHandle {
  getFile: () => Promise<File>;
}

export default {
  name: 'FileSlicer',
  setup() {
    // 响应式数据
    const selectedFile = ref<File | null>(null);
    const fileName = ref('');
    const fileSize = ref(0);
    const chunkSize = ref(5242880); // 默认5MB
    const progress = ref(0);
    const statusMessage = ref('准备就绪');
    const statusClass = ref('');
    const isProcessing = ref(false);
    const isApiSupported = ref('showOpenFilePicker' in window);

    // 计算属性
    const totalChunks = computed(() => {
      if (!selectedFile.value) return 0;
      return Math.ceil(selectedFile.value.size / chunkSize.value);
    });

    // 方法
    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 bytes';
      const k = 1024;
      const sizes = ['bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const updateStatus = (message: string, type: string = '') => {
      statusMessage.value = message;
      statusClass.value = type;
    };

    const resetUI = () => {
      selectedFile.value = null;
      fileName.value = '';
      fileSize.value = 0;
      progress.value = 0;
      updateStatus('准备就绪');
    };

    const selectFile = async () => {
      try {
        resetUI();

        // 使用File System Access API选择文件
        const [fileHandle] = await (window as any).showOpenFilePicker();
        const file = await (fileHandle as FileHandle).getFile();

        selectedFile.value = file;
        fileName.value = file.name;
        fileSize.value = file.size;

        updateStatus('文件已选择，准备切片', 'success');
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          updateStatus(`错误: ${(error as Error).message}`, 'error');
          console.error(error);
        }
      }
    };

    const sliceAndSave = async () => {
      if (!selectedFile.value) return;

      try {
        isProcessing.value = true;
        updateStatus('正在切片并保存...');

        // 创建目录来存储切片
        const directoryHandle = await (window as any).showDirectoryPicker({
          mode: 'readwrite'
        });

        // 创建切片文件夹
        const slicesDirName = `${selectedFile.value.name}_slices_${Date.now()}`;
        const slicesDirHandle = await directoryHandle.getDirectoryHandle(slicesDirName, { create: true });

        // 切片并保存
        for (let i = 0; i < totalChunks.value; i++) {
          const start = i * chunkSize.value;
          const end = Math.min(start + chunkSize.value, selectedFile.value.size);
          const chunk = selectedFile.value.slice(start, end);

          // 创建切片文件
          const chunkFileName = `${selectedFile.value.name}.part${i.toString().padStart(4, '0')}`;
          const chunkFileHandle = await slicesDirHandle.getFileHandle(chunkFileName, { create: true });
          const writable = await chunkFileHandle.createWritable();

          // 写入切片数据
          await writable.write(chunk);
          await writable.close();

          // 更新进度
          progress.value = Math.round(((i + 1) / totalChunks.value) * 100);
          updateStatus(`保存进度: ${progress.value}% (${i + 1}/${totalChunks.value} 切片)`);
        }

        // 完成
        updateStatus(`完成! 所有切片已保存到目录: ${slicesDirName}`, 'success');
      } catch (error) {
        updateStatus(`错误: ${(error as Error).message}`, 'error');
        console.error(error);
      } finally {
        isProcessing.value = false;
      }
    };

    return {
      selectedFile,
      fileName,
      fileSize,
      chunkSize,
      progress,
      statusMessage,
      statusClass,
      isProcessing,
      isApiSupported,
      totalChunks,
      selectFile,
      sliceAndSave,
      formatFileSize
    };
  }
};
</script>

<style scoped>
.file-slicer {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.6;
}

h1 {
  color: #333;
  text-align: center;
}

.container {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.fn {
    margin-left: 8px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 2px;
  cursor: pointer;
  border-radius: 4px;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.progress-container {
  margin-top: 20px;
}

progress {
  width: 100%;
  height: 20px;
}

.status {
  margin-top: 10px;
  font-weight: bold;
}

.error {
  color: red;
}

.success {
  color: green;
}

.file-info {
  margin: 15px 0;
}

input[type="number"] {
  width: 100px;
  padding: 5px;
  margin-left: 5px;
}
</style>
