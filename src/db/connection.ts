import { createConnection } from 'typeorm';
import { env } from '../utils/env';
import { join } from 'path'

const ssl: boolean | object = env('NODE_ENV') === 'development' ? false : {
    rejectUnauthorized: false
};


export const connection = createConnection({
    type: 'postgres',
    database: env('TYPEORM_DATABASE'),
    host: env('TYPEORM_HOST'),
    migrations: [join(__dirname, 'migrations', '*.ts'), join(__dirname, 'migrations', '*.js')],
    entities: [join(__dirname, 'models', '*.ts'), join(__dirname, 'models', '*.js')],
    username: env('TYPEORM_USERNAME'),
    password: env('TYPEORM_PASSWORD'),
    synchronize: false,
    logging: false,
    ssl: ssl,
    cli: {
        entitiesDir: join(__dirname, 'models'),
        migrationsDir: join(__dirname, 'migrations')
    }
});