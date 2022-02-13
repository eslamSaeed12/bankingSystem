import { pgConnection } from "../db/PgConnection";
import { env } from "../utils/env";

export async function CheckDbExistanceScript() {

    const query = `SELECT datname FROM pg_catalog.pg_database WHERE datname='${env('TYPEORM_DATABASE')}';`;

    const { rowCount } = await pgConnection.query(query);

    return rowCount;
}