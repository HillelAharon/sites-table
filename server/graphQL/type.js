module.exports = [
  `
  type Query {
    sitesBySiteId(_id: [String!]!): [Site!]!
    sitesByCityId(cityId: String!): [Site!]!
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
  }`
];

//sites(cityId: String!): [Site]
