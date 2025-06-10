// models/order.model.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    shippingInfo: {
      firstname: String,
      lastname: String,
      email: String,
      address: String,
      city: String,
      zipcode: String,
      country: String,
      phone: String,
    },
    shippingStatus: {
      type: String,
      default: "Pending",
      enum:['Pending',"Delivered","Out Of Stock"]
    },
    isPaid: { type: Boolean, default: false },
    totalPrice: Number,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order
