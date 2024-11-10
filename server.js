require("dotenv").config();
const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const app = express();

const routesPath = path.join(__dirname, "routes");

app.use(express.json());

// set cors with whitelist array
let whitelistedDomains = process.env.WHITELISTED_DOMAINS.split(", ");
let allowedOrigins =
	process.env.NODE_ENV === "production"
		? whitelistedDomains
		: ["http://localhost:3000", "http://127.0.0.1:3000"];

app.use(
	cors({
		origin: allowedOrigins,
		optionsSuccessStatus: 200,
	})
);

app.use((req, res, next) => {
	const origin = req.headers.origin;

	if (allowedOrigins.includes(origin))
		res.setHeader("Access-Control-Allow-Origin", origin);

	res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.set(
		"Access-Control-Allow-Headers",
		"Content-Type, X-Access-Token, Origin"
	);

	next();
});

// register routes
try {
	fs.readdirSync(routesPath).forEach(file => {
		const route = require(path.join(routesPath, file));
		app.use(route.path, route.router);
	});

	app.all("*", (_, res) =>
		res.status(404).json({
			message: "Not found",
		})
	);
} catch (err) {
	console.log(err);
}

const port = process.env.PORT || 8393;

// connect to mongoDB


console.log(process.env.DB_URI)

mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log("Connected to MongoDB");
		// start server
		app.listen(port, () => console.log(`Server started on port ${port}`));
	});
