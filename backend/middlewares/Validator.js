
const Validator = (req, res, next) => {
    const userData = req.body;

    if (!userData.email || !userData.password) {
        res.status(400).send({
            error: "Validation Error",
            message: "All fields required"
        })
    } else {
        next()
    }
}

module.exports = {
    Validator
}