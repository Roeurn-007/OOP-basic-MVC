import express from 'express';
import UserController from '../controllers/UserController.js';
import UserService from '../services/UserService.js';

const router = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
