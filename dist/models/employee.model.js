"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EmployeeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    designation: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    department: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Department', required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Employee', EmployeeSchema);
