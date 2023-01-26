const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid Email!`,
      },
    },
    password: {
      type: String,
      minLength: [6, "Must be at least 6, got {VALUE}"],
      required: true,
    },
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
