const db = require("../database/database")

const createOrder = async (req, res) => {
    const listProduct = req.body.listProduct;
    const customer_id = req.body.customer_id

    console.log("call api successfully")
    console.log(listProduct)
    console.log(customer_id)

    try {
        if (listProduct && customer_id) {
            let total = 0
            let sql = `INSERT INTO orders (customer_id) VALUES (?) `;
            await db.execute(sql, [customer_id]);

            let sql1 = "SELECT id FROM orders ORDER BY id DESC";
            const [rows] = await db.execute(sql1);
            const order_id = +rows[0].id

            listProduct.forEach(async (item) => {
                let sql2 = `INSERT INTO order_item (quantity, product_id, order_id, unit_price) VALUES (?, ?, ?, ?) ;`
                const data = [
                    item.quantity, item.id, order_id, item.price
                ]
                total += item.quantity * item.price
                await db.execute(sql2, data)
            })
            let sql3 = "UPDATE orders SET total = ? WHERE (`id` = ?)";
            await db.execute(sql3, [total, order_id])
        }
    } catch (e) {
        console.log(e)
    }
}

const getOrderAdmin = async (req, res) => {
    const limit = +req.query.limit;
    const page = req.query.page;

    try {
        const sql1 = `
        SELECT count(*) as total_orders from orders;
        `
        const [rows] = await db.query(sql1)
        const total_orders = rows[0].total_orders

        const total_page = Math.ceil(total_orders / limit)
        console.log(page)
        const offset = (page - 1) * limit
        const sql = `
        SELECT o.id AS order_id, o.total, a.username, date(o.order_date) as order_date, o.status
        FROM orders o
        JOIN accounts a ON o.customer_id = a.id
        limit ? offset ?
        `

        const [result] = await db.query(sql, [limit, offset]);
        console.log(result)
        res.status(200).json({
            total_page: total_page,
            total: total_orders,
            data: result
        })
    } catch (e) {
        console.log(e)
    }
}


const getRevenueStat = async (req, res) => {
    const year = req.query.year
    try {
        const sql = `SELECT month(order_date) as month, SUM(total) AS month_revenue
        FROM orders
        where year(order_date) = ?
        GROUP BY month
        ;`
        const [result] = await db.execute(sql, [year])
        console.log(result)
        res.status(200).json(
            { data: result }
        )
    } catch (e) {
        console.log(e)
    }
}

const getProductRenevue = async (req, res) => {

    try {
        const sql = `select p.name , total_sell*p.price as product_renevue from 
        products as p 
        join (select oi.product_id ,count(oi.quantity) as total_sell
        from order_item as oi join orders as o
        on oi.order_id = o.id
        group by oi.product_id) as tmp on tmp.product_id = p.id
        
        `
        const [result] = await db.execute(sql);
        console.log(result)
        res.status(200).json(
            { data: result }
        )
    } catch (e) {
        console.log(e)
    }
}


const getProductStat = async (req, res) => {

    try {
        const sql = `select p.name , total_sell from 
        beauty_shop.products as p 
        join (select oi.product_id ,count(oi.quantity) as total_sell
        from beauty_shop.order_item as oi join beauty_shop.orders as o
        on oi.order_id = o.id
        group by oi.product_id) as tmp on tmp.product_id = p.id`
        const [result] = await db.execute(sql);
        console.log(result)
        res.status(200).json(
            { data: result }
        )
    } catch (e) {
        console.log(e)
    }
}

const updateOrder = async (req, res) => {
    const role = req.body.role;
    const id = req.body.id
    console.log(req.body)
    try {
        const sql = `UPDATE orders SET status = ? WHERE (id = ?);`;
        const result = await db.execute(sql, [role, id]);
        console.log(result)
        res.status(200).json({
            EM: "Cập nhật thành công",
        })
    } catch (e) {
        console.log(e)
    }
}

const getDetailOrderbyId = async (req, res) => {
    const order_id = req.params.order_id;
    try {
        const sql = `select pr.name, oi.quantity, oi.discount, oi.unit_price from
        order_item  as oi 
        inner join products as pr
        on pr.id = oi.product_id
        where oi.order_id = ?`;
        const [data] = await db.execute(sql, [order_id]);
        res.status(200).json({
            data: data
        })
    } catch (e) {
        console.log(e)
    }

}

module.exports = {
    createOrder, getOrderAdmin, getRevenueStat, getProductStat, getProductRenevue, updateOrder, getDetailOrderbyId
}