"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const env = (key) => {
    if (!process.env[key]) {
        throw Error(`there is no environment variable with this key ${key}`);
    }
    return process.env[key];
};
exports.env = env;
