// .vitepress/data/generate-json.js
import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createContentLoader } from 'vitepress'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const loader = createContentLoader('./**/*.md', {
  transform(rawData) {
    return rawData.filter(item => !item.url.endsWith('/'))
  }
})

// 你的数据加载文件

export async function generate() {
  // 1. 加载数据
  const rawData = await loader.load()

  // 3. 定义输出路径（项目根目录下生成）
  const outputPath = resolve(__dirname, 'content-dump.json')

  // 4. 写入文件
  writeFileSync(
    outputPath,
    JSON.stringify(rawData, null, 2),
    'utf-8'
  )

  console.log(`✅ 数据已写入: ${outputPath}`)
}

