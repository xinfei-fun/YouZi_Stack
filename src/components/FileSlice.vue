<template>
    <div class="file-slicer">
        <div class="container">
            <div>
                <button @click="selectFile" :disabled="!isApiSupported || isProcessing">
                    {{ isProcessing ? '处理中...' : '选择文件' }}
                </button>
                <span class="fn">{{ fileName || '未选择文件' }}</span>
            </div>

            <div class="file-info" v-if="fileName">
                <p>文件大小: {{ formatFileSize(fileSize) }}</p>
                <p>
                    切片大小:
                    <input type="number" v-model.number="chunkSize" min="1024" :disabled="isProcessing">
                    bytes (默认5MB)
                </p>
                <p>切片数量: {{ totalChunks }}</p>
            </div>

            <button v-if="fileName && !isProcessing" @click="sliceAndSave" :disabled="!isApiSupported || isProcessing"
                class="action-button">
                切片并保存到磁盘
            </button>

            <div class="progress-container" v-if="isProcessing">
                <div class="progress-bar-wrapper">
                    <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
                </div>
                <div class="progress-label">{{ progress }}%</div>
                <div class="status" :class="statusClass">{{ statusMessage }}</div>
            </div>

            <div v-if="isProcessing" class="action-hint">
                请在弹出的对话框中指定保存位置。处理大文件时请耐心等待...
            </div>

            <div v-if="!isApiSupported" class="browser-warning">
                <p>⚠️ 您的浏览器不支持 File System Access API，无法使用本功能</p>
                <p>请使用最新版本的 Chrome、Edge 或 Opera 浏览器</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, computed, onMounted } from 'vue'

    export default {
        setup() {
            // 响应式状态
            const selectedFile = ref(null)
            const fileName = ref('')
            const fileSize = ref(0)
            const chunkSize = ref(5242880) // 默认5MB
            const progress = ref(0)
            const statusMessage = ref('准备就绪')
            const statusClass = ref('')
            const isProcessing = ref(false)
            const isApiSupported = ref(false)

            // 计算切片数量
            const totalChunks = computed(() => {
                if (!selectedFile.value || selectedFile.value.size === 0) return 0
                return Math.ceil(selectedFile.value.size / chunkSize.value)
            })

            // 文件大小格式化
            const formatFileSize = (bytes) => {
                if (!bytes) return '0 bytes'
                const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB']
                if (bytes === 0) return '0 byte'
                const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
                return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
            }

            // 更新状态信息
            const updateStatus = (message, type = '') => {
                statusMessage.value = message
                statusClass.value = type
            }

            // 重置状态
            const resetState = () => {
                selectedFile.value = null
                fileName.value = ''
                fileSize.value = 0
                progress.value = 0
                isProcessing.value = false
                updateStatus('准备就绪')
            }

            // 选择文件
            const selectFile = async () => {
                try {
                    resetState()

                    if (typeof window !== 'undefined' && window.showOpenFilePicker) {
                        // 使用File System Access API选择文件
                        const [fileHandle] = await window.showOpenFilePicker()
                        const file = await fileHandle.getFile()

                        selectedFile.value = file
                        fileName.value = file.name
                        fileSize.value = file.size

                        updateStatus('文件已选择，准备切片', 'success')
                    } else {
                        updateStatus('浏览器不支持文件选择', 'error')
                    }
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        updateStatus('错误: ' + error.message, 'error')
                        console.error(error)
                    }
                }
            }

            // 切片并保存
            const sliceAndSave = async () => {
                if (!selectedFile.value) return

                try {
                    isProcessing.value = true
                    updateStatus('正在切片并保存...')

                    if (typeof window !== 'undefined' && window.showDirectoryPicker) {
                        // 创建目录来存储切片
                        const directoryHandle = await window.showDirectoryPicker({
                            mode: 'readwrite'
                        })

                        // 创建切片文件夹
                        const slicesDirName = `${selectedFile.value.name}_slices_${Date.now()}`
                        const slicesDirHandle = await directoryHandle.getDirectoryHandle(slicesDirName, { create: true })

                        // 切片并保存
                        for (let i = 0; i < totalChunks.value; i++) {
                            const start = i * chunkSize.value
                            const end = Math.min(start + chunkSize.value, selectedFile.value.size)
                            const chunk = selectedFile.value.slice(start, end)

                            // 创建切片文件
                            const chunkFileName = `${selectedFile.value.name}.part${i.toString().padStart(4, '0')}`
                            const chunkFileHandle = await slicesDirHandle.getFileHandle(chunkFileName, { create: true })
                            const writable = await chunkFileHandle.createWritable()

                            // 写入切片数据
                            await writable.write(chunk)
                            await writable.close()

                            // 更新进度
                            progress.value = Math.round(((i + 1) / totalChunks.value) * 100)
                            updateStatus(`保存进度: ${progress.value}% (${i + 1}/${totalChunks.value} 切片)`)
                        }

                        // 完成
                        updateStatus(`完成! 所有切片已保存到目录: ${slicesDirName}`, 'success')
                    } else {
                        updateStatus('浏览器不支持保存到本地', 'error')
                    }
                } catch (error) {
                    updateStatus('错误: ' + error.message, 'error')
                    console.error(error)
                } finally {
                    isProcessing.value = false
                }
            }

            // 在mounted时检查API支持情况
            onMounted(() => {
                if (typeof window !== 'undefined') {
                    isApiSupported.value = 'showOpenFilePicker' in window && 'showDirectoryPicker' in window
                }
            })

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
            }
        }
    }
