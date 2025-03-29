import './style.css'
import person from './person.schema.json'
import large from './10004_bytes.json'

console.log(person.properties.age.type)
console.log(large[0].type)

const app = document && document.querySelector<HTMLDivElement>('#app')

if(app) {
  app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
}


