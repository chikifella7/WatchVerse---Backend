const express = require("express");
const router = express.Router();
const Movie = require("../models/Movies.model");
const Review = require("../models/Reviews.model");
const moviesData = require("../Bin/movies.json"); // Import movies data from JSON file

const fileUploader = require("../config/cloudinary.config");

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("image"), async (req, res, next) => {
  // console.log("file is: ", req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});

// Route handler to get all movies
router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.log(error);
  }
});

// Route handler to get a specific movie by ID
router.get("/movies/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId).populate("reviews");
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

// Route handler to add more movies to the database
router.post("/movies", async (req, res) => {
  const { title, year, crew, image } = req.body;

  try {
    // Create a new movie
    let newMovie = await Movie.create({
      title,
      year,
      crew,
      image,
    });

    res.json(newMovie);
  } catch (error) {
    res.json(error);
  }
});

// PUT '/api/movies/:id' route to Update a Movie
router.put("/movies/:id", async (req, res) => {
  const { id } = req.params;
  const { title, year, crew } = req.body;

  try {
    // Find the Movie by ID and Update its fields
    let updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, year, crew },
      { new: true }
    );

    res.json(updatedMovie);
  } catch (error) {
    res.json(error);
  }
});

// DELETE '/api/movies/:id' route to Delete a Movie
router.delete("/movies/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the Movie by ID and Delete it
    let deletedMovie = await Movie.findByIdAndDelete(id);

    // Remove the Movie reference from the corresponding List
    await Movie.findByIdAndUpdate(deletedMovie, { $pull: { movies: id } });

    res.json(deletedMovie);
  } catch (error) {
    res.json(error);
  }
});

// POST '/api/movies/:id/reviews' route to Create a Review
router.post("/movies/:id/reviews", async (req, res) => {
  const { id } = req.params;
  const { content, rating, user } = req.body;

  try {
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ error: "Movie Not Found" });
    }

    const newReview = await Review.create({ content, rating, user });

    await newReview.save();

    movie.reviews.push(newReview);
    await movie.save();

    res.json(newReview);
  } catch (error) {
    res.json(error);
  }
});

// GET '/api/movies/:id/reviews' route to view Reviews
router.get("/movies/:id/reviews", async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id).populate("reviews");

    if (!movie) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }

    res.json(movie.reviews);
  } catch (error) {
    res.json(error);
  }
});

// PUT '/api/movies/:movieId/reviews/:reviewId' route to update a Review
router.put("/movies/:movieId/reviews/:reviewId", async (req, res) => {
  const { movieId, reviewId } = req.params;
  const { content, rating, user } = req.body;

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    review.content = content;
    review.rating = rating;
    review.user = user;

    const updatedReview = await review.save();

    res.json(updatedReview);
  } catch (error) {
    res.json(error);
  }
});

// DELETE '/api/movies/:movieId/reviews/:reviewId' route to delete a Review
router.delete("/movies/:movieId/reviews/:reviewId", async (req, res) => {
  const { movieId, reviewId } = req.params;

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    await Review.findByIdAndDelete(reviewId);
    movie.reviews.pull(reviewId);
    await movie.save();

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.json(error);
  }
});

router.get("/movies", async (req, res) => {
  const { year } = req.query;

  try {
    let movies;
    if (year) {
      movies = await Movie.find({ year: year });
    } else {
      movies = await Movie.find();
    }
    res.json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/movies", (req, res) => {
  const searchTerm = req.query.search;

  Movie.find({ title: { $regex: searchTerm, $options: "i" } })
    .then((movies) => {
      res.json(movies);
    })
    .catch((error) => {
      console.log("Error searching movies:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
