"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
const register = async (req, res) => {
    const { name, email, password } = req.body;
    const exists = await user_model_1.default.findOne({ email });
    if (exists)
        return res.status(400).json({ message: 'User already exists' });
    const user = await user_model_1.default.create({ name, email, password });
    const accessToken = (0, jwt_1.generateAccessToken)(user._id);
    const refreshToken = (0, jwt_1.generateRefreshToken)(user._id);
    res.status(201).json({ accessToken, refreshToken });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await user_model_1.default.findOne({ email }).populate('roles');
    if (!user || !(await (0, bcrypt_1.comparePassword)(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const accessToken = (0, jwt_1.generateAccessToken)(user._id);
    const refreshToken = (0, jwt_1.generateRefreshToken)(user._id);
    res.json({ accessToken, refreshToken });
};
exports.login = login;
