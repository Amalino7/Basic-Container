const jwt = require("jsonwebtoken");

const BannedToken = require("../models/BannedToken");

const verifyToken = (req, res, next) => {
	const token =
		req.headers["x-access-token"] || req.body.token || req.query.token;

	if (!token) {
		return res
			.status(403)
			.json({ err: "A token is required for authentication" });
	}

	BannedToken.findOne({ token }, (err, bannedToken) => {
		if (err) {
			return res.status(500).json({ err: "Internal server error" });
		}

		if (bannedToken) {
			return res
				.status(403)
				.json({ err: "This token is expired. Please login again." });
		}

		try {
			const decoded = jwt.verify(token, process.env.TOKEN_KEY);
			req.user = decoded;
		} catch (err) {
			return res.status(401).json({ err: "Invalid Token" });
		}

		return next();
	});
};

module.exports = verifyToken;
