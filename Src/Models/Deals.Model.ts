import mongoose from "mongoose"
import { IDeal } from "../Interfaces/IDeal"
const DealsSchema = new mongoose.Schema<IDeal.Doc>(
  {
    title: {
      type: String,
      required: true,
    },
    value: {
      amount: {
        type: Number,
        default: 0,
      },
      currency: {
        type: String,
        default: "USD",
      },
    },
    stage: {
      type: String,
      enum: [
        "lead",
        "contacted",
        "meeting",
        "proposal",
        "negotiation",
        "won",
        "lost",
      ],
      default: "lead",
    },
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "People",
      required: [true, "People is required for Deal"],
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },
  },
  { timestamps: true },
)
export default mongoose.model<IDeal.Doc>("Deal", DealsSchema)
