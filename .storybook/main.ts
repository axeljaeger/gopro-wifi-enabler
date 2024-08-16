import { mergeConfig } from 'vite';

export default {
  stories: ['../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    "@storybook/addon-interactions",
    '@chromatic-com/storybook'
  ],

  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      optimizeDeps: {
        include: [],
      },
    });
  },

  framework: {
    name: '@storybook/react-vite',
    options: {}
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};