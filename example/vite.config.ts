import {defineConfig} from 'vite'
import {vitePluginJsonDts} from '../src'

export default defineConfig({
    plugins: [vitePluginJsonDts()]
})