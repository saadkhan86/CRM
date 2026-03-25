import mongoose, { Types } from "mongoose"
import { INote } from "../Interfaces/INote"
const NoteSchema = new mongoose.Schema<INote.Doc>(
  {
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    person: {
      type: Types.ObjectId,
      ref: "People",
    },
    organization: {
      type: Types.ObjectId,
      ref: "Organization",
    },
    deal: {
      type: Types.ObjectId,
      ref: "Deal",
    },
    owner: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Owner Is Required"],
    },
  },
  { timestamps: true },
)
export default mongoose.model<INote.Doc>("Note", NoteSchema)
