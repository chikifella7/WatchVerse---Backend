const express = require("express");
const router = express.Router();
const Series = require("../models/Series.model");

const seriesData = require("../Bin/series.json"); // Import series data from JSON file

// Route handler to get all series
router.get("/series", (req, res) => {
  if (seriesData) {
    res.json(seriesData);
  } else {
    res.status(500).json({ error: "serie data not available" });
  }
});

// Route handler to get a specific movie by ID
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
    // Create a new serie
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

module.exports = router;