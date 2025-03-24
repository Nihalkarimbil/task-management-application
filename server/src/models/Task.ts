import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  assignee: mongoose.Types.ObjectId;
  status: Enumerator;
  section: mongoose.Types.ObjectId;
  isDeleted: boolean;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    assignee: { type: String },
    section: { type: Schema.Types.ObjectId, ref: "Section", required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
