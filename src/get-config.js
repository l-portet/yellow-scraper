let config;

try {
  config = require('../config');
} catch {
  config = {};
}

function getConfig() {

  config = {
    query: {
      keyword: config.query && config.query.keyword ? encodeURIComponent(config.query.keyword) : '',
      location:
        config.query && config.query.location ? encodeURIComponent(config.query.location) : ''
    },
    headless: typeof config.headless === 'undefined' ? true : config.headless,
    userAgent:
      config.userAgent ||
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    acceptLanguage:
      config.acceptLanguage || 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,la;q=0.6',
    outputFilename: config.outputFilename || 'output',
    outputFormat: config.outputFormat || 'json',
    maxResults: config.maxResults || -1,
    puppeteerArgs: config.puppeteerArgs || [],
    baseURL: config.baseURL || 'https://www.pagesjaunes.fr',
    safeMode: config.safeMode || true
  };
  return config;
}

module.exports = getConfig;
