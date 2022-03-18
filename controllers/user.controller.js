//Models
const { Movie } = require('../models/movie.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');

//Get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {});
//Get actor by id
exports.getUserById = catchAsync(async (req, res, next) => {});
//Create new user / Sign in(POST)
exports.createNewUser = catchAsync(async (req, res, next) => {});
//Login (POST)
exports.authUser = catchAsync(async (req, res, next) => {});
//Update user (PATCH)
exports.updateUser = catchAsync(async (req, res, next) => {});
//Delete user
exports.deleteUser = catchAsync(async (req, res, next) => {});
