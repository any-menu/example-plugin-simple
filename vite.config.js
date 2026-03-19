import { defineConfig } from 'vite';

// 备用。目前弃用，转而使用新的 PluginInterface css 接口。简化对插件的开发，不需要插件开发者管理 css
// import cssInjectedByJs from 'vite-plugin-css-injected-by-js';
// 使用: 放到 defineConfig plugins 中
// 功能: 可以将 CSS 内联到 JS 中，插件只需分发单个 .js 文件

export default defineConfig({
  build: {
    lib: { // Library 模式：输出单个 ES 模块文件
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'hello-world.js', // 输出文件名：dist/hello-world.js
    },
    rollupOptions: {
      external: [],
    },
    outDir: 'dist',
    minify: false,
  },
});
