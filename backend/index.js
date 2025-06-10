import express from 'express'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userRoute from './routes/user.route.js'
import cartRoute from './routes/cart.route.js'
import menuRoute from './routes/menu.route.js'
import orderRoute from './routes/order.route.js'
import connectToDb from './config/db.js';

config()
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:['http://localhost:5173'],
    credentials: true,
}))
connectToDb()

app.get('/', (req, res) => {
    res.json({ success: true, message: "This is get request" })
})

app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/menu", menuRoute);
app.use("/api/order", orderRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})