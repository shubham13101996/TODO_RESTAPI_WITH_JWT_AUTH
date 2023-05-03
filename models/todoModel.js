const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add the title name"],
    },
    description: {
      type: String,
      required: [true, "Please add the description for tast"],
    },
    status: {
      type: String,
      required: [true, "Please add the status of task"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
