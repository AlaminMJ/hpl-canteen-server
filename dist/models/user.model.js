"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("../utils/bcrypt");
const UserSchema = new mongoose_1.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    roles: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Role' }],
    status: { type: String, enum: ['active', 'suspended', 'terminated'], default: 'active' },
}, { timestamps: true });
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    this.password = await (0, bcrypt_1.hashPassword)(this.password);
    next();
});
UserSchema.methods.comparePassword = async function (plain) {
    const { comparePassword } = await Promise.resolve().then(() => __importStar(require('../utils/bcrypt')));
    return comparePassword(plain, this.password);
};
exports.default = (0, mongoose_1.model)('User', UserSchema);
