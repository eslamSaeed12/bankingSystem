import { Client } from 'pg'
import { env } from '../utils/env'


const con = new Client({
    user: env('TYPEORM_USERNAME'),
    password: env('TYPEORM_PASSWORD'),
    port: Number(env('TYPEORM_PORT')),
    host: env('TYPEORM_HOST'),
})

async function Main() {
    await con.connect();
    await con.query(`CREATE DATABASE ${env('TYPEORM_DATABASE')}`);
}


Main()
.catch(console.log)
.then(() => console.log('db created successfully', env('TYPEORM_DATABASE')))
.finally(process.exit)