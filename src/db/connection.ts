import knex from 'knex';
import { env } from '../utils/env';

export const connection = knex({
    client: 'pg',
    connection: env('PG_CONNECTION_STRING'),
    searchPath: ['public', 'path']
});