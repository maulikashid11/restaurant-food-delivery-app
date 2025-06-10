import express from 'express'
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { addMenuItem, deleteMenuItem, getMenuItems } from '../controllers/menu.controller.js';
import upload from '../config/multer.js';

const router = express.Router();

router.post('/add',upload.single('file'), addMenuItem)
router.delete('/remove', deleteMenuItem)
router.get('/get', getMenuItems)


export default router