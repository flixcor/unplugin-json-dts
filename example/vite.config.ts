import {defineConfig} from 'vite'
import jsonDts from '../src/vite'

export default defineConfig({
    plugins: [jsonDts()]
})