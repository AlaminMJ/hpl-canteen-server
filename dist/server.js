"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    await (0, db_1.connectDB)();
    const server = app_1.default.listen(PORT, () => {
        console.log(`[${new Date().toISOString()}] 🚀 Server running on port ${PORT}`);
    });
    const shutdown = async () => {
        console.log('\n🛑 Gracefully shutting down...');
        await (0, db_1.closeDB)();
        server.close(() => {
            console.log(`[${new Date().toISOString()}] 🔒 Server closed`);
            process.exit(0);
        });
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
};
startServer();
