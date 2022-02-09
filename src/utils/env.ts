

import { config } from 'dotenv';

config();

const env = (key: string) => process.env[key];

export { env }