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
    const sessionData = req.session;
    try {
        if (Auth.checkLogin(userData)) {
            let sql = "select * from accounts where email = ?";
            const [data] = await db.execute(sql, [userData.email])
            const result = data[0];

            if (result) {
                const isAuth = await bcrypt.compare(userData.password, result.password)
                if (isAuth) {
                    sessionData.user = {
                        id: result.id,
                        username: result.username,
                        role: result.role
                    }
                    return res.status(200).json({
                        EM: "Đăng nhâp thành công",
                        EC: "0",
                        data: result
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

const postUpdateUser = async (req, res) => {
    const user = req.body.user;
    const id = req.body.id;
    try {
        const sql = `UPDATE accounts SET username = ?,
         phone = ?, address = ?, birthday = ?, gender = ? WHERE (id = ?);`
        const result = await db.execute(sql, [user.username, user.phone, user.address, user.dob, user.gender, id])
        console.log(result)
        res.status(200).json(
            {
                "EC": 0,
                "EM": "Cập nhật thông tin thành công"
            }
        )
    } catch (e) {
        console.log(e)
    }
}

const getUserPageinate = async (req, res) => {
    const limit = +req.query.limit;
    const page = req.query.page;

    try {
        const sql1 = "SELECT count(*) as total_users FROM accounts where role = ?";
        const [rows] = await db.query(sql1, [1])
        const total_users = rows[0].total_users

        const total_page = Math.ceil(total_users / limit)

        const offset = (page - 1) * limit
        const sql = "SELECT * FROM accounts WHERE role= ? limit ? offset ? ";
        const [result] = await db.query(sql, [1, limit, offset]);

        res.status(200).json({
            total_page: total_page,
            total: total_users,
            data: result
        })
    } catch (e) {
        console.log(e)
    }
}



module.exports = {
    Signup: Signup,
    Login: Login, getUserPageinate, postUpdateUser
}