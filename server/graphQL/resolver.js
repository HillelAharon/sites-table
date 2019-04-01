const Site = require("../models/Site");

module.exports = [
  {
    Query: {
      sitesBySiteId: (root, sitesIds) => {
        return new Promise((resolve, reject) => {
          Site.find(sitesIds).exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
      },
      sitesByCityId: (root, cityId) => {
        return new Promise((resolve, reject) => {
          Site.find(cityId).exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
      }
    }
  }
];
