import {Types } from "mongoose";

const jwt=require("jsonwebtoken");
const signToken=(userId: string | Types.ObjectId) => {
    return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
)}
export default signToken;