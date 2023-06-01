const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
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

const Movies = model("Movie", movieSchema);

module.exports = Movies;
