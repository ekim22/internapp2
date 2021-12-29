const mongoose = require('mongoose');

const sitesSchema = mongoose.Schema({
  siteName: {type: String, required: true},
  siteDesc: {type: String, required: true},
});

module.exports = mongoose.model('BioSites', sitesSchema);
