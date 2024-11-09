import type { StorybookConfig } from '@storybook/web-components-vite'

const config: StorybookConfig = {
  stories: [
    '../src/**/*.story.@(js|jsx|ts|tsx|mdx)',
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: ['@storybook/addon-essentials', '@chromatic-com/storybook'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  staticDirs: ['../demo'],
}
export default config
