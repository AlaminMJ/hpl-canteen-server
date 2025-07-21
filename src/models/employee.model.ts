import { Schema, model, Document } from "mongoose";

export interface EmployeeDoc extends Document {
  name: string;
  rfid: string;
  id: number;
  emplyee_type: "management" | "non-management";
  department: Schema.Types.ObjectId;
  designation: string;
  status: "active" | "inactive";
}

const EmployeeSchema = new Schema<EmployeeDoc>(
  {
    name: { type: String, required: true },
    rfid: { type: String, unique: true, required: true },
    id:{type: Number, unique: true, required: true},
    emplyee_type: {
      type: String,
      enum: ["management", "non-management"],
      required: true,
      default: "non-management",
    },
    designation: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
  },
  { timestamps: true }
);

export default model<EmployeeDoc>("Employee", EmployeeSchema);
