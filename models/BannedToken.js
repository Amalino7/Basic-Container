const { Schema, model, models } = require("mongoose");

const bannedTokenSchema = new Schema(
	{
		token: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true, versionKey: false }
);

const bannedTokenModel =
	models["BannedToken"] || model("BannedToken", bannedTokenSchema);

module.exports = bannedTokenModel;
