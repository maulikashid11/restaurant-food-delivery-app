import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartItems: {
        type: Object,
        required: true,
        default: {}
    }
}, { timestamps: true })

const User = mongoose.model('user', userSchema);
export default User