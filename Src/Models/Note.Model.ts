import mongoose, { Types } from "mongoose"
import { INote } from "../Interfaces/INote"
const NoteSchema = new mongoose.Schema<INote.Doc>({
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  person: {
    type: Types.ObjectId,
    ref: "People",
    required: [true, "Person Required for Notes"],
  },
  organization: {
    type: Types.ObjectId,
    ref: "Organization",
    required: [true, "Organization Is required"],
  },
  deal: {
    type: Types.ObjectId,
    ref: "Deal",
    required: [true, "Deal Is Required"],
  },
  owner: {
    type: Types.ObjectId,
    red: "User",
    required: [true, "Owner Is Required"],
  },
})
export default mongoose.model<INote.Doc>("Note", NoteSchema)
