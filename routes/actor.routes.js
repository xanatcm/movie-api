const express = require('express');
const { body } = require('express-validator');

//Controllers
const {
  getAllActors,
  getActorById,
  createNewActor,
  updateActor,
  deleteActor
} = require('../controllers/actor.controller');

//Middlewares
const {
  validateSession,
  protectAdmin
} = require('../middlewares/auth.middleware');
const { actorExist } = require('../middlewares/actor.middleware');

//Utils
const { upload } = require('../utils/multer');

const router = express.Router();

router.use(validateSession);

router
  .route('/')
  .get(getAllActors)
  .post(
    protectAdmin,
    upload.single('img'),
    [
      body('name').isString().notEmpty(),
      body('country')
        .isString()
        .withMessage('Country must be a string')
        .notEmpty()
        .withMessage('Must provide a valid country name'),
      body('rating')
        .isNumeric()
        .withMessage('Rating must be a number')
        .custom((value) => value > 0 && value <= 5)
        .withMessage('Rating must be between 1 and 5'),
      body('age')
        .isNumeric()
        .withMessage('Age must be a number')
        .custom((value) => value > 0)
        .withMessage('Age must be grater than 0')
    ],
    createNewActor
  );

router
  .use('/:id', actorExist)
  .route('/:id')
  .get(getActorById)
  .patch(protectAdmin, updateActor)
  .delete(protectAdmin, deleteActor);

module.exports = { actorsRouter: router };
