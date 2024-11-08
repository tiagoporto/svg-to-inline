export default {
  '*': 'prettier --check --ignore-unknown --write',
  '*.md': 'remark --frail',
  '*.{ts,tsx}': () => 'tsc --project tsconfig.json',
}
