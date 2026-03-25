import mongoose, { Types } from "mongoose"
import { IPeople } from "../Interfaces/IPeople"
const PeopleSchema = new mongoose.Schema<IPeople.Doc>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Name must be at least 3 characters long"],
    },
    email: [
      {
        address: { type: String, unique: true },
        label: String,
      },
    ],
    phone: [
      {
        number: { type: String, unique: true },
        label: String,
      },
    ],
    organization: {
      type: Types.ObjectId,
      ref: "Organization",
    },
  },
  { timestamps: true },
)
export default mongoose.model<IPeople.Doc>("People", PeopleSchema)
