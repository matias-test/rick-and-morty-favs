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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const characters_routes_1 = __importDefault(require("./routes/characters.routes"));
const authChecker_1 = __importDefault(require("./guards/authChecker"));
function connectToMongo() {
    return __awaiter(this, void 0, void 0, function* () {
        let mongoUri;
        if (process.env.MONGO_MEMORY_SERVER) {
            const mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
            mongoUri = mongoServer.getUri();
        }
        else {
            mongoUri = process.env.MONGO_URL;
            if (!mongoUri) {
                throw new Error('Please configure the REACT_APP_MONGO_URL');
            }
        }
        return mongoose_1.default.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    });
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: process.env.CLIENT_URL }));
app.use('/user', user_routes_1.default);
app.use('/characters', authChecker_1.default, characters_routes_1.default);
const PORT = process.env.PORT || 4000;
connectToMongo()
    .then(() => {
    console.log('Connected to mongo'); // eslint-disable-line no-console
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`); // eslint-disable-line no-console
    });
})
    .catch((error) => {
    throw error;
});
