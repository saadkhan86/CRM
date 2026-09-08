import express, { Request, Response } from "express"
import mongoose from "mongoose"
import ApiResponse from "../Utils/ApiResponse"

const SystemRouter = express.Router()

const getDatabaseState = (state: number): string => {
  switch (state) {
    case 0:
      return "disconnected"
    case 1:
      return "connected"
    case 2:
      return "connecting"
    case 3:
      return "disconnecting"
    default:
      return "unknown"
  }
}

SystemRouter.get("/status", (req: Request, res: Response) => {
  const memoryUsage = process.memoryUsage()

  const systemStatus = {
    service: "CRM Backend API",
    status: "healthy",
    uptime: `${Math.floor(process.uptime())}s`,
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
    database: {
      status: getDatabaseState(mongoose.connection.readyState),
      host: mongoose.connection.host || "unknown",
      name: mongoose.connection.name || "unknown",
    },
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      memory: {
        rssMB: (memoryUsage.rss / 1024 / 1024).toFixed(2),
        heapUsedMB: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2),
        heapTotalMB: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2),
      },
    },
  }

  return ApiResponse.success(res, systemStatus, "System health retrieved successfully")
})

SystemRouter.get("/ping", (req: Request, res: Response) => {
  return ApiResponse.success(res, { ping: "pong" }, "Service responsive")
})

export default SystemRouter
