import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const currentFilePath = fileURLToPath(import.meta.url)
const currentDirPath = path.dirname(currentFilePath)
const distDir = path.join(currentDirPath, "dist")

// Get all .js files in dist and convert them
const files = fs.readdirSync(distDir).filter((f) => f.endsWith(".js"))

files.forEach((file) => {
  const filePath = path.join(distDir, file)
  let content = fs.readFileSync(filePath, "utf-8")

  // Store original content for re-export logic
  const originalContent = content

  // Convert export statements to CommonJS
  // export { x } from 'y' -> const { x } = require('y'); module.exports = { x }
  if (
    originalContent.includes("export { ") &&
    originalContent.includes(" from ")
  ) {
    const match = originalContent.match(
      /export\s*{\s*([^}]+)\s*}\s*from\s*['"]([^'"]+)['"]/g,
    )
    if (match) {
      const importMatch = originalContent.match(
        /export\s*{\s*([^}]+)\s*}\s*from\s*['"]([^'"]+)['"]/,
      )
      if (importMatch) {
        const names = importMatch[1].trim()
        const fromPath = importMatch[2]
        content = `const { ${names} } = require('${fromPath}');\nmodule.exports = { ${names} };`
      }
    }
  }

  // export const x = ... -> const x = ...; module.exports = { x }
  if (originalContent.startsWith("export const ")) {
    content = originalContent.replace(/export const\s+/g, "const ")
    // Extract the constant name for export
    const match = originalContent.match(/export const\s+(\w+)/)?.[1]
    if (match) {
      content += `\nmodule.exports = { ${match} };`
    }
  }

  const cjsFile = filePath.replace(".js", ".cjs")
  fs.writeFileSync(cjsFile, content)
})

console.log("✓ Built ESM and CommonJS outputs")
