"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../models/User"));
function authenticate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const secret = process.env.SECRET;
        if (!secret) {
            return res.status(500);
        }
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send("Invalid username or password");
        }
        const user = yield User_1.default.findOne({ username: req.body.username });
        if (user && bcryptjs_1.default.compareSync(password, user.hash)) {
            const token = jsonwebtoken_1.default.sign({ sub: user.id }, secret, { expiresIn: '7d' });
            return res.status(200).json(Object.assign(Object.assign({}, user.toJSON()), { token }));
        }
        return res.status(400).json({ message: 'Username or password is incorrect' });
    });
}
exports.authenticate = authenticate;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const secret = process.env.SECRET;
        if (!secret) {
            return res.status(500);
        }
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send("Uername and password are mandatory");
        }
        if (yield User_1.default.findOne({ username })) {
            return res.status(400).send(`Username ${username} is already taken`);
        }
        const user = new User_1.default({
            username,
            hash: bcryptjs_1.default.hashSync(password, 10),
        });
        const newUser = yield user.save();
        const token = jsonwebtoken_1.default.sign({ sub: newUser.id }, secret, { expiresIn: '7d' });
        return res.status(200).json(Object.assign(Object.assign({}, user.toJSON()), { token }));
    });
}
exports.register = register;
