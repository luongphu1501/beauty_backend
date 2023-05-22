const db = require("../database/database")

const getCategory = async (req, res) => {
    try {
        const sql = "SELECT * FROM categories limit 4";
        const [result] = await db.execute(sql);
        console.log(result)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        console.log(e)
    }
}

const getCategoryById = async (req, res) => {
    const id = req.query.id;
    try {
        const sql = "SELECT * FROM categories where id = ?";
        const [result] = await db.execute(sql, [id]);
        const data = result[0]
        console.log(result)
        res.status(200).json({
            data: data
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getCategory, getCategoryById
}