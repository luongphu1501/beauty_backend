const express = require("express")
const session = require("express-session")
const bodyParser = require('body-parser');

const createSessionConfig = require("./config/session")
require("dotenv").config()

const UserRouter = require("./routes/Auth.router")
const CategoryRouter = require("./routes/Category.route")
const ProductRouter = require("./routes/Product.route")
const OrderRouter = require("./routes/Order.route")

const apiMiddleware = require("./middleware/api.middleware")

const app = express()

const PORT = process.env.PORT || 8080;
// Use middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
const sessionConfig = createSessionConfig();

app.use(session(sessionConfig));
app.use(apiMiddleware)

app.use("/api/auth", UserRouter)
app.use("/api/category", CategoryRouter)
app.use("/api/product", ProductRouter)
app.use("/api/order", OrderRouter)

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
})