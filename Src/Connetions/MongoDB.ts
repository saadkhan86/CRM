import mongoose from "mongoose";
import env from "dotenv";
env.config();
const DB:any=process.env.MONGODB_URL;
const connetion=async ()=>{
return await mongoose
  .connect(DB)
  .then(() => {
    console.log("mongo db connected");
  })
  .catch((e) => {
    console.log(e.message);
  });
}
export default connetion