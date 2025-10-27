const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    icon: {
      type: String,
      required: false,
      default: '💬'
    },
    description: {
      type: String,
      required: false,
      default: ''
    }
  },
  {
    toJSON: { virtuals: true },
    versionKey: false,
    timestamps: true // yaratilgan/yangilangan vaqtlar saqlanadi
  }
);

module.exports = mongoose.model("Category", categorySchema);
