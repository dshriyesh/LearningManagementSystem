import express from "express";
import cors from "cors";
import "dotenv/config";
import clerkWebhooks from "./controllers/webhooks.js";
import connectDB from './configs/mongodb.js'
// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Connect ot DB
connectDB();

// Middlewares
app.use(cors());

// Routes
app.get("/", (req, res) => res.send("API Working"));

app.post("/clerk", express.json(), clerkWebhooks);

// Port

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
