"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const sequelize_config_1 = __importDefault(require("./config/sequelize.config"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', book_routes_1.default);
app.use('/api', user_routes_1.default);
sequelize_config_1.default.sync().then(() => {
    console.log('Database tables have been synchronized');
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
