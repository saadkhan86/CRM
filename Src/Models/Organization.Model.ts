import mongoose from "mongoose"
import { IOrganization } from "../Interfaces/IOrganization"
const OrganizationSchema = new mongoose.Schema<IOrganization.Doc>(
  {
    name: {
      type: String,
      required: [true, "Organization name is required"],
    },
    address: {
      type: String,
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
