function convertToCsv(data = []) {
  const keys = [
    'title',
    'address',
    'phone',
    'website',
    'rank.score',
    'rank.reviews',
    'work.category',
    'work.description',
    'pjLink'
  ];
  let dataCsv = [];

  dataCsv.push(keys.join(',')); // first line

  data.forEach(item => { // iterate on each line by obj in data
    let currentLine = '';

    keys.forEach((key, index) => { // get each keys in the right order
      currentLine += `"${objByStr(item, key) || ''}"`;
      currentLine += index + 1 === keys.length ? '' : ',';
    });
    dataCsv.push(currentLine);
  });

  dataCsv = dataCsv.join('\n');

  return dataCsv;

  function objByStr(obj, str) {
    str = str.replace(/\[(\w+)\]/g, '.$1');
    str = str.replace(/^\./, '');
    let a = str.split('.');

    for (let i = 0, n = a.length; i < n; ++i) {
      let k = a[i];
      if (k in obj) {
        obj = obj[k];
      } else {
        return;
      }
    }
    return obj;
  }
}

module.exports = convertToCsv;
