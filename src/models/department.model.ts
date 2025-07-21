import { Schema, model, Document } from "mongoose";

export interface DepartmentDoc extends Document {
  name: string;
}

const DepartmentSchema = new Schema<DepartmentDoc>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default model<DepartmentDoc>("Department", DepartmentSchema);
