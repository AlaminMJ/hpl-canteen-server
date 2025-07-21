import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGO_URI!;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false, // disable auto index in production
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  try {
    await mongoose.connect(uri, options as any);
    console.log(`[${new Date().toISOString()}] ✅ MongoDB Connected`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] ❌ MongoDB connection error`, error);
    process.exit(1); // exit app if cannot connect
  }
};

export const closeDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log(`[${new Date().toISOString()}] 🔌 MongoDB Disconnected`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] ❗ Error during DB disconnect`, err);
  }
};
