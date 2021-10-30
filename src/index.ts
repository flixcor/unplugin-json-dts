import {Plugin} from 'vite'
import { promises as fs, existsSync } from 'fs'

const fileRegex = /\.json$/
const encoding = 'utf-8'

export default function Plugin(): Plugin {
  return {
    name: 'vite-plugin-json-dts',
    async transform(code, id) {
      if(fileRegex.test(id)) {
        const fileName = id.slice(0, -4) + 'd.ts'
        const existing = existsSync(fileName) ? await fs.readFile(fileName, encoding) : ''
        const newContent = `declare const schema: ${code}
export default schema`
        if(newContent !== existing) {
          await fs.writeFile(fileName, newContent, encoding)
        }
      }
      return {code}
    }
  }
}