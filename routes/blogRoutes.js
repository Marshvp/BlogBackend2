const { Router } = require("express")
const blogController = require("../controllers/blogControllers")

const blogRouter = Router();

blogRouter.get('/', blogController.getAllBlogs)

blogRouter.post('/', blogController.createBlogs)

module.exports = blogRouter;
