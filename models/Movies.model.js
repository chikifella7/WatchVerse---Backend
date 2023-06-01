const { Schema, model } = require("mongoose");

const moviesSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String },
  actorList: [{ type: String }],
  imDbrating: { type: number, required: true },
  plot: { type: String, required: true },
  director: { type: String, required: true },
  runtime: { type: number, required: true },
  year: { type: String, required: true },
  awards: { type: String, required: true },
  genre: [{ type: String, required: true }],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});
module.exports = model("Movies", moviesSchema);
