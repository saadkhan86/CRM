import { Request, Response, NextFunction } from "express"
import admin from "../Services/FirebaseAdmin.Service"
import UserModel from "../Models/User.Model"
import jwt, { JwtPayload } from "jsonwebtoken"

interface DecodedToken extends JwtPayload {
  _id?: string
  id?: string
  email?: string
  role?: string
}

const Authentication = {
  authorization: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Missing or malformed Bearer token",
        })
      }

      const token = authHeader.split(" ")[1]?.trim()
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Token not provided",
        })
      }

      let user = null

      // 1. Attempt verification with Firebase Auth
      try {
        const decodedByFirebase = await admin.auth().verifyIdToken(token)
        if (decodedByFirebase?.uid) {
          user = await UserModel.findOne({ fid: decodedByFirebase.uid })
        }
      } catch (firebaseError) {
        // 2. Fallback to standard JWT verification
        try {
          const secret = process.env.JWT_SECRET
          if (!secret) {
            console.error("JWT_SECRET is not defined in environment variables")
            return res.status(500).json({
              success: false,
              message: "Internal server configuration error",
            })
          }

          const decoded = jwt.verify(token, secret) as DecodedToken
          const userId = decoded._id || decoded.id

          if (userId) {
            user = await UserModel.findById(userId)
          }
        } catch (jwtError) {
          return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
          })
        }
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found or credentials invalid",
        })
      }

      if (user.status === "inactive") {
        return res.status(403).json({
          success: false,
          message: "Account deactivated. Please contact an administrator",
        })
      }

      req.user = user
      return next()
    } catch (error) {
      return next(error)
    }
  },

  requireRole: (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        })
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required roles: ${allowedRoles.join(", ")}`,
        })
      }

      return next()
    }
  },
}

export default Authentication
