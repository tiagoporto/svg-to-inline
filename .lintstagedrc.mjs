export default {
  '*': 'prettier --check --ignore-unknown --write',
  '*.{md,markdown,mdx}': 'remark --frail',
  '*.{ts,tsx}': () => 'tsc --project tsconfig.json',
  '*.{js,mjs,cjs,jsx,ts,tsx}': [
    'eslint --ext js,jsx,ts,tsx --max-warnings 0',
    // TODO: enable tests
    // 'jest --bail --findRelatedTests --passWithNoTests',
  ],
}
