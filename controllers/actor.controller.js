const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { validationResult } = require('express-validator');

//Models
const { Actor } = require('../models/actor.model');
const { ActorInMovies } = require('../models/actorInMovies.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/AppError');
const { filterObj } = require('../utils/filterObj');
const { storage } = require('../utils/firebase');
const { Movie } = require('../models/movie.model');

//Get all actors
exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({
    where: { status: 'active' },
    include: [{ model: Movie, through: ActorInMovies }]
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
  const { actor } = req;

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

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsg = errors
      .array()
      .map(({ msg }) => msg)
      .join('. ');

    return next(new AppError(400, errorMsg));
  }

  const fileExtension = req.file.originalname.split('.')[1];

  const imgRef = ref(
    storage,
    `imgs/actors/${name}-${Date.now()}.${fileExtension}`
  );

  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  const newActor = await Actor.create({
    name,
    country,
    rating,
    age,
    profilePic: imgUploaded.metadata.fullPath
  });

  res.status(201).json({
    status: 'success',
    data: { newActor }
  });
});
//Update actor
exports.updateActor = catchAsync(async (req, res, next) => {
  const { actor } = req;

  const data = filterObj(req.body, 'name', 'country', 'rating', 'age');

  await actor.update({ ...data });

  res.status(204).json({ status: 'success' });
});
//Delete actor
exports.deleteActor = catchAsync(async (req, res, next) => {
  const { actor } = req;

  await actor.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
