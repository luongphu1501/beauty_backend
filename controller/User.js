const Auth = require("../ultils/Auth")
const bcrypt = require("bcrypt")
const db = require("../database/database")

const Signup = async (req, res) => {
    try {
        const userData = req.body
        if (Auth.checkSignin(userData)) {
            let sql = "Select * from accounts where email = ?";
            const [data] = await db.execute(sql, [userData.email]);
            console.log(data);
            if (data[0]) {
                return res.status(200).json({
                    EM: "Người dùng đã tồn tại",
                    EC: "1",
                    data: ""
                })
            }

            else {
                const email = userData.email
                const hashPassword = await bcrypt.hash(userData.password, 8)
                let sql = "Insert into accounts (email, password) values (?,?)";
                const data = await db.execute(sql, [email, hashPassword])
                return res.status(200).json({
                    EM: "Đăng kí thành công",
                    EC: "0",
                    data: ""
                })
            }
        }
        else {
            return res.status(200).json({
                EM: "Kiểm tra lại dữ liệu",
                EC: "2",
                data: ""
            })
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: "Server error",
            EC: "3",
            data: ""
        })
    }
}

const Login = async (req, res) => {
    const userData = req.body;
    try {
        if (Auth.checkLogin(userData)) {
            let sql = "select * from accounts where email = ?";
            const [data] = await db.execute(sql, [userData.email])
            const result = data[0];
            console.log(result)
            if (result) {
                const isAuth = await bcrypt.compare(userData.password, result.password)
                if (isAuth) {
                    return res.status(200).json({
                        EM: "Đăng nhâp thành công",
                        EC: "0",
                        data: {
                            id: result.id,
                            email: result.email,
                            username: result.username,
                            role: result.role
                        }
                    })
                }
                else {
                    return res.status(200).json({
                        EM: "Mật khẩu không chính xác",
                        EC: "1",
                        data: ""
                    })
                }

            } else {
                return res.status(200).json({
                    EM: "Email không chính xác",
                    EC: "2",
                    data: ""
                })
            }

        } else {
            return res.status(200).json({
                EM: "Kiểm tra lại dữ liệu",
                EC: "3",
                data: ""
            })
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: "Server error",
            EC: "4",
            data: ""
        })
    }
}

module.exports = {
    Signup: Signup,
    Login: Login
}