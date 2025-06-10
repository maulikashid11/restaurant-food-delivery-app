import express from 'express'
import { getUser, login, logout, register } from '../controllers/user.controller.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', isLoggedIn, logout);
router.get('/get', isLoggedIn, getUser);

export default router