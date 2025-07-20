import { Schema, model, Document } from 'mongoose';

export interface EmployeeDoc extends Document {
  name: string;
  email: string;
  phone: string;
  department: Schema.Types.ObjectId;
  designation: string;
  status: 'active' | 'inactive';
}

const EmployeeSchema = new Schema<EmployeeDoc>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  designation: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
}, { timestamps: true });

export default model<EmployeeDoc>('Employee', EmployeeSchema);
