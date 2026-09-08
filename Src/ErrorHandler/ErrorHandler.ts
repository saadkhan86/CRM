class ErrorHandler extends Error {
  public status: number
  public errors: any[]
  public isOperational: boolean

  constructor(
    status: number,
    message: string,
    errors: any[] = [],
    isOperational: boolean = true,
  ) {
    super(message)
    this.status = status
    this.errors = errors
    this.isOperational = isOperational

    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this, this.constructor)
  }

  static badRequest(message: string, errors: any[] = []) {
    return new ErrorHandler(400, message, errors)
  }

  static unauthorized(message = "Unauthorized access") {
    return new ErrorHandler(401, message)
  }

  static forbidden(message = "Access forbidden") {
    return new ErrorHandler(403, message)
  }

  static notFound(message = "Resource not found") {
    return new ErrorHandler(404, message)
  }

  static conflict(message: string) {
    return new ErrorHandler(409, message)
  }

  static internal(message = "Internal server error") {
    return new ErrorHandler(500, message, [], false)
  }
}

export default ErrorHandler
