//Models
const { Movie } = require('../models/movie.model');
const { Actor } = require('../models/actor.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');

//Get all actors
exports.getAllMovies = catchAsync(async (req, res, next) => {});
//Get movie by id
exports.getMovieById = catchAsync(async (req, res, next) => {});
//Create new movie(POST)
exports.createNewMovie = catchAsync(async (req, res, next) => {});
//Update movie
exports.updateMovie = catchAsync(async (req, res, next) => {});
//Delete movie
exports.deleteMovie = catchAsync(async (req, res, next) => {});
