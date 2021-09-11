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
const rickmortyapi_1 = require("rickmortyapi");
const FavoriteCharacter_1 = __importDefault(require("../models/FavoriteCharacter"));
function listCharacters(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page } = req.query;
        const { userId } = req;
        const response = yield rickmortyapi_1.getCharacters({ page: page || 1 });
        if (response.data.info) {
            if (response.data.info.next) {
                const url = new URL(response.data.info.next);
                response.data.info.next = url.searchParams.get('page');
            }
            if (response.data.info.prev) {
                const url = new URL(response.data.info.prev);
                response.data.info.prev = url.searchParams.get('page');
            }
        }
        const charactersIds = (response.data.results || []).map(({ id }) => id);
        const favoriteCharacterIds = (yield FavoriteCharacter_1.default
            .find({ userId, characterId: { $in: charactersIds } }, { characterId: 1, _id: 0 }))
            .map(({ characterId }) => characterId);
        console.log(favoriteCharacterIds);
        res.status(response.status)
            .json(Object.assign(Object.assign({}, response.data), { results: (response.data.results || []).map((character) => (Object.assign(Object.assign({}, character), { isFav: favoriteCharacterIds.includes(character.id) }))) }));
    });
}
exports.listCharacters = listCharacters;
function fetchCharacter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const characterId = parseInt(req.params.id, 10);
        const { userId } = req;
        console.log('userId', userId);
        let fav = yield FavoriteCharacter_1.default.findOne({ userId, characterId });
        console.log({ userId, characterId, fav });
        const response = yield rickmortyapi_1.getCharacter(characterId);
        res.status(response.status).json(Object.assign(Object.assign({}, response.data), { isFav: !!fav }));
    });
}
exports.fetchCharacter = fetchCharacter;
function toggleCharacterFav(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const characterId = parseInt(req.params.id, 10);
        const { userId } = req;
        let fav = yield FavoriteCharacter_1.default.findOne({ userId, characterId });
        const isFav = !!fav;
        if (!fav) {
            fav = new FavoriteCharacter_1.default({ userId, characterId });
            yield fav.save();
        }
        else {
            fav.remove();
        }
        return res.status(200).json({ isFav });
    });
}
exports.toggleCharacterFav = toggleCharacterFav;
