"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const db_config_1 = require("./db.config");
const connPool = promise_1.default.createPool({
    host: db_config_1.DB_HOST,
    user: db_config_1.DB_USER,
    database: db_config_1.DB_NAME,
    password: db_config_1.DB_PASSWORD,
    connectionLimit: db_config_1.DB_CON_LIMIT,
});
exports.default = connPool;
