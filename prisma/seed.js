
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
	console.log('🌱 Seeding database...');

	// Hash passwords
	const password1 = await bcrypt.hash('adminpass', 10);
	const password2 = await bcrypt.hash('userpass', 10);

	// Create users
	const admin = await prisma.users.create({
		data: {
			userName: 'adminuser',
			email: 'admin@example.com',
			password: password1,
			isAdmin: true,
		},
	});

	const user = await prisma.users.create({
		data: {
			userName: 'regularuser',
			email: 'user@example.com',
			password: password2,
			isAdmin: false,
		},
	});

	// Create blogs
	const blog1 = await prisma.blogs.create({
		data: {
			title: 'Welcome to the Blog',
			description: 'An introduction to our blog system.',
			filePath: '/blogs/welcome.md',
			authorId: admin.id,
		},
	});

	const blog2 = await prisma.blogs.create({
		data: {
			title: 'User’s First Post',
			description: 'A post written by a regular user.',
			filePath: '/blogs/user-post.md',
			authorId: user.id,
		},
	});

	// Create comments
	await prisma.comments.createMany({
		data: [
			{
				blogId: blog1.id,
				userId: user.id,
				message: 'Great first post!',
			},
			{
				blogId: blog2.id,
				userId: admin.id,
				message: 'Nice work, welcome aboard!',
			},
		],
	});

	console.log('✅ Seeding complete!');
}

main()
	.catch((e) => {
		console.error('❌ Seeding error:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
