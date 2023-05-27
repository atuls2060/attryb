const mongoose = require('mongoose');

const MarketPlaceSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    kmsOnOdometer: { type: Number },
    majorScratches: { type: Boolean },
    originalPaint: { type: Boolean },
    accidentsReported: { type: Number },
    previousBuyers: { type: Number },
    registrationPlace: { type: String },
    dealerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    oemsId: { type: mongoose.Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now },
});

const MarketPlaceModel = mongoose.model('marketplace_inventory', MarketPlaceSchema);

module.exports = {
    MarketPlaceModel
}
