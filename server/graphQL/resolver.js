const Site = require("../models/Site");

module.exports = [
  {
    Query: {
      sitesBySiteId: (root, sitesIds) => {
        console.log(`in sites by site id resolver with:\n`);
        console.log(sitesIds);
        return new Promise((resolve, reject) => {
          Site.find(sitesIds).exec((err, res) => {
            console.log(res);
            err ? reject(err) : resolve(res);
          });
        });
      },
      sitesByCityId: (root, cityId) => {
        console.log(`in sites by city id resolver with:\n`);
        console.log(cityId);
        return new Promise((resolve, reject) => {
          Site.find(cityId).exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
      }
    },
    Mutation: {
      updateSite: (root, site) => {
        const siteId = { _id: site._id };
        delete site._id;
        const siteAttr = site;
        return new Promise((resolve, reject) => {
          Site.findByIdAndUpdate(siteId, { $set: siteAttr }).exec(
            (err, res) => {
              err ? reject(err) : resolve(res);
            }
          );
        });
      },
      updateSites: (root, updatedSites) => {
        let _sites = updatedSites.sites;
        for (let i = 0; i < _sites.length; i++) {
          for (attr in _sites[i].updatedAttr) {
            if (attr === "name" && _sites[i].updatedAttr[attr] === "") {
              delete _sites[i].updatedAttr[attr];
            }
          }
        }
        const sitesUpdating = _sites.map(site => {
          try {
            return Site.findOneAndUpdate(
              { _id: site._id },
              { $set: site.updatedAttr }
            );
          } catch (e) {
            return 0;
          }
        });
        return Promise.all(sitesUpdating);
      }
    }
  }
];

// updateSites2: (root, sites) => {
//   let zipSiteIdAndAttr = sites._id.map((id, i) => [
//     { _id: id },
//     sites.attributes[i]
//   ]);
//   //preventing name deletion
//   for (let i = 0; i < zipSiteIdAndAttr.length; i++) {
//     for (attr in zipSiteIdAndAttr[i][1]) {
//       if (attr === "name" && zipSiteIdAndAttr[i][1][attr] === "") {
//         delete zipSiteIdAndAttr[i][1][attr];
//       }
//     }
//   }
//   const sitesUpdating = zipSiteIdAndAttr.map(site => {
//     try {
//       return Site.findOneAndUpdate(site[0], { $set: site[1] });
//     } catch (e) {
//       return 0;
//     }
//   });
//   return Promise.all(sitesUpdating);
// }
