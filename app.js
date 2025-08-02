const express = require("express")
require('dotenv').config()
const bodyparser = require("body-parser")
const cors = require("cors")
const indexRouter = require("./routes/index.js")
const blogRouter = require("./routes/blogRoutes.js")
const logger = require("./middleware/logger.js")
const { default: errorHandler } = require("./middleware/errorHandler.js")
const passport = require("./middleware/passport.js")
const authRouter = require("./routes/authRoutes.js")
const uploadRouter = require("./routes/uploadRouter.js")
console.log("Hello");

const app = express()

const PORT = process.env.PORT

app.use(errorHandler)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(logger)
app.use(passport.initialize())

app.use("/api", indexRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/auth", authRouter);
app.use("/api/upload", uploadRouter)




app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`)
})
