const { Schema, model, models } = require("mongoose");

const chatSchema = new Schema(
	{
		_owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Chat must have an owner."],
		},
		handle: {
			type: String,
			required: [true, "Chat must have a handle."],
			trim: true,
			unique: [true, 'The chat handle "{VALUE}" is already taken.'],
		},
		name: {
			type: String,
			required: [true, "Name is required."],
			minLength: [
				4,
				"The name of the chat must be at least 4 characters long.",
			],
		},
		imageUrl: {
			type: String,
			default:
				"https://icon2.cleanpng.com/20180713/eyq/kisspng-aquatica-seaworld-orlando-group-icon-5b4844159866f6.8575003615314626776243.jpg",
			match: [
				/^https?:\/\/.+/,
				'"{VALUE}" is not a valid image URL valid.',
			],
		},
		_messages: [
			{
				type: Schema.Types.ObjectId,
				ref: "Message",
			},
		],
		_participants: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true, versionKey: false }
);

const chatModel = models["Chat"] || model("Chat", chatSchema);

module.exports = chatModel;
