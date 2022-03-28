//Models
const { Actor } = require('../models/actor.model');

//Utils
const { AppError } = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');

exports.actorExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({
    where: { id, status: 'active' }
  });

  if (!actor) {
    return next(new AppError(404, 'Not actor found with the given ID'));
  }

  req.actor = actor;

  next();
});
