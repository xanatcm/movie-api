const express = require('express');
const { body } = require('express-validator');

//Controllers
const {
  getAllMovies,
  getMovieById,
  createNewMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movie.controller');

//Middlewares
const {
  validateSession,
  protectAdmin
} = require('../middlewares/auth.middleware');
const { movieExist } = require('../middlewares/movie.middleware');
const {
  createMovieValidators,
  validateResult
} = require('../middlewares/validators.middleware');

//Utils
const { upload } = require('../utils/multer');

const router = express.Router();

router.use(validateSession);

router
  .route('/')
  .get(getAllMovies)
  .post(
    protectAdmin,
    upload.single('img'),
    createMovieValidators,
    validateResult,
    createNewMovie
  );

router
  .use('/:id', movieExist)
  .route('/:id')
  .get(getMovieById)
  .patch(protectAdmin, updateMovie)
  .delete(protectAdmin, deleteMovie);

module.exports = { moviesRouter: router };
