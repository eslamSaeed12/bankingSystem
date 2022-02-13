import { pgConnection } from '../db/PgConnection';
import { env } from '../utils/env'


export async function DropDbScript() {
    await pgConnection.query(`DROP DATABASE IF EXISTS ${env('TYPEORM_DATABASE')}`);
}