const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/UserModel")

const DealerAuthentication = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        res.status(401).send({
            error: "Access Denied",
            message: "Provide Token"
        })
    } else {
        jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            if (err) {
                res.status(401).send({
                    error: "Access Denied",
                    message: err.message
                })
            }
            if (decoded) {
                req.body.userId = decoded._id
                try {
                    const user = await UserModel.findById(decoded._id)
                    if (user) {
                        if (user.role === "dealer") {
                            next()
                        } else {
                            res.status(401).send({
                                error: "Access Denied",
                                message: "You are not Dealer"
                            })
                        }
                    } else {
                        res.status(401).send({
                            error: "Access Denied",
                            message: "Can't find user"
                        })
                    }
                } catch (error) {
                    res.status(401).send({
                        error: "Access Denied",
                        message: "Can't find user"
                    })
                }
            } else {
                res.status(401).send({
                    error: "Access Denied",
                    message: "Expired or Wrong token"
                })
            }
        })
    }
}

module.exports = {
    DealerAuthentication
}