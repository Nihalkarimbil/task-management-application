import mongoose, { Schema, Document } from "mongoose";


export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  assignee: object
  status: string;
  isDeleted: boolean;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    assignee: { type: Object },
    status:{type:String},
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
