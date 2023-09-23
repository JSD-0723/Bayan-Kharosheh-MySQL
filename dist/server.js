"use strict";
// src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_config_1 = __importDefault(require("./config/db.config"));
// ... your other imports and middleware
const app = (0, express_1.default)();
// ...
// Synchronize models with the database
db_config_1.default.sync().then(() => {
    console.log('Database synced');
});
// Start your Express server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
