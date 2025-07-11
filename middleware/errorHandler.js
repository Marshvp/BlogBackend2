function errorHandler(err, req, res, next) {
	console.error(err);
	res.status(500).json({ message: "Not good, something Wrong" })
};

export default errorHandler;
