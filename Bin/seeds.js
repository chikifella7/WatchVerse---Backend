const mongoose = require('mongoose');

const Movies = require('../models/Movies.model');
const Series = require('../models/Series.model');

const moviesData = require( './movies.json')
const seriesData = require( './series.json')

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/watchVerse_BackEnd';

async function seeds() {
  try {
    const x = await mongoose.connect(MONGO_URI);
    console.log(`Connected to: ${x.connections[0].name}`);

    const createdMovies = await Movies.create(moviesData);

    console.log(`Successfuly created ${createdMovies.length} movies`);

    const createdSeries = await Series.create(seriesData);

    console.log(`Successfuly created ${createdSeries.length} series`);

    x.disconnect();
  } catch (error) {
    console.log(error);
  }
}

seeds();