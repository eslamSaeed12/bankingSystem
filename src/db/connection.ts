import { createConnection } from 'typeorm';
import { env } from '../utils/env';
import { join } from 'path'

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
    ssl: true,
    cli: {
        entitiesDir: join(__dirname, 'models'),
        migrationsDir: join(__dirname, 'migrations')
    }
});