"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CON_LIMIT = exports.DB_PASSWORD = exports.DB_NAME = exports.DB_USER = exports.DB_HOST = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DB_HOST = process.env.DB_HOST;
exports.DB_USER = process.env.DB_USER;
exports.DB_NAME = process.env.DB_NAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_CON_LIMIT = Number(process.env.DB_CON_LIMIT);
