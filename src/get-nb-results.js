async function getNbResults(page) {
  return await page.evaluate(() => {
    let results = document.getElementById('SEL-nbresultat');
    try {
      results = results.innerText.replace(/\s/g, '');
    } catch {
      results = -1;
    }
    results = Number(results);
    return isNaN(results) ? -1 : results;
  });
}

module.exports = getNbResults;
