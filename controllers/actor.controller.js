//Models
const { Actors } = require('../models/actor.model');
const { Movies } = require('../models/movie.model');

//Utils
const {catchAsync} = require('../utils/catchAsync');


//Get all actors
exports.getAllActors = catchAsync(async (req, res, next) => {})
//Get actor by id
exports.getActorById = catchAsync(async (req, res, next) => {})
//Create new actor(POST)
exports.createNewActor = catchAsync(async (req, res, next) => {})
//Update actor
exports.updateActor = catchAsync(async (req, res, next) => {})
//Delete actor
exports.deleteActor = catchAsync(async (req, res, next) => {})
