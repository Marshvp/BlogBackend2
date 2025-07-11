const { z } = require('zod');

const blogSchema = z.object({
	title: z.string().min(1, "Title Required"),
	content: z.string().min(10, "Content must be atleast 10 characers long")
})

module.exports = { blogSchema }; 
