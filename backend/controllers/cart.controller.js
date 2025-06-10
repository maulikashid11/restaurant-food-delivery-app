import User from "../models/user.model.js";

export const addToCart = async (req, res) => {
    const { itemId } = req.body;
    try {

        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            res.json({ success: false, message: "Something went wrong" });
        }

        const cartItems = user.cartItems
        if (cartItems[itemId] >= 0) {
            cartItems[itemId] += 1;
        } else {
            cartItems[itemId] = 1;
        }
        const updatedUser = await User.findOneAndUpdate({ email: req.user.email }, { cartItems })
        res.json({ success: true, message: "Item added to cart" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const removeFromCart = async (req, res) => {
    const { itemId } = req.body;
    try {

        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            res.json({ success: false, message: "Something went wrong" });
        }
        const cartItems = user.cartItems;
        if (cartItems[itemId] > 0) {
            cartItems[itemId] -= 1;
        }
        if (cartItems[itemId] === 0) {
            delete cartItems[itemId];
        }
        const updatedUser = await User.findOneAndUpdate({ email: req.user.email }, { cartItems })
        res.json({ success: true, message: "Item removed from cart" })


    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getCart = async (req, res) => {
    try {
        const { cartItems } = await User.findOne({ email: req.user.email });
        if (cartItems) {
            res.json({ success: true, message: "Item fetched successfully", cartItems })
        } else {
            res.json({ success: false, message: "Something went wrong" });
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}