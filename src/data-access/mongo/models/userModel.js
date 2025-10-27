const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        username: { type: String, required: false },
        telegram_id: { type: Number, required: true, unique: true },
        role: { type: String, required: true },
        language_code: { type: String, required: false },
    },
    {
        toJSON: { virtuals: true },
        versionKey: false,
        timestamps: false
    }
);


module.exports = mongoose.model("User", schema);