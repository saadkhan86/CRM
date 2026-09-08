import { Request, Response, NextFunction } from "express"
import ErrorHandler from "./ErrorHandler"

const GlobalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = err

  // 1. Mongoose Validation Error
  if (err.name === "ValidationError" && err.errors) {
    const extractedErrors = Object.values(err.errors).map((el: any) => ({
      field: el.path,
      message: el.message,
    }))
    error = ErrorHandler.badRequest("Validation failed", extractedErrors)
  }

  // 2. Mongoose Invalid ObjectId (CastError)
  else if (err.name === "CastError") {
    const message = `Invalid format for resource identifier: ${err.value}`
    error = ErrorHandler.badRequest(message)
  }

  // 3. MongoDB Duplicate Key Error (E11000)
  else if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field"
    const value = err.keyValue ? err.keyValue[field] : ""
    const message = `Duplicate value '${value}' entered for ${field}. Please use a unique value.`
    error = ErrorHandler.conflict(message)
  }

  // 4. JWT Errors
  else if (err.name === "JsonWebTokenError") {
    error = ErrorHandler.unauthorized("Invalid authentication token")
  } else if (err.name === "TokenExpiredError") {
    error = ErrorHandler.unauthorized("Authentication token has expired")
  }

  // Fallback to custom ErrorHandler or default 500
  const statusCode = error.status || 500
  const message = error.message || "Internal Server Error"
  const errors = error.errors || []

  // Log non-operational (unexpected) bugs to server console
  if (!error.isOperational && statusCode === 500) {
    console.error("💥 UNHANDLED INTERNAL ERROR:", err)
  }

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    ...(errors.length > 0 && { errors }),
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    timestamp: new Date().toISOString(),
  })
}

export default GlobalErrorHandler
