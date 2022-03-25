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
const {
  validateSession,
  protectAdmin
} = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', createNewUser);

router.post('/login', authUser);

router.use(validateSession);

router.get('/', protectAdmin, getAllUsers);

router.get('/:id', getUserById);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = { userRouter: router };
