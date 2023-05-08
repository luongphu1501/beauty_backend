const checkSignin = (userData) => {
    if (!userData.email || !userData.password || !userData.checkedPassword) {
        return false;
    } else if (userData.password !== userData.checkedPassword) {
        return false;
    }
    return true
}


const checkLogin = (userData) => {
    if (!userData.email || !userData.password) {
        return false;
    }
    return true
}
module.exports = {
    checkSignin: checkSignin,
    checkLogin: checkLogin
}