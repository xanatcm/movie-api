//Models
const { Actor } = require('../models/actor.model');
const { ActorInMovies } = require('../models/actorInMovies.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/AppError');
const {} = require('../utils/filterObj');

//Get all actors
exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({
    where: { status: 'active' },
    include: [{ model: ActorInMovies }]
  });

  res.status(200).json({
    status: 'success',
    data: {
      actors
    }
  });
});
//Get actor by id
exports.getActorById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({
    where: { id: id, status: 'active' }
  });

  if (!post) {
    return next(new AppError(404, 'No actors found with the given ID'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      actor
    }
  });
});

//Create new actor(POST)
exports.createNewActor = catchAsync(async (req, res, next) => {
  const { name, country, rating, age } = req.body;

  if (!name || !country || !rating || !age) {
    return next(
      new AppError(400, 'Must provide a valid name, country, rating and age')
    );
  }

  const newActor = await Actor.create({
    name,
    country,
    rating,
    age
  });

  res.status(201).json({
    status: 'success',
    data: { newActor }
  });
});
//Update actor
exports.updateActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const data = filterObj(req.body, 'name', 'country', 'age');

  const actor = await Actor.findOne({
    where: { id: id, status: 'active' }
  });

  if (!actor) {
    return next(new AppError(404, 'Cant update actor, invalid ID'));
  }

  await actor.update({ ...data });

  res.status(204).json({ status: 'success' });
});
//Delete actor
exports.deleteActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({
    where: { id: id, status: 'active' }
  });

  if (!actor) {
    return next(new AppError(404, 'Cant delete actor, invalid ID'));
  }

  await actor.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
