const express = require("express");
const router = express.Router();
const Movies = require("../models/Movies.model");

const moviesData = require("../Bin/movies.json"); // Import movies data from JSON file

// Route handler to get all movies
router.get("/movies", (req, res) => {
  if (moviesData) {
    res.json(moviesData);
  } else {
    res.status(500).json({ error: "Movie data not available" });
  }
});

// Route handler to get a specific movie by ID
router.get("/movies/:id", (req, res) => {
  const movieId = req.params.id;
  if (moviesData) {
    const movie = moviesData.find((movie) => movie.id === movieId);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } else {
    res.status(500).json({ error: "Movie data not available" });
  }
});

// Route handler to add more movies to the database
router.post("/movies", async (req, res) => {
  const { title, year, crew } = req.body;

  try {
    // Create a new movie
    let newMovie = await Movies.create({
      title,
      year,
      crew,
    });

    res.json(newMovie);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;

