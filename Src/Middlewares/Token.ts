import {Types } from "mongoose";
import jwt from "jsonwebtoken"
const signToken=(userId: string | Types.ObjectId,role:String) => {
    return jwt.sign(
    { id: userId,role:role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
)}
export default signToken;