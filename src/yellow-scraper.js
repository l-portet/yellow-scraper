const staticConfig = require('./get-config')();
const pup = require('puppeteer');
const fs = require('fs');
const convertToCsv = require('./convert-to-csv');
const ora = require('ora');
const spinners = {
  setup: ora('Setting all up and fetching website'),
  scrape: ora(),
  close: ora('Exporting results'),
  end: ora('Done!')
};

const scrape = require('./scraper');
const getNbResults = require('./get-nb-results');

class YellowScraper {
  constructor(dynamicConfig) {
    this.config = dynamicConfig || staticConfig;
    this.data = [];
    this.nbResults = -2;
    this.timestamp = Date.now();
  }

  async run() {
    spinners.setup.start();
    try {
      await this.setup();
    } catch (e) {
      spinners.setup.fail(`Error: Cannot set up scraper and fetch website.`);
      throw e;
    }
    spinners.setup.succeed();
    this.nbResults = await getNbResults(this.page);
    spinners.scrape.text += `Scraping ${
      this.nbResults
    } items (may take a while, grab a beer)`;
    spinners.scrape.start();
    try {
      this.data = await scrape(this.browser, this.page, this.config);
    } catch (e) {
      spinners.scrape.fail('Error: Cannot scrape data');
      throw e;
    }
    spinners.scrape.succeed();
    spinners.close.start();
    try {
      await this.close();
    } catch (e) {
      spinners.close.fail(
        "Error: Cannot export results\nHere's a copy of the scraped data"
      );
      console.log(this.data);
    }
    spinners.close.succeed();
    this.timestamp = (Date.now() - this.timestamp) / 1000;
    this.timestamp = this.timestamp.toFixed(2);
    spinners.end.text += ` Scraped [${this.data.length}/${
      this.nbResults
    }] items in ${this.timestamp} seconds`;
    spinners.end.start();
    spinners.end.stopAndPersist({ symbol: '\uD83C\uDF7A' });
  }
  async setup() {
    this.browser = await pup.launch({
      headless: this.config.headless,
      args: [...this.config.puppeteerArgs]
    });
    this.page = await this.browser.newPage();

    this.page.on('console', consoleObj => console.log(consoleObj.text()));
    await this.page.setViewport({ width: 800, height: 600 });
    await this.page.setUserAgent(this.config.userAgent);
    await this.page.setExtraHTTPHeaders({
      'Accept-Language': this.config.acceptLanguage
    });
    await this.page.goto(
      `${this.config.baseURL}/annuaire/chercherlespros?quoiqui=${
        this.config.query.keyword
      }&ou=${this.config.query.location}`
    );
  }

  async close() {
    this.writeFile();
    this.browser.close();
    console.log('closed');
  }
  async writeFile() {
    let fileContent = this.data;

    if (this.config.outputFormat === 'csv') fileContent = convertToCsv(fileContent);
    else fileContent = JSON.stringify(fileContent);
    fs.writeFile(
      `${this.config.outputFilename}.${this.config.outputFormat}`,
      fileContent,
      () => {}
    );
  }
}

module.exports = YellowScraper;
