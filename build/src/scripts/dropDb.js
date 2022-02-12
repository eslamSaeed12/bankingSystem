"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const env_1 = require("../utils/env");
const con = new pg_1.Client({
    user: (0, env_1.env)('TYPEORM_USERNAME'),
    password: (0, env_1.env)('TYPEORM_PASSWORD'),
    port: Number((0, env_1.env)('TYPEORM_PORT')),
    host: (0, env_1.env)('TYPEORM_HOST'),
});
async function Main() {
    await con.connect();
    await con.query(`DROP DATABASE ${(0, env_1.env)('TYPEORM_DATABASE')}`);
}
Main()
    .catch(console.log)
    .then(() => console.log('db dropped successfully', (0, env_1.env)('TYPEORM_DATABASE')))
    .finally(process.exit);
