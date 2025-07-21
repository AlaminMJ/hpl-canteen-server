import { Schema, model, Document } from 'mongoose';

export interface MealTypeDoc extends Document {
  name: string;
  startTime: string;
  endTime: string;
  lastRequisition: string;
}

const MealTypeSchema = new Schema<MealTypeDoc>({
  name: { type: String, required: true, unique: true },
  startTime: { type: String, required: true }, // Format: HH:mm
  endTime: { type: String, required: true },
  lastRequisition: { type: String, required: true },
}, { timestamps: true });

export default model<MealTypeDoc>('MealType', MealTypeSchema);
