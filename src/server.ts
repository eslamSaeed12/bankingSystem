import 'reflect-metadata';
import { connection } from './db/connection';
import { app } from './main'
import { env } from './utils/env'



async function main() {

    await connection;

    app.listen(env('PORT'), () => {
        console.log('app is run at ', env('PORT'));
    });
}


main().catch(console.error);
