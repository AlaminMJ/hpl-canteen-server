"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer '))
        return res.status(401).json({ message: 'No token' });
    try {
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await user_model_1.default.findById(decoded.id).populate('roles');
        if (!user || user.status !== 'active') {
            return res.status(403).json({ message: 'Access denied' });
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
const authorize = (...requiredPermissions) => {
    return (req, res, next) => {
        const permissions = req.user.roles.flatMap((r) => r.permissions);
        const hasAll = requiredPermissions.every(p => permissions.includes(p));
        if (!hasAll)
            return res.status(403).json({ message: 'Permission denied' });
        next();
    };
};
exports.authorize = authorize;
