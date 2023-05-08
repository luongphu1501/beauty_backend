const express = require("express")
const session = require("express-session")

const createSessionConfig = require("./config/session")
require("dotenv").config()

const UserRouter = require("./routes/Auth.router")

const app = express()

const PORT = process.env.PORT || 8080;
// Use middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const sessionConfig = createSessionConfig();

app.use(session(sessionConfig));

app.use("/auth/api", UserRouter)

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
})