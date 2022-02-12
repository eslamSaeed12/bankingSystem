"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connection_1 = require("./db/connection");
const main_1 = require("./main");
const env_1 = require("./utils/env");
async function main() {
    await (0, connection_1.connection)();
    main_1.app.listen((0, env_1.env)('PORT'), () => {
        console.log('app is run at ', (0, env_1.env)('PORT'));
    });
}
main().catch(console.error);
