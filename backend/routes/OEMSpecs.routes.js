const { DealerAuthentication } = require("../middlewares/DealerAuthentication");
const { OEMSpecsModel } = require("../models/OEMSpecsModel");

const OEMSpecsRouter = require("express").Router();



OEMSpecsRouter.get("/", DealerAuthentication, async (req, res) => {
    const { keyword } = req.query

    try {
        const count = await OEMSpecsModel.countDocuments()
        if (keyword !== "") {
            let regexPattern = new RegExp(keyword, "i");
            const specs = await OEMSpecsModel.find({
                model: { $regex: regexPattern },
            })
            res.send({ totalSpecs: count, specs })
        } else {
            const specs = await OEMSpecsModel.find()
            res.send({ totalSpecs: count, specs })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: "Something went wrong!",
            message: "Can't get OEM Specs",
        })
    }
})
OEMSpecsRouter.get("/:id", DealerAuthentication, async (req, res) => {
    const id = req.params.id
    try {
        const count = await OEMSpecsModel.countDocuments()
        const spec = await OEMSpecsModel.find({ id })
        res.send({ totalSpecs: count, spec })
    } catch (error) {
        res.status(500).send({
            error: "Something went wrong!",
            message: "Can't get OEM Spec",
        })
    }
})
module.exports = {
    OEMSpecsRouter
}
