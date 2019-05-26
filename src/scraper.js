const scrapePage = require('./scrape-page');

async function scrape(browser, page, config) {
  if (typeof browser === 'undefined' || typeof page === 'undefined') {
    throw 'Error: broken puppeteer';
  }
  let data = [];
  let nextPage;

  do {
    nextPage = await getNextPageURI();
    let items = await scrapePage(page);

    if (config.safeMode) await new Promise(r => setTimeout(r, 1000));
    if (typeof nextPage === 'string')
        await page.goto(nextPage);
    data.push(...items);
    if (~config.maxResults && data.length >= config.maxResults) return data;
  } while (nextPage !== null);

  return data;

  async function getNextPageURI() {
    return await page.evaluate(() => {
      let nextPageItem = document.getElementById('pagination-next');
      if (!nextPageItem) return null;
      let nextPageLink = nextPageItem.getAttribute('data-pjlb');
      if (!nextPageLink || !nextPageLink.length) return null;
      try {
        nextPageLink = JSON.parse(nextPageLink);
      } catch {
        // console.error('JSON ERROR\n');
        return null;
      }
      if (!nextPageLink.url) return null;

      nextPageItem.setAttribute('href', atob(nextPageLink.url) || null);

      return nextPageItem.href || null;
    });
  }
}

module.exports = scrape;
