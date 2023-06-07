const db = require("../database/database")

const getProduct = async (req, res) => {
    const limit = req.query.count;
    console.log(limit)
    try {
        const sql = "SELECT * FROM products limit ?";
        const [result] = await db.execute(sql, [limit]);

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

        const product = [data.name, data.description, +data.price, data.img, +data.quantity, +data.categoy]

        const sql = "Insert into products (name, description, price, image, quantity, category_id) values (?,?,?,?,?,?);"
        await db.execute(sql, [data.name, data.description, +data.price, data.img, +data.quantity, +data.categoy])
    } catch (e) {
        console.log(e)
    }


}

const getProductPageinate = async (req, res) => {
    const limit = +req.query.limit;
    const page = +req.query.page;
    const order_by = req.query.order_by || undefined;
    try {
        let sql = ""
        if (order_by) {
            if (order_by === "name") {
                sql = "SELECT * FROM products order by name limit ? offset ?";
            }
            if (order_by === "sold") {
                sql = "SELECT * FROM products order by sold limit ? offset ?";
            }
            if (order_by === "low-price") {
                sql = "SELECT * FROM products order by price limit ? offset ?";
            }
            if (order_by === "high-price") {
                sql = "SELECT * FROM products order by price desc limit ? offset ?";
            }
        } else {
            sql = "SELECT * FROM products limit ? offset ?";
        }
        const sql1 = "SELECT count(*) as total_product FROM products"
        const [rows] = await db.query(sql1)
        const total_product = rows[0].total_product

        const total_page = Math.ceil(total_product / limit)

        const offset = (page - 1) * limit

        const [result] = await db.query(sql, [limit, offset]);

        res.status(200).json({
            total_page: total_page,
            total: total_product,
            data: result
        })
    } catch (e) {
        console.log(e)
    }
}

const getProductByCategory = async (req, res) => {
    const limit = +req.query.limit;
    const page = +req.query.page;
    const category_id = +req.query.category || undefined;
    try {
        let sql = ""
        let sql1 = ""
        if (category_id == -1) {
            sql = "SELECT * FROM products limit ? offset ?";
            sql1 = "SELECT count(*) as total_product FROM products"
            const [rows] = await db.query(sql1)
            const total_product = rows[0].total_product

            const total_page = Math.ceil(total_product / limit)

            const offset = (page - 1) * limit

            const [result] = await db.query(sql, [limit, offset]);

            res.status(200).json({
                total_page: total_page,
                total: total_product,
                data: result
            })

        } else {
            sql = "SELECT * FROM products where category_id = ? limit ? offset ?";
            sql1 = "SELECT count(*) as total_product FROM products where category_id = ?"
            const [rows] = await db.query(sql1, [category_id])
            const total_product = rows[0].total_product

            const total_page = Math.ceil(total_product / limit)

            const offset = (page - 1) * limit

            const [result] = await db.query(sql, [category_id, limit, offset]);

            res.status(200).json({
                total_page: total_page,
                total: total_product,
                data: result
            })
        }

        const [rows] = await db.query(sql1, [category_id])
        const total_product = rows[0].total_product

        const total_page = Math.ceil(total_product / limit)

        const offset = (page - 1) * limit

        const [result] = await db.query(sql, [category_id, limit, offset]);

        res.status(200).json({
            total_page: total_page,
            total: total_product,
            data: result
        })
    } catch (e) {
        console.log(e)
    }
}

const searchProduct = async (req, res) => {
    const limit = +req.query.limit;
    const page = req.query.page;
    const product_name = `%${req.query.product.trim()}%`;
    console.log(product_name)
    try {
        if (product_name) {
            const sql1 = `Select count(*) as total from products where name like ?`;
            const [row] = await db.execute(sql1, [product_name]);
            const total = row[0].total;
            const total_page = Math.ceil(total / limit)
            const offset = (page - 1) * limit

            const sql = `SELECT * FROM products where name like ? limit ? offset ?`;
            const [result] = await db.query(sql, [product_name, limit, offset])
            res.status(200).json({
                total_page: total_page,
                total: total,
                data: result
            })

        }
    } catch (error) {
        console.log(error)
    }
}

const updateProduct = (req, res) => {
    const data = req.body
}
module.exports = {
    getProduct, getProductById, addProduct, updateProduct, getProductPageinate, searchProduct, getProductByCategory
}