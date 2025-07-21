"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false, // disable auto index in production
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    };
    try {
        await mongoose_1.default.connect(uri, options);
        console.log(`[${new Date().toISOString()}] ✅ MongoDB Connected`);
    }
    catch (error) {
        console.error(`[${new Date().toISOString()}] ❌ MongoDB connection error`, error);
        process.exit(1); // exit app if cannot connect
    }
};
exports.connectDB = connectDB;
const closeDB = async () => {
    try {
        await mongoose_1.default.disconnect();
        console.log(`[${new Date().toISOString()}] 🔌 MongoDB Disconnected`);
    }
    catch (err) {
        console.error(`[${new Date().toISOString()}] ❗ Error during DB disconnect`, err);
    }
};
exports.closeDB = closeDB;
