import { Client } from "pg";
import { env } from "../utils/env";

export const pgConnection = new Client({
    user: env('TYPEORM_USERNAME'),
    password: env('TYPEORM_PASSWORD'),
    port: Number(env('TYPEORM_PORT')),
    host: env('TYPEORM_HOST'),
})