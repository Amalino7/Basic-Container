const router = require("express").Router();
const { getUsers, updateUser, deleteUser } = require("../helpers/users");
const verifyToken = require("../middleware/auth");

// get all users
router.get("/", async (_, res) => {
	try {
		const { err, count, users } = await getUsers({});

		if (err) throw err;

		users.forEach(user => {
			delete user.token;
			delete user.password;
			delete user.email;
		});

		res.status(200).json({ users, count });
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// get user by id
router.get("/:id", async (req, res) => {
	try {
		const { err, users } = await getUsers({
			_id: req.params.id,
		});

		if (err) throw err;

		users.forEach(user => {
			delete user.token;
			delete user.password;
			delete user.email;
		});

		if (!users) {
			throw new Error("There is no such user with provided id.", 404);
		}

		res.status(200).json({ user: users[0] });
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// update user
router.put("/:id", verifyToken, async (req, res) => {
	try {
		const user = await updateUser(req.params.id, req.body);

		if (user.err) throw user.err;

		delete user.password;

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// delete user
router.delete("/:id", verifyToken, async (req, res) => {
	try {
		const user = await deleteUser(req.params.id, req.body);

		if (user.err) throw user.err;

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

module.exports = {
	path: "/users",
	router,
};
