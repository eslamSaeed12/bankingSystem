import { createConnection } from 'typeorm';
import { env } from '../utils/env';

const isDev = <string>env('NODE_ENV') === 'development' ? 'default' : 'stage';

export const connection = createConnection(isDev);