import { createUnplugin } from 'unplugin'
import { promises as fs, existsSync } from 'fs'

const fileRegex = /\.json$/
const encoding = 'utf-8'

const getExisting = async(fileName: string) => existsSync(fileName)
  ? await fs.readFile(fileName, encoding)
  : ''

const replaceJsonRegularString = (code: string) => `declare const json: ${code}
export default json;`

function replaceJsonModuleString(code: string) {
  const [beforeExport, afterExport] = code.split('export default', 2)
  const beforeExportReplaced = beforeExport.replace(/=/g, ':')
  const afterExportReplaced = beforeExport 
    ? afterExport.replace(/:( *[A-Z|a-z|$]+)/g, ': typeof$1')
    : afterExport
  return [
    beforeExportReplaced, 
    afterExportReplaced
  ].join('declare const $defaultExport:') + `
export default $defaultExport;`
}

const replaceJsonString = async (code: string, id: string) => code?.startsWith('export')
  ? replaceJsonModuleString(code)
  : code?.startsWith('{')
    ? replaceJsonRegularString(code)
    : replaceJsonRegularString(await fs.readFile(id, encoding))

export default createUnplugin(() => ({
  name: 'unplugin-json-dts',
  transformInclude(id) {
    return fileRegex.test(id)
  },
  async transform(code, id) {
    const fileName = id + '.d.ts'
    const [existingTyping, newTyping] = await Promise.all([
      getExisting(fileName),
      replaceJsonString(code, id)
    ])
    if(newTyping !== existingTyping) {
      await fs.writeFile(fileName, newTyping, encoding)
    }
    return {code}
  }
}))