const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
    user_id: { type: Number, required: true },
  },
  {
    toJSON: { virtuals: true },
    versionKey: false,
    timestamps: true
  }
);

schema.virtual('user', {
  ref: 'User',
  localField: 'user_id', 
  foreignField: 'telegram_id', 
  justOne: true
});

module.exports = mongoose.model("Feedback", schema);