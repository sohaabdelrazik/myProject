"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DP, POSTGRES_USER, POSTGRES_PASSWORD, ENV, POSTGRES_DP_test, } = process.env;
console.log(ENV);
if (ENV === 'dev') {
    exports.client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DP,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
else if (ENV === 'test') {
    exports.client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DP_test,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
exports.default = exports.client;
