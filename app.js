const rp = require('request-promise')
const $ = require('cheerio')
const FlatParse = require('./models/flatParse')
const FlatSchema = require('./db/flatSchema')
const sendEmail = require('./lib/sendEmail')

// --------------------
// Configuration
// full immobilienscout24 link with search queries
const url = `${process.env.IMMO_SEARCH_LINK}`;
//
// locate and extract the link (href) with the help of css selector
const link = '.result-list-entry__data-container .result-list-entry__brand-title-container';
//
// number of search results (flats) per page
const itemsPerPage = 10;
// ---------------------


// promise refactoring
let app = () => {
  rp(url)
    .then(function(html) {
      // extract a direct link for each flat
      const linkCollection = [];
      for (let i = 0; i < itemsPerPage; i++) {
        linkCollection.push($(link, html)[i].attribs.href);
      }
      return Promise.all(
        linkCollection.map(function(url) {
          // Debugging
          // console.log(`https://www.immobilienscout24.de${url}`);
          return FlatParse(`https://www.immobilienscout24.de/${url}`);
        })
      );
    })
    .then(function(flats) {
      console.log('dataparse done!');
      console.log('searching for new flats...');    

      const fetchData = () => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      };

      for (let flat in flats) {
        fetchData(flats[flat]).then(function () {
          // Check if result exist in DB
          FlatSchema.find({link: flats[flat].link}, function(a, b) {
            if(!b.length) {
              console.log(`new flats: ${flats[flat].name}`)
              // store in DB
              new FlatSchema(flats[flat])
                .save(function (err, product) {
                  if(product) {console.log('data saved')}
                  if(err) {console.log(err)}
              })
              let thisFlat = flats[flat];
              
              sendEmail(thisFlat);
            }
          });
        });
      }
    })
    .catch(function(err) {
      //handle error
      console.log(err);
  });
}

module.exports = app;
