import { expect } from 'chai';
import { ProductScraper, ProductScraperPlugin } from '../src/product-scraper-core';

const calcPlugin: ProductScraperPlugin = {
  name: 'calc',
  version: '0.0.0',
  add(a: number, b: number) {
    return a + b;
  }
};

describe('Scraper', () => {
  describe('create new instance', () => {
    let scraper: ProductScraper;

    beforeEach(() => {
      scraper = new ProductScraper();
    });

    it('should have an init method', () => {
      expect(scraper.init).to.be.a('function');
    });
  });

  describe('init', () => {
    let scraper: ProductScraper;

    beforeEach(() => {
      scraper = new ProductScraper();
    });

    it('should return a promise', () => {
      expect(scraper.init()).to.be.a('promise');
    });

    it('should have initialized the property browser', async () => {
      await scraper.init();
      expect(scraper.browser).to.not.be.null;
      return;
    });

    it('should raise an error when trying to initialize a new browser object', async () => {
      return scraper.init().catch((err) => {
        expect(err.message).to.equal('Private property _browser already instantiated');
      });
    });
  });

  describe('destroy', () => {
    let scraper: ProductScraper;

    beforeEach(async () => {
      scraper = new ProductScraper();
      await scraper.init();
      return;
    });

    it('should return a promise', () => {
      expect(scraper.destroy()).to.be.a('promise');
    });

    it('should have destroyed the property browser', async () => {
      await scraper.destroy();
      expect(scraper.browser).to.be.undefined;
      return;
    });

    it('should raise an error when trying to destroy an already destroyed browser object', async () => {
      await scraper.destroy();
      return scraper.destroy().catch((err) => {
        expect(err.message).to.equal('Private property _browser already destroyed');
      });
    });
  });

  describe('register', () => {
    let scraper: ProductScraper;

    beforeEach(() => {
      scraper = new ProductScraper();
      scraper.register(calcPlugin);
    });

    it('should have plugin registered', () => {
      expect(scraper.plugins(calcPlugin.name)).to.not.be.undefined;
      expect(scraper.plugins(calcPlugin.name).add).to.be.a('function');
    });

    it('should received 2 as result', () => {
      expect(scraper.plugins(calcPlugin.name).add(1, 1)).to.equal(2);
    });

    it('should raise an error when plugin is already registered', () => {
      expect(scraper.register.bind(scraper, calcPlugin)).to.throw(/Plugin already registered/);
    });
  });

  describe('unregister', () => {
    let scraper: ProductScraper;

    beforeEach(() => {
      scraper = new ProductScraper();
      scraper.register(calcPlugin);
      scraper.unregister(calcPlugin.name);
    });

    it('should have plugin unregistered', () => {
      expect(scraper.plugins(calcPlugin.name)).to.be.undefined;
    });

    it('should raise an error when plugin is already unregistered', () => {
      expect(scraper.unregister.bind(scraper, calcPlugin)).to.throw(/Plugin already unregistered/);
    });
  });
});
