module.exports = [
  `
  type Query {
    sitesBySiteId(_id: [String!]!): [Site!]!
    sitesByCityId(cityId: String!): [Site!]!
  }

  type Mutation {
    updateSite(_id: String!, name: String, address: String, type: String, serialNumber: String, phone: String, qrCode: String):Site
    updateSites(sites: [inputSite!]!): [Site]!
  }

  type Site {
    _id: String!
    cityId: String!
    name: String
    address: String
    type: String
    serialNumber: String
    phone: String
    qrCode: String
  }

  input inputSite {
    _id: String!
    updatedAttr: SiteAttr! 
  }
  
  input SiteAttr {
    name: String
    address: String
    type: String
    serialNumber: String
    phone: String
    qrCode: String
  }`
];

// input inputSite {
//   _id: String!
//   name: String
//   address: String
//   type: String
//   serialNumber: String
//   phone: String
//   qrCode: String
// }
//updateSites2(_id: [String!]!, attributes: [SiteAttr!]!): [Site]!
