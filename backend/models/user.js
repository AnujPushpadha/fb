const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Plese give Title"],
    unique: [true, "Title allReady Present add new Title"],
  },
  password: {
    type: String,
    required: [true, "Plese give Author name"],
  },
});

module.exports = mongoose.model("user", userSchema);
