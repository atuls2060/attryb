const mongoose = require("mongoose");



const OrderSchema = mongoose.Schema({
    carId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    dealerId: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
})

const OrderModel = mongoose.model("order", OrderSchema)


module.exports = {
    OrderModel
}