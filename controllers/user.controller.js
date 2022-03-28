const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Models
const { User } = require('../models/user.model');
const { Review } = require('../models/review.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/AppError');
const { filterObj } = require('../utils/filterObj');

dotenv.config({ path: './config.env' });

//Login (POST)
exports.authUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email, status: 'active' }
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(400, 'Invalid credentials'));
  }

  //JWT
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(200).json({
    status: 'success',
    data: { token }
  });
});
//Get all actors
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: 'active' },
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Review
        //include: [{ model: User, attributes: { exclude: ['password'] } }]
      }
    ]
  });

  res.status(200).json({
    status: 'success',
    data: { users }
  });
});
//Get movie by id
exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Review
        //include: [{ model: User, attributes: { exclude: ['password'] } }]
      }
    ]
  });

  if (!user) {
    return next(new AppError(404, 'User not found'));
  }

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});
//Create new movie(POST)
exports.createNewUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return next(
      new AppError(400, 'Must provide a valid name, email and password')
    );
  }

  //Encode password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role
  });

  //Remove password from response
  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    data: { newUser }
  });
});
//Update movie
exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const data = filterObj(req.body, 'name', 'email');

  const user = await User.findOne({
    where: { id: id, status: 'active' },
    attributes: { exclude: ['password'] }
  });

  if (!user) {
    return next(new AppError(404, 'Cant update user, invalid ID'));
  }

  await user.update({ ...data });

  res.status(204).json({ status: 'success' });
});
//Delete movie
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { id: id, status: 'active' }
  });

  if (!user) {
    return next(new AppError(404, 'Cant delete user, invalid ID'));
  }

  await user.update({ status: 'deleted' });

  res.status(204).json({ stauts: 'success' });
});
