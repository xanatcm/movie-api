const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { validationResult } = require('express-validator');

//Models
const { Actor } = require('../models/actor.model');
const { Review } = require('../models/review.model');
const { Movie } = require('../models/movie.model');
const { ActorInMovies } = require('../models/actorInMovies.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/AppError');
const { filterObj } = require('../utils/filterObj');
const {} = require('../utils/firebase');

//Get all movies
exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    where: { status: 'active' },
    include: [{ model: Review }, { model: Actor }]
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
  const { movie } = req;

  res.status(200).json({
    status: 'success',
    data: {
      movie
    }
  });
});
//Create new movie
exports.createNewMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, genre, rating, actors } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsg = errors
      .array()
      .map(({ msg }) => {
        msg;
      })
      .join('. ');

    return next(new AppError(400, errorMsg));
  }

  const fileExtension = req.file.originalname.split('.')[1];

  const imgRef = ref(
    storage,
    `imgs/movies/${title}-${Date.now()}.${fileExtension}`
  );

  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  const newMovie = await Movie.create({
    title,
    description,
    duration,
    img: imgUploaded.metadata.fullPath,
    genre,
    rating
  });

  const actorsInMoviesPromises = actors.map(async (actorId) => {
    return await ActorInMovies.create({ actorId, movieId: newMovie.id });
  });

  await Promise.all(actorsInMoviesPromises);

  res.status(201).json({
    status: 'success',
    data: { newMovie }
  });
});
//Update movie (PATCH)
exports.updateMovie = catchAsync(async (req, res, next) => {
  const { movie } = req;

  const data = filterObj(
    req.body,
    'title',
    'description',
    'duration',
    'genre',
    'rating'
  );

  await movie.update({ ...data });

  res.status(204).json({ status: 'success' });
});
//Delete movie
exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { movie } = req;

  await movie.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
