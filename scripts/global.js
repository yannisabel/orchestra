const path = require('path')
const fs = require('fs').promises

/**
 * make sure the file is created to allow Node to write in it and prevent errors
 * @param {*} file path to the file you want to create.
 * @param {*} text The content you want to write inside the file.
 */
async function ensureWrite(file, text) {
  try {
    await fs.mkdir(path.dirname(file), { recursive: true })
    await fs.writeFile(file, text, 'utf8')
    console.log('\x1b[32m%s\x1b[0m', `${file} was written successfuly!`)
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', `Error writing ${file}`)
    console.error(error)
  }
}

/**
 * Using CSS variables generated from json to create `key` `value` pair for Javascript.
 * @param {*} content CSS variables as string.
 * @returns `key` `value` pair ready to be added to a javascript object.
 */
function cssVariablesReadyForObject(content) {
  return content.replace(/var\(--/g, '').replace(/--/g, '\'').replace(/: /g, '\':\'').replace(/;/g, '\',')
}

/**
 * Replacing Source tokens by their values inside Tokens files.
 * @param {*} content JSON file where Source tokens should be replaced.
 * @param {*} objectWithValue Source tokens object to retrieve the value from.
 * @returns Copy of the JSON file with Source tokens replaced.
 */
async function replaceTokenNameWithValue(content, objectWithValue) {
  const regex = /source-([^"]*)/g
  let stringifiedContent = JSON.stringify(content)
  try {
    await Promise.all(
      stringifiedContent.match(regex).map((tokenName) => {
        const tokenValue = objectWithValue[tokenName]
        const tokenNameToReplace = new RegExp(`"${tokenName}"`, 'g')
        stringifiedContent = stringifiedContent.replace(tokenNameToReplace, `"${tokenValue}"`)
      })
    )

    return stringifiedContent
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', 'Error replacing Color Tokens')
    console.error(error)
  }
}

module.exports = { ensureWrite, cssVariablesReadyForObject, replaceTokenNameWithValue }
