import GlobalErrorHandler from "./ErrorHandler/GlobalErrorHandler"
import express, { Request, Response } from "express"
import Router from "./Routes/router"
import dotenv from "dotenv"
import cors from "cors"
import connetion from "./Connetions/MongoDB"

dotenv.config()
const app = express()

// Middleware
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: process.env.ALLOWED_ORIGINS || "*" }))

// Root & Health check endpoints
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Server is running properly" })
})

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
})

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({ message: "pong" })
})

// API Router
app.use("/api/v1", Router)

// 404 Handler for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: `Cannot ${req.method} ${req.originalUrl} - Route not found`,
    timestamp: new Date().toISOString(),
  })
})

// Global Error Handler
app.use(GlobalErrorHandler)

// Database Connection & Server Initialization
const PORT = process.env.PORT || 3000

connetion()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT} [${process.env.NODE_ENV || "development"}]`)
    })

    const shutdown = (signal: string) => {
      console.log(`\nReceived ${signal}. Closing server gracefully...`)
      server.close(() => {
        console.log("Server closed. Exiting process.")
        process.exit(0)
      })
    }

    process.on("SIGINT", () => shutdown("SIGINT"))
    process.on("SIGTERM", () => shutdown("SIGTERM"))
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err)
    process.exit(1)
  })
