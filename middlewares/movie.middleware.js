//Models
const { Movie } = require('../models/movie.model');

//Utils
const { AppError } = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');

exports.movieExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({
    where: { id, status: 'active' }
  });

  if (!movie) {
    return next(new AppError(404, 'Movie not found with the given ID'));
  }

  req.movie = movie;
  next();
});
