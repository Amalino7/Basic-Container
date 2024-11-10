const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Chat = require("../models/Chat");

async function getUsers(query = {}) {
	try {
		const count = await User.countDocuments(query);

		const users = await User.find(query)
			.populate("_friends", ["nickname", "imageUrl", "_friends"])
			.lean();

		return { count, users };
	} catch (err) {
		return { err };
	}
}

async function updateUser(userId, body) {
	try {
		const userToUpdate = await User.findById(userId);

		const user = body;

		for (let key in user) {
			if (!user[key]) delete user[key];
		}

		if (!userToUpdate) {
			throw new Error("There is no such user with provided id.", 404);
		}

		// Verify ownership of user
		if (
			!(
				(await User.findById(userId).lean())._id.equals(userId) &&
				(await bcrypt.compare(user.password, userToUpdate.password))
			)
		) {
			throw new Error("The password you entered is incorrect.", 401);
		}

		const password = user.newPassword || user.password;

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ ...user, password: await bcrypt.hash(password, 10) },
			{
				new: true,
			}
		);

		return updatedUser;
	} catch (err) {
		return { err };
	}
}

async function deleteUser(userId, user) {
	try {
		const userToDelete = await User.findById(userId);

		if (!userToDelete) {
			throw new Error("There is no such user with provided id.", 404);
		}

		// Verify ownership of user
		if (
			!(
				(await User.findById(userId).lean())._id.equals(userId) &&
				(await bcrypt.compare(user.password, userToDelete.password))
			)
		) {
			throw new Error("The password you entered is incorrect.", 401);
		}

		await User.findByIdAndDelete(userId);

		// Remove user from all chats
		Chat;

		return { message: "User has been deleted." };
	} catch (err) {
		return { err };
	}
}

async function createUser(user) {
	try {
		const newUser = await new User(user).save();

		return newUser;
	} catch (err) {
		return { err };
	}
}

module.exports = {
	getUsers,
	updateUser,
	deleteUser,
	createUser,
};
