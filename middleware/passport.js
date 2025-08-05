const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('passport');


const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_Secret,
};

passport.use(
	new JWTStrategy(opts, async (jwt_payload, done) => {
		try {
			const user = await prisma.users.findUnique({
				where: { id: jwt_payload.id }
			});

			if (user) return done(null, user);
			else return done(null, false)
		} catch (error) {
			console.error(error)
			return done(err, false)
		}
	})
)

module.exports = passport;
