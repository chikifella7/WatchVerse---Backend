const { Schema, model } = require("mongoose");

const serieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  crew: {
    type: String,
    required: true,
  },
  imDbRating: {
    type: String,
  },
});

const Series = model("Serie", serieSchema);

module.exports = Series;
