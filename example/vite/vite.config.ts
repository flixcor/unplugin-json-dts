import {defineConfig} from 'vite'
import jsonDts from 'unplugin-json-dts/vite'

export default defineConfig({
    plugins: [jsonDts()]
})