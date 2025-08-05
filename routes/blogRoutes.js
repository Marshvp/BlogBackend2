const { Router } = require("express")
const blogControllers = require("../controllers/blogControllers")

const blogRouter = Router();

blogRouter.get('/', blogControllers.getAllBlogs)

blogRouter.get('/:id', blogControllers.getBlogById)


module.exports = blogRouter;
