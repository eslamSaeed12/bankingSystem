

import { env } from './env'

test('ENVIRONMENT VARIABLES HELPER WHEN KEY EXIST', () => {
    expect(env('PORT')).toBe(process.env.PORT);
})


test('ENVIRONMENT VARIABLES HELPER WHEN KEY NOT EXIST', () => {
    const gettingNotExistedkey = () => env('xxxx');
    expect(gettingNotExistedkey).toThrow()
})