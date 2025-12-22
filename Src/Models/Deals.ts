import mongoose, { Types } from "mongoose";
import DealsInterface from "../Interfaces/DealsInterface";
const Schema=mongoose.Schema;
const DealsSchema=new Schema({

    title: { type: String, required: true },
    customerId: {
      type: Types.ObjectId,
      required: true,
    },
    stage: {
    type: String,
      enum: [
        "received",
        'pending',
        'won',
        'lost'
      ],
      default: "received",
    }

},{timestamps:true});
export default mongoose.model<DealsInterface.Doc>("Deals",DealsSchema);