import { createUnplugin } from 'unplugin'
import { promises as fs, existsSync } from 'fs'

const fileRegex = /\.json$/
const encoding = 'utf-8'

async function getExisting(fileName: string) {
  if(existsSync(fileName)) {
    return await fs.readFile(fileName, encoding)
  }
  return ''
}

function replaceJsonRegularString(code: string) {
  return `declare const json: ${code}
export default json`
}

function replaceJsonModuleString(code: string) {
  const [beforeExport, afterExport] = code.split('export default', 2)
  const replacedBefore = beforeExport
  .replace(/=/g, ':')
  .replace('export default', 'declare const $defaultExport:')
  const replacedAfter = afterExport.replace(/:/g, ': typeof')
  return [replacedBefore, replacedAfter]
    .join('declare const $defaultExport:') + `
export default $defaultExport`
}

function replaceJsonString(code: string) {
  return code?.startsWith('{')
    ? replaceJsonRegularString(code)
    : replaceJsonModuleString(code)
}

export default createUnplugin(() => ({
  name: 'unplugin-json-dts',
  transformInclude(id) {
    return fileRegex.test(id)
  },
  async transform(code, id) {
    const fileName = id + '.d.ts'
    const existing = await getExisting(fileName)
    const newContent = replaceJsonString(code)
    if(newContent !== existing) {
      await fs.writeFile(fileName, newContent, encoding)
    }
    return {code}
  }
}))