import mongoose from "mongoose";
import CustomerInterface from "../Interfaces/CustomerInterface";
const Schema = mongoose.Schema;
const CustomerSchema = new Schema<CustomerInterface.Doc>(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model<CustomerInterface.Doc>(
  "Customer",
  CustomerSchema
);
