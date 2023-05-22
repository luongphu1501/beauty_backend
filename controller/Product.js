const db = require("../database/database")

const getProduct = async (req, res) => {
    const limit = req.query.count;
    console.log(limit)
    try {
        const sql = "SELECT * FROM products limit ?";
        const [result] = await db.execute(sql, [limit]);
        console.log(result)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        console.log(e)
    }
}

const getProductById = async (req, res) => {
    const id = req.query.id;
    console.log(id)
    try {
        const sql = "SELECT * FROM products where id =  ?";
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

const addProduct = async (req, res) => {
    try {
        const data = req.body.data;
        console.log(data)
        const product = [data.name, data.description, +data.price, data.img, +data.quantity, +data.categoy]
        console.log(product)
        const sql = "Insert into products (name, description, price, image, quantity, category_id) values (?,?,?,?,?,?);"
        await db.execute(sql, [data.name, data.description, +data.price, data.img, +data.quantity, +data.categoy])
    } catch (e) {
        console.log(e)
    }


}

const getProductPageinate = async (req, res) => {
    const limit = +req.query.limit;
    const page = +req.query.page;

    try {
        const sql1 = "SELECT count(*) as total_product FROM products"
        const [rows] = await db.query(sql1)
        const total_product = rows[0].total_product

        const total_page = Math.ceil(total_product / limit)
        console.log(page)
        const offset = (page - 1) * limit
        const sql = "SELECT * FROM products limit ? offset ?";
        const [result] = await db.query(sql, [limit, offset]);
        console.log(result)
        res.status(200).json({
            total_page: total_page,
            total: total_product,
            data: result
        })
    } catch (e) {
        console.log(e)
    }
}


const updateProduct = (req, res) => {
    const data = req.body
}
module.exports = {
    getProduct, getProductById, addProduct, updateProduct, getProductPageinate
}