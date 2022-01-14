import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import windiCSS from 'vite-plugin-windicss';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    windiCSS(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
    },
  },
  base: './', // 设置打包路径
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/main.scss";',
      },
    },
  },
  server: {
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域

    // 设置代理，根据我们项目实际情况配置
    proxy: {
      '/api': {
        target: 'http://152.136.185.210:4000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/api/', '/'),
      },
    },
  },
});
