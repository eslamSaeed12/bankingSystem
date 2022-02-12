"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
test('ENVIRONMENT VARIABLES HELPER WHEN KEY EXIST', () => {
    expect((0, env_1.env)('PORT')).toBe(process.env.PORT);
});
test('ENVIRONMENT VARIABLES HELPER WHEN KEY NOT EXIST', () => {
    const gettingNotExistedkey = () => (0, env_1.env)('xxxx');
    expect(gettingNotExistedkey).toThrow();
});
