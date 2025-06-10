import express from 'express'
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { addToCart, getCart, removeFromCart } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/add', isLoggedIn, addToCart)
router.post('/remove', isLoggedIn, removeFromCart)
router.get('/get', isLoggedIn, getCart)

export default router