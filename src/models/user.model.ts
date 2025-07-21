import { Schema, model, Document } from 'mongoose';
import { hashPassword } from '../utils/bcrypt';

export interface UserDoc extends Document {
  name: string;
  email: string;
  password: string;
  roles: "admin" | "employee" | "officer";
  status: 'active' | 'suspended' | 'terminated';
  comparePassword: (pw: string) => Promise<boolean>;
}

const UserSchema = new Schema<UserDoc>({
  name: String,
  email: { type: String, unique: true },
  password: String,
  roles:  { type: String, enum: ['admin', 'employee', 'officer'], default: 'admin' },
  status: { type: String, enum: ['active', 'suspended', 'terminated'], default: 'active' },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hashPassword(this.password);
  next();
});

UserSchema.methods.comparePassword = async function (plain: string) {
  const { comparePassword } = await import('../utils/bcrypt');
  return comparePassword(plain, this.password);
};

export default model<UserDoc>('User', UserSchema);
