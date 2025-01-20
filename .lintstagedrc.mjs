export default {
  '*': 'prettier --check --ignore-unknown --write',
  '*.{md,markdown,mdx}': ['remark --frail', 'eslint --max-warnings 0'],
  '*.{ts,tsx}': () => 'tsc --project tsconfig.json',
  '*.{js,mjs,cjs,jsx,ts,tsx}': [
    'eslint --max-warnings 0',
    // TODO: enable tests
    // 'jest --bail --findRelatedTests --passWithNoTests',
  ],
}
