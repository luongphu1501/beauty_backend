const adminAuth = (req, res, next) => {
    const userData = req.session.user
    if (userData && userData.role == 2) {
        next()
    } else {
        res.status(404)
    }

}

const userAuth = (req, res, next) => {
    const userData = req.session.user
    console.log(userData)
    if (userData && userData.role == 1) {
        next()
    } else {
        res.status(404)
    }
}

module.exports = {
    adminAuth, userAuth
}