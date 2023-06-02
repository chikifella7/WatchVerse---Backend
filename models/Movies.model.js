const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  title: {
    type: String,
  },
  year: {
    type: String,
  },
  image: {
    type: String,
  },
  crew: {
    type: String,
  },
  imDbRating: {
    type: String,
  },
});

const Movies = model("Movies", movieSchema);

module.exports = Movies;
