"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const characters_controller_1 = require("../controllers/characters.controller");
const router = (0, express_1.Router)();
router.get('/', characters_controller_1.listCharacters);
router.get('/:id', characters_controller_1.fetchCharacter);
router.post('/:id/toggle-fav', characters_controller_1.toggleCharacterFav);
exports.default = router;
