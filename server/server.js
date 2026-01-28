import express from "express";
import cors from "cors";
import "dotenv/config";
import clerkWebhooks from "./controllers/webhooks.js";
import connectDB from './configs/mongodb.js'
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";
import courseRouter from "./routes/courseRoute.js";
import userRouter from "./routes/userRoute.js";

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Connect ot DB
await connectDB();
await connectCloudinary();
// Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

// Routes
app.get("/", (req, res) => res.send("API Working"));
app.use('/api/educator',express.json(),educatorRouter);
app.use('/api/course',express.json(),courseRouter)
app.use('/api/user',express.json(),userRouter)


// app.post("/clerk", express.json(), clerkWebhooks);
app.post(
  "/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

// Port

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
