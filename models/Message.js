const { Schema, model, models } = require("mongoose");

const messageSchema = new Schema(
	{
		_owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		_chat: {
			type: Schema.Types.ObjectId,
			ref: "Chat",
			required: true,
		},
		content: {
			type: String,
			required: true,
			minLength: [
				1,
				"The content of the message must be at least 1 character long.",
			],
		},
	},
	{ timestamps: true, versionKey: false }
);

const messageModel = models["Message"] || model("Message", messageSchema);

module.exports = messageModel;
