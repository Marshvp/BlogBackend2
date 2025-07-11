const express = require("express")
require('dotenv').config()
const bodyparser = require("body-parser")
const cors = require("cors")
const indexRouter = require("./routes/index.js")
console.log("Hello");

const app = express()

const PORT = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


app.use("/api", indexRouter);

app.listen(PORT, "0.0.0.0", () => {
	console.log(`Listening on ${PORT}`)
})
