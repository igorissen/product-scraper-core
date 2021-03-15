# Product Scraper Core

## Installation

```
npm i -E @igorissen/product-scraper-core
```

## Usage

```node
const { ProductScraper } = require('@igorissen/product-scraper-core');

const scraper = new ProductScraper();

// Launch an headless browser using puppeteer
await scraper.init();

// Close headless browser
await scraper.destroy();

// Register a plugin
scraper.register(pluginObject);

// Unregister a plugin
scraper.unregister(pluginName);

// Get a plugin
scraper.plugins(pluginName);
```

## Roadmap

See the [open issues](https://github.com/igorissen/product-scraper-core/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create.
Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Branch
   - feature : **feat/<branch-name>**
   - fix : **fix/<branch-name>**
3. Commit your Changes
4. Push to the Branch
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
