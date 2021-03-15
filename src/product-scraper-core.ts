import { Browser, launch } from 'puppeteer';
import { EventEmitter } from 'events';

export declare interface ProductScraper {
  on(event: 'init' | 'destroy', listener: () => void);
  on(event: 'register' | 'unregister', listener: () => string);
}

export type ProductScraperPluginCore = {
  name: string;
  version: string;
};

export type ProductScraperPlugin = ProductScraperPluginCore & {
  [key: string]: any; // eslint-disable-line
};

export class ProductScraper extends EventEmitter {
  private _browser: Browser;
  private readonly _plugins = new Map<string, ProductScraperPlugin>();

  get browser(): Browser {
    return this._browser;
  }

  public async init(headless: boolean = true): Promise<void> {
    if (this._browser) throw new Error('Private property _browser already instantiated');
    this._browser = await launch({ headless, defaultViewport: undefined });
    this.emit('init');
  }

  public async destroy(): Promise<void> {
    if (!this._browser) throw new Error('Private property _browser already destroyed');
    await this._browser.close();
    this._browser = undefined;
    this.emit('destroy');
  }

  public register(plugin: ProductScraperPlugin): void {
    if (this._plugins.has(plugin.name)) throw new Error('Plugin already registered');
    for (const key of Object.keys(plugin)) {
      if (['name', 'version'].every((property) => property !== key)) {
        plugin[key] = plugin[key].bind(this);
      }
    }
    this._plugins.set(plugin.name, plugin);
    this.emit('register', `Plugin ${plugin.name} (${plugin.version}) registered`);
  }

  public unregister(pluginName: string): void {
    if (!this._plugins.has(pluginName)) throw new Error('Plugin already unregistered');
    const plugin = this._plugins.get(pluginName);
    this._plugins.delete(pluginName);
    this.emit('unregister', `Plugin ${plugin.name} (${plugin.version}) unregistered`);
  }

  public plugins(pluginName: string): ProductScraperPlugin | undefined {
    if (!this._plugins.has(pluginName)) return;
    return this._plugins.get(pluginName);
  }
}
