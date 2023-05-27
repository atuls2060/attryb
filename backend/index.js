const express = require("express");
require("dotenv").config();
const cors = require('cors')
const { Validator } = require("./middlewares/Validator");
const { Authentication } = require("./middlewares/Authentication");
const { userRouter } = require("./routes/users.routes");
const { MarketPlaceRouter } = require("./routes/marketplace.routes");
const { OEMSpecsRouter } = require("./routes/OEMSpecs.routes");
const { orderRouter } = require("./routes/order.routes");
const { connection } = require("./utils/db");

const app = express();
app.use(cors({
    origin: process.env.ORIGIN_URL
}))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("server running")
})

app.use("/users", Validator, userRouter)
app.use("/marketplace", MarketPlaceRouter)
app.use("/oems", Authentication, OEMSpecsRouter)
app.use("/orders", Authentication, orderRouter)


const PORT = process.env.PORT

app.listen(PORT, async () => {
    try {
        await connection()
        console.log("Connected to db")
    } catch (error) {
        console.log("error", error.message)
    }
    console.log(`server running on port ${PORT}`)
})
