const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const { blogSchema } = require('../schemas/blogSchemas')


exports.getAllBlogs = async (req, res) => {
	try {
		const blogs = await prisma.blogs.findMany({
			orderBy: { createdAt: 'desc' },
		})

		res.json(blogs)
	}
	catch (error) {
		console.error(error)
		res.status(500).json({ message: "Failed to fetch blog" });
	}
};

exports.createBlogs = async (req, res) => {
	const result = blogSchema.safeParse(req.body);

	if (!result.success) {
		return res.status(400).json({ errors: result.error.errors })
	}

	const { title, description } = result.data;


	const blog = await prisma.blogs.create({
		data: { title, description },
	});


	res.status(400).json({ message: "Blog created sucessfully", blog: blog });



}

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
