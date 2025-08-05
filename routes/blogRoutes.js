const { Router } = require("express")
const blogControllers = require("../controllers/blogControllers")

const blogRouter = Router();

blogRouter.get('/', blogControllers.getAllBlogs)


module.exports = blogRouter;
