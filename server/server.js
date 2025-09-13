import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import { seedAwarenessResources } from "./utils/seedData.js"

import authRoutes from "./routes/auth.js"
import deviceRoutes from "./routes/devices.js"
import awarenessRoutes from "./routes/awareness.js"

// Load environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()


app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(express.json())


app.use("/api/auth", authRoutes)
app.use("/api/devices", deviceRoutes)
app.use("/api/awareness", awarenessRoutes)

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!", timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!" })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  await seedAwarenessResources()
})
