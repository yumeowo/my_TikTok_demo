import { appTools, defineConfig } from '@modern-js/app-tools';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  runtime: {
    router: true,
  },
  html: {
    meta: {
      referrer: 'no-referrer'
    }
  },
  plugins: [
    appTools({
      bundler: 'rspack', // Set to 'webpack' to enable webpack
    }),
  ],
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [
          require('@tailwindcss/postcss'),
        ],
      },
    },
  },
});
