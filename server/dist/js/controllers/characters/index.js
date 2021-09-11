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
Object.defineProperty(exports, "__esModule", { value: true });
const rickmortyapi_1 = require("rickmortyapi");
function listCharacters(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page } = req.query;
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
        res.status(response.status).json(response.data);
    });
}
exports.listCharacters = listCharacters;
function fetchCharacter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const response = yield rickmortyapi_1.getCharacter(parseInt(id, 10));
        res.status(response.status).json(response.data);
    });
}
exports.fetchCharacter = fetchCharacter;
function toggleCharacterFav() {
    return __awaiter(this, void 0, void 0, function* () {
        throw new Error('Not yet implemented');
    });
}
exports.toggleCharacterFav = toggleCharacterFav;
