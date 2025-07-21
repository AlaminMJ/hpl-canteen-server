import { Schema, model, Document, Types } from 'mongoose';

export interface MealConsumptionDoc extends Document {
  employee_Id: Types.ObjectId;
  meal_type: Types.ObjectId;
  date: Date;
  status: 'Consume' | 'Pending';
  deviceinfo: {
    floor: string;
  };
}

const MealConsumptionSchema = new Schema<MealConsumptionDoc>({
  employee_Id: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  meal_type: { type: Schema.Types.ObjectId, ref: 'MealType', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Consume', 'Pending'], default: 'Pending' },
  deviceinfo: {
    floor: { type: String, required: true },
  },
}, { timestamps: true });

// Prevent duplicate record for same employee, meal_type, date
MealConsumptionSchema.index({ employee_Id: 1, meal_type: 1, date: 1 }, { unique: true });

export default model<MealConsumptionDoc>('MealConsumption', MealConsumptionSchema);
