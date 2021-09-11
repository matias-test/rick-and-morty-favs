"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const favoriteCharactersSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    characterId: {
        type: Number,
        required: true
    },
}, { timestamps: true });
exports.default = mongoose_1.model('FavoriteCharacter', favoriteCharactersSchema);
