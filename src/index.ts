import type { UnpluginFactory } from 'unplugin'
import { existsSync, promises as fs } from 'node:fs'
import { createUnplugin } from 'unplugin'

const fileRegex = /\.json$/
const encoding = 'utf-8'

async function getExisting(fileName: string) {
  return existsSync(fileName)
    ? await fs.readFile(fileName, encoding)
    : ''
}

function replaceJsonRegularString(code: string) {
  return `declare const json: ${code}
export default json;`
}

function replaceJsonModuleString(code: string) {
  const [beforeExport, afterExport] = code.split('export default', 2)
  const beforeExportReplaced = beforeExport.replace(/=/g, ':')
  const afterExportReplaced = beforeExport
    ? afterExport.replace(/^( +)([A-Z|$]+),$/gim, '$1$2: $2,').replace(/:( *[A-Z|$]+)/gi, ': typeof$1')
    : afterExport
  return `${[
    beforeExportReplaced,
    afterExportReplaced,
  ].join('declare const $defaultExport:')}
export default $defaultExport;`
}

async function replaceJsonString(code: string, id: string) {
  return code?.startsWith('export')
    ? replaceJsonModuleString(code)
    : code?.startsWith('{')
      ? replaceJsonRegularString(code)
      : replaceJsonRegularString(await fs.readFile(id, encoding))
}

export const unpluginFactory: UnpluginFactory<unknown> = () => ({
  name: 'unplugin-json-dts',
  transformInclude(id) {
    return fileRegex.test(id)
  },
  async transform(code, id) {
    const fileName = `${id}.d.ts`
    const [existingTyping, newTyping] = await Promise.all([
      getExisting(fileName),
      replaceJsonString(code, id),
    ])
    if (newTyping !== existingTyping) {
      await fs.writeFile(fileName, newTyping, encoding)
    }
    return { code }
  },
})

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
