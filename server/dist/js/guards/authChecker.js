"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authChecker(req, res, next) {
    const secret = process.env.SECRET;
    if (!secret) {
        return res.status(500).json({});
    }
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized');
    }
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
    let userId = '';
    try {
        const result = jsonwebtoken_1.default.verify(token, secret);
        userId = result.sub;
    }
    catch (_a) {
        return res.status(401).send('Unauthorized');
    }
    req.userId = userId;
    return next();
}
exports.default = authChecker;
