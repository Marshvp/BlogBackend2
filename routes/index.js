const { Router } = require("express")

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
	res.json({
		message: "index get"
	})
})

module.exports = indexRouter

