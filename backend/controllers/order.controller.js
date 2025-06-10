import Order from "../models/order.model.js";
import Stripe from "stripe";
import User from "../models/user.model.js";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // use .env   

export const createOrder = async (req, res) => {
    try {
        const { cartItems, shippingInfo } = req.body;

        const totalPrice = cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        // 1. Save Order with unpaid status
        const order = await Order.create({
            user: req.user.id,
            items: cartItems,
            shippingInfo,
            totalPrice,
        });

        // 2. Create Stripe session
        const lineItems = cartItems.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: { name: item.name },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `http://localhost:5173/payment-success?orderId=${order._id}`,
            cancel_url: `http://localhost:5173/payment-cancel`,
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePaidOnSuccess = async (req, res) => {
    const { orderId } = req.body;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            res.json({ success: false, message: "Something went wrong" });
        }
        order.isPaid = true;
        await order.save();
        const user = await User.findOne({ _id: order.user });
        user.cartItems = {}
        await user.save();
        res.json({ success: true, message: "Updated successfully", order })
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

export const updateStatusOfDelivery = async (req, res) => {
    const { status, orderId } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            res.json({ success: false, message: "Something went wrong" });
        }
        order.shippingStatus = status;
        await order.save();

        res.json({ success: true, message: "Status Updated successfully", order })
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

export const getOrders = async (req, res) => {
    const orders = await Order.find();
    if (orders.length <= 0) {
        res.json({ success: false, message: "Something went wrong" });
    }
    res.json({ success: true, message: "Orders fetched successfully", orders })
}

export const getOrdersByUserId = async (req, res) => {
    const orders = await Order.find({ user: req.user.id });
    if (orders.length <= 0) {
        res.json({ success: false, message: "Something went wrong" });
    }
    res.json({ success: true, message: "Orders fetched successfully", orders })
}

export const deleteOrder = async (req, res) => {
    await Order.findOneAndDelete({ isPaid: false });
    res.json({ success: true, message: "Order deleted successfully" })
}