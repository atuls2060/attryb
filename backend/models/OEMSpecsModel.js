const mongoose = require('mongoose');

const OEMSpecsSchema = new mongoose.Schema({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  listPrice: { type: Number, required: true },
  colors: [{ type: String }],
  mileage: { type: Number },
  power: { type: Number },
  maxSpeed: { type: Number }
});

const OEMSpecsModel = mongoose.model('OEMSpecs', OEMSpecsSchema);

module.exports = {
  OEMSpecsModel
}
