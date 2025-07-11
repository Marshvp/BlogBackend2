const express = require("express")
console.log("Hello");

const app = express()

const PORT = 1231

app.listen(PORT, "0.0.0.0", () => {
	console.log(`Listening on ${PORT}`)
})
