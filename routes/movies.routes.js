const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_URL = 'https://imdb-api.com/en/API/MostPopularMovies/k_67u23d3j/';

let moviesData = null; // Variable to store the fetched movies data

// Fetch movies data on server startup
axios.get(API_URL)
  .then(response => {
    moviesData = response.data;
    console.log('Movies data fetched successfully');
  })
  .catch(error => {
    console.error('Error fetching movies data:', error);
  });

// Route handler to get all movies
router.get('/movies', (req, res) => {
  if (moviesData) {
    res.json(moviesData);
  } else {
    res.status(500).json({ error: 'Movies data not available' });
  }
});

// Route handler to get a specific movie by ID
router.get('movies/:id', (req, res) => {
  const movieId = req.params.id;
  if (moviesData) {
    const movie = moviesData.find(movie => movie.id === movieId);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } else {
    res.status(500).json({ error: 'Movies data not available' });
  }
});

module.exports = router;