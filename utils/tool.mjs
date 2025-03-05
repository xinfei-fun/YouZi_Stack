import fs from 'fs'
import path from 'path'

function generateSidebar(dir = 'src') {
  const root = path.join(process.cwd(), dir)
  const sidebarConfig = {}

  function traverse(currentDir) {
    try {
      const items = fs.readdirSync(currentDir)
      const result = []

      // Get the top-level directory name for section grouping
      const topDir = path.relative(root, currentDir).split(path.sep)[0]

      items.forEach(item => {
        const fullPath = path.join(currentDir, item)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
          // Skip .vitepress directory and hidden directories
          if (item === '.vitepress' || item.startsWith('.')) return

          const subItems = traverse(fullPath)
          if (subItems.length > 0) {
            // Add items to their respective sections
            const sectionKey = `/${topDir || item}/`
            if (!sidebarConfig[sectionKey]) {
              sidebarConfig[sectionKey] = [{
                text: item,
                collapsible: true,
                items: subItems
              }]
            } else {
              sidebarConfig[sectionKey][0].items.push(...subItems)
            }
          }
        } else if (item.endsWith('.md') && item !== 'index.md') {
          const text = item.replace('.md', '')
          const relativePath = path.relative(root, currentDir)
          const link = `/${relativePath.replace(/\\/g, '/')}/${text}`

          result.push({
            text,
            link
          })
        }
      })

      return result
    } catch (error) {
      console.error(`Error traversing directory ${currentDir}:`, error)
      return []
    }
  }

  traverse(root)

  // Write the sidebar configuration to data file
  const dataPath = path.join(process.cwd(), 'utils', '_data.js')
  const dataContent = `// This file is auto-generated. Do not edit manually.
/** @type {import('vitepress').DefaultTheme.Config['sidebar']} */
export const sidebarData = ${JSON.stringify(sidebarConfig, null, 2)}
`

  fs.writeFileSync(dataPath, dataContent, 'utf-8')
  return sidebarConfig
}

generateSidebar()

export default generateSidebar