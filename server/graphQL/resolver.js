const Site = require('../models/Site');

module.exports = [{
  Query: {
    site: (root, args) => {
      return new Promise((resolve, reject) => {
        Site.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    sites: (root, args) => {
      return new Promise((resolve, reject) => {
        Site.find(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
}];