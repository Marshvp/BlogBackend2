const { Router } = require("express");
const upload = require("../middleware/upload");
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
const prisma = new PrismaClient();


const uploadRouter = Router();
console.log("upload router loaded")

uploadRouter.post('/', passport.authenticate('jwt', { session: false }), upload.single('blogFile'),
	async (req, res) => {
		if (!req.user.isAdmin) {
			res.status(403).json({ message: "Admin only" });
		}
		try {
			const { title, description } = req.body;
			const filePath = req.file.path;


			// add prisma insert.
			const dbUpload = await prisma.blogs.create({
				data: {
					title,
					description,
					filePath,
					authorId: req.user.id,
				}
			})

			//
			console.log('File uploaded', filePath)
			res.status(201).json({ message: 'File uploaded', filePath })
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'upload failed' })
		}
	}
)


module.exports = uploadRouter;
