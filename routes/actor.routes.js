const express = require('express');

//Controllers
const {
  getAllActors,
  getActorById,
  createNewActor,
  updateActor,
  deleteActor
} = require('../controllers/actor.controller');

const router = express.Router();

router.get('/', getAllActors);

router.get('/:id', getActorById);

router.post('/', createNewActor);

router.patch('/:id', updateActor);

router.patch('/:id', deleteActor);

module.exports = { acotrsRouter: router };
