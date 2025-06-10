// routes/order.js
import express from "express";
import { createOrder, deleteOrder, getOrders, getOrdersByUserId, updatePaidOnSuccess, updateStatusOfDelivery } from "../controllers/order.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.post("/create-order", isLoggedIn, createOrder)
router.put("/updatepaid", isLoggedIn, updatePaidOnSuccess)
router.put("/updatestatus", updateStatusOfDelivery)
router.get("/get", getOrders)
router.get("/getbyid",isLoggedIn, getOrdersByUserId)
router.delete('/delete',deleteOrder)

export default router