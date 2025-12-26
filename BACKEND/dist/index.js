"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_config_1 = require("./config/env.config");
const connect_db_1 = __importDefault(require("./database/connect.db"));
//Calls database for connection status
(0, connect_db_1.default)();
app_1.default.listen(env_config_1.PORT, () => {
    console.log(`Server is listening at Port ${env_config_1.PORT}...`);
});
