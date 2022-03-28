const express = require('express');

//Controllers
const {
  getAllActors,
  getActorById,
  createNewActor,
  updateActor,
  deleteActor
} = require('../controllers/actor.controller');

//Middlewares
const { validateSession } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', validateSession, getAllActors);

router.get('/:id', getActorById);

router.post('/', createNewActor);

router.patch('/:id', updateActor);

router.patch('/:id', deleteActor);

module.exports = { actorsRouter: router };
