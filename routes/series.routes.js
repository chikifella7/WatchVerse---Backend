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
        // Find the Movie by ID and Delete it
        let deletedSeries = await Series.findByIdAndDelete(id);

        // Remove the Series reference from the corresponding List
        await Series.findByIdAndUpdate(deletedSeries, { $pull: { series: id } });

        res.json(deletedSeries);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;