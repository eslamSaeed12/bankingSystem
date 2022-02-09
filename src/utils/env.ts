

import { config } from 'dotenv';

config();

const env = (key: string) => {
    if (!process.env[key]) {
        throw Error(`there is no environment variable with this key ${key}`);
    }

    return process.env[key];
}

export { env }