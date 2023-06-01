const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_URL = 'https://imdb-api.com/en/API/MostPopularTVs/k_67u23d3j/';

let seriesData = null; // Variable to store the fetched movies data

// Fetch movies data on server startup
axios.get(API_URL)
  .then(response => {
    seriesData = response.data;
    console.log('Series data fetched successfully');
  })
  .catch(error => {
    console.error('Error fetching Series data:', error);
  });

// Route handler to get all Series
router.get('/Series', (req, res) => {
  if (seriesData) {
    res.json(seriesData);
  } else {
    res.status(500).json({ error: 'Series data not available' });
  }
});

// Route handler to get a specific movie by ID
router.get('Series/:id', (req, res) => {
  const seriesId = req.params.id;
  if (seriesData) {
    const serie = seriesData.find(series => series.id === seriesId);
    if (serie) {
      res.json(serie);
    } else {
      res.status(404).json({ error: 'serie not found' });
    }
  } else {
    res.status(500).json({ error: 'Serie data not available' });
  }
});

module.exports = router;