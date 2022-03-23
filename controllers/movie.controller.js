//Models
const { Review } = require('../models/review.model');
const { Movie } = require('../models/movie.model');
const { ActorInMovies } = require('../models/actorInMovies.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/AppError');
const { filterObj } = require('../utils/filterObj');

//Get all movies
exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    where: { status: 'active' },
    include: [{ model: Review }, { model: ActorInMovies }]
  });

  res.status(200).json({
    status: 'success',
    data: {
      movies
    }
  });
});
//Get movie by id
exports.getMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({
    where: { id: id, status: 'active' }
  });

  if (!movie) {
    return next(new AppError(404, 'No actors found with the given ID'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      movie
    }
  });
});
//Create new movie
exports.createNewMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, genre } = req.body;

  if (!title || !description || !duration || !genre) {
    return next(
      new AppError(
        400,
        'Must provide a valid title, description, duration and genre'
      )
    );
  }

  const newMovie = await Movie.create({
    title,
    description,
    duration,
    genre
  });

  res.status(201).json({
    status: 'success',
    data: { newMovie }
  });
});
//Update movie (PATCH)
exports.updateMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const data = filterObj(req.body, 'title', 'description', 'duration', 'genre');

  const movie = await Movie.findOne({
    where: { id: id, status: 'active' }
  });

  if (!movie) {
    return next(new AppError(404, 'Cant update movie, invalid ID'));
  }

  await movie.update({ ...data });

  res.status(204).json({ status: 'success' });
});
//Delete movie
exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({
    where: { id: id, status: 'active' }
  });

  if (!movie) {
    return next(new AppError(404), 'Cant delete movie, invalid ID');
  }

  await movie.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
