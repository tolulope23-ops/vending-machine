"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_connect_1 = __importDefault(require("../config/db_connect"));
const connectDB = async () => {
    try {
        const connection = await db_connect_1.default.getConnection();
        console.log("Database connected successfully");
        connection.release(); //Returns the connection back to the pool
    }
    catch (error) {
        console.error("Database connection failed:", error.message);
    }
};
exports.default = connectDB;
