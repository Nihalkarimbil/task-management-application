import mongoose, { Schema, Document } from "mongoose";

export interface ISection extends Document {
  name: string;
  tasks: mongoose.Types.ObjectId[];
  isDeleted:boolean

}

const SectionSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }], 
    isDeleted:{type:Boolean,default:false}
  },
  { timestamps: true }
);

export default mongoose.model<ISection>("Section", SectionSchema);
