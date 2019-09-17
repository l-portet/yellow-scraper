# YellowScraper
Scrape the french yellow pages (Pages Jaunes) with puppeteer

## 🏁 Installation
```bash
npm install
```

## 🎈 Usage
Set up the `config.js` file

#### Sample config

```javascript
module.exports = {
    query: {
        keyword: 'luthier',
        location: 'Rennes'
    }, // Will search all 'luthier' businesses in 'Rennes'
    headless: true, // Use chrome in headless mode
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    acceptLanguage: 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,la;q=0.6',
    outputFilename: 'output',
    outputFormat: 'csv', // Supported format : 'json', 'csv'
    maxResults: -1, // -1 => all or N max allowed results (the scraper will stop when the limits is outreached)
    puppeteerArgs: [], // Additional args for puppeteer (like proxy for example)
    baseURL: 'https://www.pagesjaunes.fr', // Only target this domain if you have the proper rights
    safeMode: true // Safe mode sets a delay between each query
}

```

#### Run the scraper
```bash
npm start
```
## 🔧 Todo
Export as Excel format (xls)

## 🐞 Issues
If you find an issue, feel free to contact me or open an issue on github. You can also contribute by creating a pull request.

## ✋ Disclaimer
I can't be charged for any abusive usage or problem of this software. Be sure you have the proper rights before you run it.
