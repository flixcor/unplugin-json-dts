import './style.css'
import person from './person.schema.json'

console.log(person.properties.age.type)

const app = document && document.querySelector<HTMLDivElement>('#app')

if(app) {
  app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
}


