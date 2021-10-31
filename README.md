# unplugin-json-dts

[![NPM version](https://img.shields.io/npm/v/unplugin-json-dts?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-json-dts)

Automatically generate better typings for json files. Supports json modules.

![Comparision of before and after screenshots](/assets/before-after.gif)

## Installation

```bash
npm i unplugin-json-dts -D
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import jsonDts from 'unplugin-json-dts/vite'
export default defineConfig({
  plugins: [
    jsonDts(),
  ],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import jsonDts from 'unplugin-json-dts/rollup'
export default {
  plugins: [
    jsonDts(),
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-json-dts/webpack')()
  ]
}
```