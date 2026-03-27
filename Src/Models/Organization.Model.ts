import mongoose from "mongoose"
import { IOrganization } from "../Interfaces/IOrganization"
const OrganizationSchema = new mongoose.Schema<IOrganization.Doc>(
  {
    name: {
      type: String,
      required: [true, "Organization name is required"],
      unique: true,
    },
    address: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Creator Of Organization Is Required"],
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Owner Of Organization Is Required"],
    },
    peopleCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

export default mongoose.model<IOrganization.Doc>(
  "Organization",
  OrganizationSchema,
)
