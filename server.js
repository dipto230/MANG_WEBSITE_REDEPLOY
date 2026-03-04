import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './configs/mongodb.js'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js'
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import courseRouter from './routes/courseRoute.js'
import userRouter from './routes/userRoutes.js';
import projectRouter from './routes/project.routes.js';
import testimonialRouter from './routes/testimonial.routes.js'
import serviceRouter from './routes/service.routes.js'









const app = express()

await connectDb()
await connectCloudinary()

app.use(cors({
  origin: [
     "http://localhost:5173",
    "https://manguuu.com",
    "https://www.manguuu.com",
    "https://mang-website.vercel.app"
  ],
  credentials: true
}));

app.use(clerkMiddleware())


app.get('/', (req, res) => res.send("API WORKING"))
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter)


app.use("/api/products", express.json(), productRoutes);
app.use("/api/orders", express.json(), orderRoutes);
app.use("/api/admin", express.json(), adminRoutes);
app.use("/api/payment", paymentRouter);
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)
app.use("/api/project", projectRouter)
app.use("/api/testimonial", testimonialRouter);
app.use("/api/service", serviceRouter);
app.post('/stripe', express.raw({type:'application/json'}), stripeWebhooks)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})