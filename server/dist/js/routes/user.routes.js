"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = express_1.Router();
router.post('/authenticate', user_1.authenticate);
router.post('/register', user_1.register);
exports.default = router;
