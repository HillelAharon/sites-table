const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SiteSchema = new Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  cityId: {
    type: String,
    required: true    
  },
  address: {
    type: String   
  },
  type: {
    type: String   
  },
  serialNumber: {
    type: String    
  },
  phone: {
    type: String    
  },
  qrCode: {
    type: String 
  }
  
});

module.exports = mongoose.model("sites", SiteSchema);