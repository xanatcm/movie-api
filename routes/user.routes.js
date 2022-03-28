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
const { protectAccountOwner } = require('../middlewares/user.middleware');

const router = express.Router();

router.post('/', createNewUser);

router.post('/login', authUser);

router.use(validateSession);

router.get('/', protectAdmin, getAllUsers);

router.get('/:id', getUserById);

router.patch('/:id', protectAccountOwner, updateUser);

router.delete('/:id', protectAccountOwner, deleteUser);

module.exports = { userRouter: router };
