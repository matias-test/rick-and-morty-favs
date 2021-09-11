"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const characters_1 = require("../controllers/characters");
const router = express_1.Router();
router.get('/characters', characters_1.listCharacters);
router.get('/characters/:id', characters_1.fetchCharacter);
router.post('/characters/:id/toggle-fav', characters_1.toggleCharacterFav);
exports.default = router;
