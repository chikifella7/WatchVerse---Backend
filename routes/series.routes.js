const express = require("express");
const router = express.Router();
const Series = require("../models/Series.model");
const Review = require("../models/Reviews.model");
const seriesData = require("../Bin/series.json"); // Import series data from JSON file

// Route handler to get all series
router.get("/series", (req, res) => {
  if (seriesData) {
    res.json(seriesData);
  } else {
    res.status(500).json({ error: "serie data not available" });
  }
});

// Route handler to get a specific Series by ID
router.get("/series/:id", (req, res) => {
  const serieId = req.params.id;
  if (seriesData) {
    const serie = seriesData.find((serie) => serie.id === serieId);
    if (serie) {
      res.json(serie);
    } else {
      res.status(404).json({ error: "serie not found" });
    }
  } else {
    res.status(500).json({ error: "serie data not available" });
  }
});

// Route handler to add more series to the database
router.post("/series", async (req, res) => {
  const { title, year, crew } = req.body;

  try {
    // Create a new series
    let newSerie = await Series.create({
      title,
      year,
      crew,
    });

    res.json(newSerie);
  } catch (error) {
    res.json(error);
  }
});

// PUT '/api/series/:id' route to Update a Series
router.put("/series/:id", async (req, res) => {
  const { id } = req.params;
  const { title, year, crew } = req.body;

  try {
    // Find the Series by ID and Update its fields
    let updatedSeries = await Series.findByIdAndUpdate(
      id,
      { title, year, crew },
      { new: true }
    );

    res.json(updatedSeries);
  } catch (error) {
    res.json(error);
  }
});

// DELETE '/api/series/:id' route to Delete a Task
router.delete('/series/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the series by ID and Delete it
        let deletedSeries = await Series.findByIdAndDelete(id);

        // Remove the Series reference from the corresponding List
        await Series.findByIdAndUpdate(deletedSeries, { $pull: { series: id } });

        res.json(deletedSeries);
    } catch (error) {
        res.json(error);
    }
});

// POST '/api/series/:id/reviews' route to post a new review
router.post("/series/:id/reviews", async (req, res) => {
  const { id } = req.params;
  const { content, rating, user } = req.body;

  try {
    const series = await Series.findById(id);

    if (!series) {
      return res.status(404).json({ error: "series Not Found" });
    }

    const newReview = await Review.create({
      content,
      rating,
      user /* : req.payload._id */,
    });
    
    series.reviews.push(newReview);
    await series.save();

    res.json(newReview);
  } catch (error) {
    res.json(error);
  }
});

// GET '/api/series/:id/reviews' route to get a specific review
router.get("/series/:id/reviews", async (req, res) => {
  const { id } = req.params;

  try {
    const series = await Series.findById(id).populate("reviews");

    if (!series) {
      return res.status(404).json({ error: "series Not Found" });
    }

    res.json(series.reviews);
  } catch (error) {
    res.json(error);
  }
});

// PUT '/api/series/:seriesId/reviews/:reviewId' route to update a Review
router.put("/series/:seriesId/reviews/:reviewId", async (req, res) => {
  const { seriesId, reviewId } = req.params;
  const { content, rating, user } = req.body;

  try {
    const series = await Series.findById(seriesId);

    if (!series) {
      return res.status(404).json({ error: "series not found" });
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

// DELETE '/api/series/:seriesId/reviews/:reviewId' route to delete a Review
router.delete("/series/:seriesId/reviews/:reviewId", async (req, res) => {
  const { seriesId, reviewId } = req.params;

  try {
    const series = await Series.findById(seriesId);

    if (!series) {
      return res.status(404).json({ error: "series not found" });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    await Review.findByIdAndDelete(reviewId);
    series.reviews.pull(reviewId);
    await series.save();

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;