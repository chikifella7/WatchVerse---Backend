const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    likedMovies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movies",
      },
    ],
    watchedMovies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movies",
      },
    ],
    likedSeries: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movies",
      },
    ],
    watchedSeries: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movies",
      },
    ],
    profilePhoto:[{
      type: String,
    }]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
