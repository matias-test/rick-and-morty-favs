"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const characters_routes_1 = __importDefault(require("./routes/characters.routes"));
const authChecker_1 = __importDefault(require("./guards/authChecker"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default({ origin: process.env.CLIENT_URL }));
app.use('/user', user_routes_1.default);
app.use(authChecker_1.default);
app.use('/characters', characters_routes_1.default);
const PORT = process.env.PORT || 4000;
const mongoDB = process.env.MONGO_URL;
if (!mongoDB) {
    throw new Error('Please configure the REACT_APP_MONGO_URL');
}
mongoose_1.default
    .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('Connected to mongo'); // eslint-disable-line no-console
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`); // eslint-disable-line no-console
    });
})
    .catch((error) => {
    throw error;
});
