const express = require('express');

//Controllers
const {
    getAllMovies,
    getMovieById,
    createNewMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/movie.controller');

const router = express.Router();

router.get('/', getAllMovies);

router.get('/:id', getMovieById);

router.post('/', createNewMovie);

router.patch('/:id', updateMovie);

router.delete('/:id', deleteMovie);

module.exports