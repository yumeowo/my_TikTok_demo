import { appTools, defineConfig } from '@modern-js/app-tools';
import { SemiRspackPlugin } from "@douyinfe/semi-rspack-plugin";

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
    })
  ],
  tools: {
    rspack: {
      plugins: [
        new SemiRspackPlugin({
          cssLayer: true
        })
      ]
    }
  }
});
