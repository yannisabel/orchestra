import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const svgDir = path.join(__dirname, 'svg')
const srcDir = path.join(__dirname, 'src')

// Read all SVG files
const svgFiles = fs.readdirSync(svgDir).filter(f => f.endsWith('.svg')).sort()

if (svgFiles.length === 0) {
  console.warn('⚠️  No SVG files found in svg/ directory')
  process.exit(0)
}

// Convert filename to icon name (e.g., "check-icon.svg" -> "checkIcon")
function getIconName(filename) {
  return filename
    .replace('.svg', '')
    .split('-')
    .reduce((acc, word, idx) => {
      if (idx === 0) return word
      return acc + word.charAt(0).toUpperCase() + word.slice(1)
    }, '')
}

// Generate icons.ts
let iconsContent = ''
const iconNames = []

for (const file of svgFiles) {
  const iconName = getIconName(file)
  iconNames.push(iconName)
  
  const svgPath = path.join(svgDir, file)
  const svgContent = fs.readFileSync(svgPath, 'utf-8')
  
  // Escape backticks in SVG content
  const escapedSvg = svgContent.replace(/`/g, '\\`')
  
  iconsContent += `export const ${iconName} = \`${escapedSvg}\`\n\n`
}

fs.writeFileSync(path.join(srcDir, 'icons.ts'), iconsContent.trim() + '\n')

// Generate index.ts
let indexContent = 'export {\n'
for (const name of iconNames) {
  indexContent += `  ${name},\n`
}
indexContent += `} from './icons'\n\n`
indexContent += `export const iconNames = [${iconNames.map(n => `'${n}'`).join(', ')}] as const\n`

fs.writeFileSync(path.join(srcDir, 'index.ts'), indexContent)

console.log(`✓ Generated icons from ${svgFiles.length} SVG file(s)`)
console.log(`  Icons: ${iconNames.join(', ')}`)
