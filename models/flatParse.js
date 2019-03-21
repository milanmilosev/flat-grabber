const rp = require('request-promise')
const mongoose = require('mongoose')
const $ = require('cheerio')

const flatParse = (url) => {
  return rp(url)
    .then(function(html) {
      return {
        _id: new mongoose.Types.ObjectId,
        name: $('.main-criteria-headline-size h1', html).text().trim(),
        price: $('.grid-item.lap-one-half.desk-one-half.padding-right-s dl:last-child dd', html).text().trim(),
        rooms: $('.main-criteria-container > div:nth-child(2) div:first-child', html).text().trim(),
        size: $('.main-criteria-container > div:last-child div:first-child', html).text().trim(),
        address: $('.address-block span:first-child', html).text().trim(),
        link: url
      }
    })
    .catch(function(err) {
      //handle error
    });
};

module.exports = flatParse;
