import { Request, Response } from "express"
import ErrorHandler from "./ErrorHandler"

const GlobalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: Function,
) => {
  if (error instanceof ErrorHandler) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
    })
  }
  return res.status(500).json({
    status: 500,
    message: error.message || "Internal Server Error",
  })
}

export default GlobalErrorHandler
