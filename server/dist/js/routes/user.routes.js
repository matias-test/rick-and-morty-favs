"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.Router();
router.post('/authenticate', user_controller_1.authenticate);
router.post('/register', user_controller_1.register);
exports.default = router;
