import mongoose from 'mongoose';

const connectToDb = async () => {
    mongoose.connect(`${process.env.MONGO_URI}/restaurant-food-delivery`)
        .then(() => {
            console.log("Connected to MongoDB");
        })
}

export default connectToDb;