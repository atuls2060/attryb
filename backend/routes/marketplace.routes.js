const MarketPlaceRouter = require("express").Router();
const { default: mongoose } = require("mongoose");
const { DealerAuthentication } = require("../middlewares/DealerAuthentication");
const { MarketPlaceModel } = require("../models/MarketPlaceModel");



MarketPlaceRouter.get("/", async (req, res) => {
    const { filterField, order, colorFilter } = req.query
    const sortStage = {
        $sort: {
            [filterField]: order === "asc" ? 1 : -1
        }
    }
    const colorStage = {
        $match: {
            colors: {
                $regex: colorFilter,
                $options: "i"
            }
        }
    }
    const pipeLine = [
        {
            $lookup: {
                from: 'oemspecs',
                localField: 'oemsId',
                foreignField: '_id',
                as: 'specs'
            }
        },
        { $unwind: '$specs' },
        {
            $project: {
                _id: 1,
                image: 1,
                title: 1,
                price: 1,
                kmsOnOdometer: 1,
                majorScratches: 1,
                originalPaint: 1,
                accidentsReported: 1,
                previousBuyers: 1,
                registrationPlace: 1,
                dealerId: 1,
                model: '$specs.model',
                year: '$specs.year',
                listPrice: '$specs.listPrice',
                colors: '$specs.colors',
                mileage: '$specs.mileage',
                power: '$specs.power',
                maxSpeed: '$specs.maxSpeed',
            }
        },

    ]
    if (filterField !== "") {
        pipeLine.push(sortStage)
    }
    if (colorFilter !== "") {
        pipeLine.push(colorStage)
    }
    try {
        const carList = await MarketPlaceModel.aggregate(pipeLine)
        res.send(carList)
    } catch (error) {
        res.status(500).send({
            error: "Something went wrong!",
            message: "Can't get cars",
        })
    }
})

MarketPlaceRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const cars = await MarketPlaceModel.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(id) }
            },
            {
                $lookup: {
                    from: 'oemspecs',
                    localField: 'oemsId',
                    foreignField: '_id',
                    as: 'specs'
                }
            },
            { $unwind: '$specs' },
            {
                $project: {
                    _id: 1,
                    image: 1,
                    title: 1,
                    price: 1,
                    kmsOnOdometer: 1,
                    majorScratches: 1,
                    originalPaint: 1,
                    accidentsReported: 1,
                    previousBuyers: 1,
                    registrationPlace: 1,
                    dealerId: 1,
                    model: '$specs.model',
                    year: '$specs.year',
                    listPrice: '$specs.listPrice',
                    colors: '$specs.colors',
                    mileage: '$specs.mileage',
                    power: '$specs.power',
                    maxSpeed: '$specs.maxSpeed',
                }
            }
        ])
        res.send(cars[0])
    } catch (error) {
        res.status(500).send({
            error: "Something went wrong!",
            message: "Can't get car details",
        })
    }
})

MarketPlaceRouter.get("/details/:id", async (req, res) => {
    const id = req.params.id
    try {
        const cars = await MarketPlaceModel.findById(id)

        res.send(cars)
    } catch (error) {
        res.status(500).send({
            error: "Something went wrong!",
            message: "Can't get car details",
        })
    }
})

MarketPlaceRouter.get("/dealer/inventory", DealerAuthentication, async (req, res) => {
    const { userId } = req.body
    try {
        const carList = await MarketPlaceModel.find({ delearId: mongoose.Types.ObjectId(userId) })
        res.send(carList)
    } catch (error) {
        res.status(500).send({
            error: "Something went wrong!",
            message: "Can't get inventory",
        })
    }
})
MarketPlaceRouter.post("/", DealerAuthentication, async (req, res) => {
    const { userId, ...rest } = req.body
    if (userId) {
        try {
            const task = new MarketPlaceModel({ ...rest, dealerId: userId })
            await task.save();
            res.send({
                message: "Car Added!",
            })
        } catch (error) {
            res.status(400).send({
                error: "Something went wrong!",
                message: "Can't add car",
            })
        }

    } else {
        res.status(400).send({
            error: "Something went wrong!",
            message: "Can't add car",
        })
    }
})

MarketPlaceRouter.patch("/:id", DealerAuthentication, async (req, res) => {
    const id = req.params.id;

    const { userId, ...rest } = req.body
    try {
        await MarketPlaceModel.findByIdAndUpdate(id, { ...rest })
        res.send({
            message: "Car Updated!",
        })
    } catch (error) {
        res.status(400).send({
            error: "Something went wrong!",
            message: "Can't Update car",
        })
    }

})


MarketPlaceRouter.delete("/:id", DealerAuthentication, async (req, res) => {
    const id = req.params.id;

    try {
        await MarketPlaceModel.findByIdAndDelete(id);
        res.send({
            message: "Deleted Successfully",
        })
    } catch (error) {
        res.status(400).send({
            error: "Something went wrong!",
            message: "Can't Delete",
        })
    }

})


module.exports = {
    MarketPlaceRouter
}
