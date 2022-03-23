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

//Middlewares
const { validateSession } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', validateSession, getAllUsers);

router.get('/:id', validateSession, getUserById);

router.post('/', createNewUser);

router.post('/', authUser);

router.patch('/:id', validateSession, updateUser);

router.delete('/:id', validateSession, deleteUser);

module.exports = { userRouter: router };
