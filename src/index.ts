/**
 * AnyMenu Plugin: Hello World
 *
 * Template for AnyMenu plugin development.
 * Implements PluginInterface with TypeScript class syntax.
 */

// 插件自定义样式
// 
// 另一个做法不太推荐，但也说一下。
// 使用库: import cssInjectedByJs from 'vite-plugin-css-injected-by-js';
// 使用: 放到 defineConfig plugins 中
// 功能: 可以将 CSS 内联到 JS 中，插件只需分发单个 .js 文件
import cssText from './style.css?inline';

import type { PluginInterface, PluginRunCtx, PluginAppCtx } from 'any-menu';

let app: PluginAppCtx
let cache_el: HTMLElement|undefined

export default class ExamplePluginSimple implements PluginInterface {
  metadata = {
    id: 'example-plugin-simple',
    name: 'Example Plugin Simple',
    version: '1.0.2',
    min_app_version: '1.2.0',
    author: 'your-name',
    description: 'A minimal AnyMenu plugin template that prints Hello World.',
    icon: 'lucide-printer',
    css: cssText,
  };

  onLoad(app_: PluginAppCtx): void {
    app = app_
    console.log('[ExamplePluginSimple] Plugin loaded');
  }

  onUnload(): void {
    app.api.unregisterSubPanel('example-plugin-simple-panel')
    console.log('[ExamplePluginSimple] Plugin unloaded');
  }

  async run(ctx: PluginRunCtx): Promise<void> {
    // 注册面板示例
    if (!cache_el) {
      cache_el = document.createElement('div'); cache_el.innerText = 'New Panel Content';
      app.api.registerSubPanel({
          id: 'example-plugin-simple-panel',
          el: cache_el
      })
    }

    // 文本输出示例
    const selected = ctx.env.selectedText;
    if (selected && selected.trim() !== '') {
      // 如果有选中文本，在其后追加问候
      app.api.sendText(`${selected} — ExamplePluginSimply!`);
    } else {
      // 否则直接输出
      // app.api.sendText('ExamplePluginSimply!');

      // 否则显示面板
      app.api.hidePanel(['menu'])
      app.api.showPanel(['example-plugin-simple-panel'])
    }

    app.api.notify('ExamplePluginSimply plugin executed ✅');
  }
}
