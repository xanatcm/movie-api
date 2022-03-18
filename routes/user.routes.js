const express = require('express');

//Controllers
const {
  getAllUsers,
  getUserById,
  createNewUser,
  authUser,
  updateUser,
  deleteUser
} = require('../controllers/user.controller');

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', createNewUser);

router.post('/', authUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = { userRouter: router };
