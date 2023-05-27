const { OrderModel } = require("../models/OrderModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId

const orderRouter = require("express").Router();

orderRouter.get("/", async (req, res) => {
    const { userId } = req.body
    try {
        const orderItems = await OrderModel.aggregate([
            {
                $match: { userId: new ObjectId(userId) }
            },
            {
                $lookup: {
                    from: 'marketplace_inventories',
                    localField: 'carId',
                    foreignField: '_id',
                    as: 'cars'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'dealerId',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            { $unwind: '$cars' },
            { $unwind: '$users' },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    dealerId: 1,
                    image: '$cars.image',
                    title: '$cars.title',
                    price: '$cars.price',
                    name: '$users.name',
                    email: '$users.email',
                }
            }
        ])
        res.send(orderItems)
    } catch (error) {
        res.status(500).send({
            error: "Something went wrong",
            message: "can't find Orders",
        })
    }
})

orderRouter.get("/dealer/", async (req, res) => {
    const { userId } = req.body
    try {
        const orderItems = await OrderModel.aggregate([
            {
                $match: { dealerId: new ObjectId(userId) }
            },
            {
                $lookup: {
                    from: 'marketplace_inventories',
                    localField: 'carId',
                    foreignField: '_id',
                    as: 'cars'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            { $unwind: '$cars' },
            { $unwind: '$users' },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    dealerId: 1,
                    image: '$cars.image',
                    title: '$cars.title',
                    price: '$cars.price',
                    name: '$users.name',
                    email: '$users.email',
                }
            }
        ])
        res.send(orderItems)
    } catch (error) {
        res.status(500).send({
            error: "Something went wrong",
            message: "can't find Orders",
        })
    }
})


orderRouter.post("/", async (req, res) => {
    const { userId, carId, dealerId } = req.body
    try {
        const order = new OrderModel({ userId, carId, dealerId })
        await order.save();
        res.send({ message: "order placed" })
    } catch (error) {
        res.status(500).send({
            error: "Something went wrong",
            message: "can't place Order",
        })
    }
})

module.exports = {
    orderRouter
}