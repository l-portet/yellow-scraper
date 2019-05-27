const YellowScraper = require('./src/yellow-scraper')
const config = require('./config');

const scraper = new YellowScraper(config);

scraper.run();
