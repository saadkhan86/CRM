import { Response } from "express"

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export class ApiResponse {
  static success<T>(
    res: Response,
    data: T,
    message: string = "Operation successful",
    statusCode: number = 200,
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    })
  }

  static created<T>(
    res: Response,
    data: T,
    message: string = "Resource created successfully",
  ) {
    return this.success(res, data, message, 201)
  }

  static paginated<T>(
    res: Response,
    items: T[],
    total: number,
    page: number,
    limit: number,
    message: string = "Records retrieved successfully",
  ) {
    const totalPages = Math.ceil(total / limit)
    const pagination: PaginationMeta = {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    }

    return res.status(200).json({
      success: true,
      message,
      data: items,
      pagination,
      timestamp: new Date().toISOString(),
    })
  }
}

export default ApiResponse
