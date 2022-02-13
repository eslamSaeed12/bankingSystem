import { env } from "../src/utils/env";


it('ENVIRONMENT VARIABLES HELPER WHEN KEY EXIST', () => {
    expect(env('PORT')).toBe(process.env.PORT);
})


it('ENVIRONMENT VARIABLES HELPER WHEN KEY NOT EXIST', () => {
    const gettingNotExistedkey = () => env('xxxx');
    expect(gettingNotExistedkey).toThrow()
})