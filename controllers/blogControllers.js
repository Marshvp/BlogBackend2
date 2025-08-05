const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const { blogSchema } = require('../schemas/blogSchemas')


exports.getAllBlogs = async (req, res) => {
	console.log("Get all hit")
	try {
		const blogs = await prisma.blogs.findMany({
			select: {
				id: true,
				title: true,
				description: true,
				filePath: true,
				author: {
					select: {
						userName: true,
					}
				},
			},
			orderBy: { createdAt: "desc" },
		})

		res.json(blogs)
	}
	catch (error) {
		console.error(error)
		res.status(500).json({ message: "Failed to fetch blog" });
	}
};


exports.getBlogById = async (req, res) => {
	const id = req.params;


	try {
		const blogs = await primsa.blogs.findUnique({
			where: { id: Number(id) },
		});

		res.status(400).json({ message: `Found Blog with Id: ${id}. ${blogs.content}` })

	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "no blog on that id" })
	}
}


exports.deleteBlog = async (req, res) => {
	const id = req.params;

	try {
		const blogs = await prisma.blogs.delete({
			where: { id: Number(id) },
		})
		res.status(400).json({ message: "Blog Deleted" })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Unable to delete Blog" });
	}
};
