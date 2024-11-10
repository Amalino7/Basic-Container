const { Schema, model, models } = require("mongoose");

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: [true, 'The email "{VALUE}" is already taken.'],
			match: [
				/^[A-Za-z0-9_\.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/,
				'"{VALUE}" is not a valid email address.',
			],
		},
		nickname: {
			type: String,
			required: [true, "Nickname is required."],
		},
		password: {
			type: String,
			required: [true, "Password is required."],
		},
		imageUrl: {
			type: String,
			default: "https://i.ibb.co/5Y9x2mL/image.png",
			match: [
				/^https?:\/\/.+/,
				'"{VALUE}" is not a valid image URL valid.',
			],
		},
		token: {
			type: String,
		},
		_friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true, versionKey: false }
);

const userModel = models["User"] || model("User", userSchema);

module.exports = userModel;
