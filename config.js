module.exports = {
    query: {
        keyword: 'luthier',
        location: 'Rennes'
    },
    headless: true,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    acceptLanguage: 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,la;q=0.6',
    outputFilename: 'plop',
    outputFormat: 'csv',
    maxResults: -1,
    puppeteerArgs: [],
    baseURL: 'https://www.pagesjaunes.fr',
    safeMode: true
}
