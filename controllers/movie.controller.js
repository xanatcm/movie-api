//Models
const { Movies } = require('../models/movie.model');
const { Actors } = require('../models/actor.model');

//Utils
const {catchAsync} = require('../utils/catchAsync');

//Get all actors
exports.getAllMovies = catchAsync(async (req, res, next) => {})
//Get actor by id
exports.getMovieById = catchAsync(async (req, res, next) => {})
//Create new actor(POST)
exports.createNewMovie = catchAsync(async (req, res, next) => {})
//Update actor
exports.updateMovie = catchAsync(async (req, res, next) => {})
//Delete actor
exports.deleteMovie = catchAsync(async (req, res, next) => {})
