const { Router } = require("express");
const upload = require("../middleware/upload");


const uploadRouter = Router();
console.log("upload router loaded")

uploadRouter.post('/upload', upload.single('blogFile'),
	async (req, res) => {
		try {
			const { title, description } = req.body;
			const filePath = req.file.path;


			// add prisma insert.
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
