import 'reflect-metadata'
import { config } from 'dotenv'
import { Connection, createConnection } from 'typeorm'
import { Customer } from '../src/db/models/customer';
import { Trasnfer } from '../src/db/models/transfer';
import { execSync } from 'child_process'
config();

let con: Connection;


beforeAll(async () => {
    execSync('npm run db:dev:build');
    con = await createConnection();
})


it('Customers entity should be exist', (done) => {

    con.getRepository(Customer).count().then((v) => {
        expect(v).toBe(10)
        done()
    }).catch(done)
})

it('transfers entity should be exist', (done) => {

    con.getRepository(Trasnfer).find().then((v) => {
        expect(Array.isArray(v)).toBeTruthy()
        done()
    }).catch(done)
})


afterAll(async () => {
    await con.close()
})