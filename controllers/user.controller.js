const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Models
const { User } = require('../models/user.model');
const { Review } = require('../models/review.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/AppError');

dotenv.config({ path: './config.env' });

//Get all actors
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: 'active' },
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Review,
        include: [{ model: User, attributes: { exclude: ['password'] } }]
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
        model: Review,
        include: [{ model: User, attributes: { exclude: ['password'] } }]
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
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(AppError(400), 'Must provide a valid name, email and password');
  }

  const salt = await bcrypt.genSalt(12);

  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword
  });

  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    data: { newUser }
  });
});
//Login (POST)
exports.authUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email, status: 'active' }
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(400, 'Invalid credentials'));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(200).json({
    status: 'success',
    data: { token }
  });
});
//Update movie
exports.updateUser = catchAsync(async (req, res, next) => {});
//Delete movie
exports.deleteUser = catchAsync(async (req, res, next) => {});

/*NOTE: Image uploading is not necessary but an extra
  NOTE: Password must be encrypted for users
  NOTE: Update user fields (username, email)
  NOTE: Update movie fields (title, description, duration, genre) */
