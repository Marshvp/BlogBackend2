
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

exports.postCreateComment = async (req, res) => {
	const { commentMessage } = req.body
	try {

		if (!commentMessage) {
			return res.status(500).json({ message: "Please fill in a message" })
		}

	} catch (err) {
		console.error(error);
		res.status(500).json({ message: "Unable to create Comment" });
	}
}


exports.getBlogComments = async (req, res) => {
	const { blogId } = req.params
	console.log("comments blogId", blogId)
	try {
		const fetchedComments = await prisma.comments.findMany({
			where: { blogId: Number(blogId) }
		})

		console.log(fetchedComments)
		res.json(fetchedComments)
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Unable to create Comment" });
	}
}


