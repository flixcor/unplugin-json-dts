import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ["node_modules","**/node_modules/**","dist","**/dist/**","example","**/example/**","tools","**/tools/**",".eslintrc.js","**/.eslintrc.js/**",".prettierrc.js","**/.prettierrc.js/**"],
  formatters: true,
})
