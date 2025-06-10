import mongoose from 'mongoose'

const menuSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    category: String,
}, { timestamps: true });

const Menu = mongoose.model("menu", menuSchema)

export default Menu