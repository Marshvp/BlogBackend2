const { PrismaClient } = require('@prisma/client');
const passport = require('passport');
const { Router } = require("express");
const commentController = require("../controllers/commentController")
const commentRouter = Router();


commentRouter.post('/create/:blogId', passport.authenticate('jwt', { session: false }), commentController.postCreateComment)

commentRouter.get('/:blogId', commentController.getBlogComments)


module.exports = commentRouter;