</script>

<style scoped>
    .file-slicer {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        line-height: 1.6;
        background-color: #f9f9f9;
        border-radius: 12px;
        border: 1px solid #eaeaea;
    }

    h1 {
        color: #2c3e50;
        text-align: center;
        margin-bottom: 25px;
    }

    .container {
        background-color: white;
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .fn {
        margin-left: 8px;
    }

    button {
        background-color: #42b983;
        color: white;
        border: none;
        padding: 10px 20px;
        text-align: center;
        font-size: 16px;
        margin: 10px 0;
        cursor: pointer;
        border-radius: 6px;
        font-weight: 500;
        transition: background-color 0.3s;
        display: inline-block;
    }

    button:hover {
        background-color: #349a6d;
    }

    button:disabled {
        background-color: #a9d9bc;
        cursor: not-allowed;
    }

    .action-button {
        background-color: #3273dc;
        padding: 12px 25px;
        margin: 20px 0;
    }

    .action-button:hover {
        background-color: #2765c6;
    }

    .file-info {
        margin: 20px 0;
        padding: 15px;
        background-color: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid #42b983;
    }

    .file-info p {
        margin: 10px 0;
    }

    input[type="number"] {
        width: 120px;
        padding: 8px 10px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        margin: 0 5px;
        font-size: 15px;
    }

    .progress-container {
        margin-top: 30px;
    }

    .progress-bar-wrapper {
        width: 100%;
        height: 16px;
        background-color: #eee;
        border-radius: 8px;
        overflow: hidden;
        margin: 15px 0;
    }

    .progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #42b983, #3273dc);
        border-radius: 8px;
        transition: width 0.4s ease;
    }

    .progress-label {
        text-align: right;
        font-size: 15px;
        color: #666;
    }

    .status {
        margin-top: 15px;
        font-weight: 500;
        font-size: 16px;
        text-align: center;
        padding: 8px;
        border-radius: 4px;
    }

    .success {
        color: #42b983;
        background-color: rgba(66, 185, 131, 0.1);
    }

    .error {
        color: #e53935;
        background-color: rgba(229, 57, 53, 0.1);
    }

    .action-hint {
        margin-top: 15px;
        padding: 12px;
        background-color: #fffbeb;
        border-radius: 6px;
        border-left: 4px solid #f59e0b;
        font-size: 14px;
        color: #92400e;
    }

    .browser-warning {
        margin-top: 20px;
        padding: 15px;
        background-color: #fef2f2;
        border-radius: 8px;
        border-left: 4px solid #ef4444;
        color: #b91c1c;
    }

    .browser-warning p {
        margin: 8px 0;
    }
</style>
