import mongoose from "mongoose"
import { IActivity } from "../Interfaces/IActivity"
const ActivitySchema = new mongoose.Schema<IActivity.Doc>({
  title: {
    type: String,
    required: [true, "Activity Title Required"],
  },
  type: {
    type: String,
    enum: ["call", "meeting", "email", "sms"],
    required: [true, "Activity Type Required"],
  },
  description: {
    type: String,
    required: [true, "Activity Description Required"],
  },
  dueDate: {
    type: Date,
  },
  completedDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  person: {
    type: mongoose.Types.ObjectId,
    ref: "People",
    required: [true, "People Required"],
  },
  deal: {
    type: mongoose.Types.ObjectId,
    ref: "Deal",
    required: [true, "Deal Required"],
  },
  organization: {
    type: mongoose.Types.ObjectId,
    ref: "Organization",
    required: [true, "Organization Required"],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Owner Of Activity Is Required"],
  },
})
export default mongoose.model("Activity", ActivitySchema)
