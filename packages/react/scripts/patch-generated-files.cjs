#!/usr/bin/env node
/**
 * Patches auto-generated Stencil React files to suppress TypeScript errors
 * that arise from type constraints in the Stencil React Output Target
 */

const fs = require('fs')
const path = require('path')

const checkboxFile = path.join(
  __dirname,
  '../lib/components/stencil-generated/orchestra-checkbox.ts',
)
const checkboxServerFile = path.join(
  __dirname,
  '../lib/components/stencil-generated/orchestra-checkbox.server.ts',
)

function addTsIgnore(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`)
    return
  }

  let content = fs.readFileSync(filePath, 'utf-8')

  // Find the line with: export const OrchestraCheckbox: StencilReactComponent
  // and add // @ts-ignore comment before it if not already there
  const checkboxExportRegex =
    /^(\s*)export const OrchestraCheckbox: StencilReactComponent/m

  if (checkboxExportRegex.test(content)) {
    // Check if @ts-ignore is already right before the export
    if (
      !content.match(
        /\/\/ @ts-ignore[^\n]*\n\s*export const OrchestraCheckbox: StencilReactComponent/,
      )
    ) {
      content = content.replace(
        checkboxExportRegex,
        `$1// @ts-ignore - ignore type constraint errors from auto-generated Stencil React Output Target\n$1export const OrchestraCheckbox: StencilReactComponent`,
      )
      fs.writeFileSync(filePath, content, 'utf-8')
      console.log(`${path.basename(filePath)}: Patched successfully`)
    } else {
      console.log(
        `${path.basename(filePath)}: Already has @ts-ignore on export`,
      )
    }
  } else {
    console.log(`${path.basename(filePath)}: No export statement found`)
  }
}

addTsIgnore(checkboxFile)
addTsIgnore(checkboxServerFile)
