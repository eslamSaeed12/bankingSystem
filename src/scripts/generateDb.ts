import { pgConnection } from '../db/PgConnection';
import { env } from '../utils/env'


export async function CreateDbScript() {
    await pgConnection.query(`CREATE DATABASE ${env('TYPEORM_DATABASE')}`);
}