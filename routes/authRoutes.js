const { Router } = require("express");
// const authController
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt")

const JWT_Secret = process.env.JWT_Secret;
const authRouter = Router();

authRouter.post('/signup', async (req, res) => {
	const { username, email, password } = req.body;


	const existing = await prisma.users.findUnique({
		where: { email }
	})
	if (existing) return res.status(400).json({ message: "Email already in use" })

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.users.create({
		data: {
			username,
			email,
			password: hashedPassword
		},
	});
	res.status(201).json({ message: "Account created" })
})


authRouter.post('/login', async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await prisma.users.findUnique({
			where: { email }
		})
		if (!user) res.status(401).json({ message: "Invalid Email or Password" })

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) return res.status(401).json({ message: "Invalid Email or Password" })

		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
				isAdmin: user.isAdmin,
			}, JWT_Secret,
			{
				expiresIn: '1d'
			}
		)
		res.json({ token })
	} catch (error) {
		console.error(error)
	}
})


module.exports = authRouter;
