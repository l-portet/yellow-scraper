async function scrapePage(page) {
  return await page.evaluate(() => {
    function getTitle(item) {
      let title = item.querySelector('.denomination-links');

      try {
        title = title.innerText;
      } catch {
        title = '';
      }
      return title;
    }

    function getAddress(item) {
      let address = item.querySelector('.adresse');

      try {
        address = address.innerText;
      } catch {
        address = '';
      }
      return address;
    }

    function getPhone(item) {
      let phone = item.querySelector('.tel-zone .num');
      try {
        phone = phone.getAttribute('title');
      } catch {
        phone = '';
      }
      return phone;
    }

    function getWebsite(item) {
      let hiddenData = item.querySelector('.site-internet a');

      if (!hiddenData) return '';
      hiddenData = hiddenData.getAttribute('data-pjlb');
      if (!hiddenData || !hiddenData.length) return '';
      try {
        hiddenData = JSON.parse(hiddenData);
      } catch {
        console.error('JSON ERROR\n');
        return '';
      }
      if (!hiddenData.url) return '';
      return atob(hiddenData.url);
    }

    function getRank(item) {
      let score = null;
      let reviews = 0;

      reviews = item.querySelector('.nb_avis');
      if (reviews) {
        reviews = reviews.innerText || '0';
      } else {
        reviews = '0';
      }

      reviews = parseInt(reviews, 10);
      let nullStars = item.querySelectorAll('.nullnote');
      let halfStar = item.querySelector('.halfnote');

      if (nullStars && [...nullStars].length) {
        score = [...nullStars].length;
        score = score ? 5 - score : null;
      } else {
        let stars = item.querySelectorAll('.icon-etoile');
        score = reviews ? 5 : null;
        if (![...stars].length) score = null;
      }
      score += halfStar ? 0.5 : 0;

      return { score, reviews };
    }

    function getWork(item) {
      let category = item.querySelector('.activites');
      let description = item.querySelector('.zone-cvi-cviv');

      try {
        category = category.innerText;
      } catch {
        category = '';
      }
      try {
        description = description.innerText;
      } catch {
        description = '';
      }

      description = description.split('\n\n').join('\n');
      return { category, description };
    }

    function getPjLink(item) {
      return item.querySelector('.denomination-links').href || '';
    }

    let items = [...document.querySelectorAll('#listResults article')].map(
      item => {
        return {
          title: getTitle(item),
          address: getAddress(item),
          phone: getPhone(item),
          website: getWebsite(item),
          rank: getRank(item),
          work: getWork(item),
          pjLink: getPjLink(item)
        };
      }
    );
    return items;
  });
}

module.exports = scrapePage;
