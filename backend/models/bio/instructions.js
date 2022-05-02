const mongoose = require('mongoose');

const instructionsSchema = mongoose.Schema({
  instructions: {type: String, required: true},
});

module.exports = mongoose.model('BioInstructions', instructionsSchema);
