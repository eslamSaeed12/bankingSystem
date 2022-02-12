import { Connection } from "typeorm";
import { Seeder } from "typeorm-seeding";
import { Customer } from "../models/customer";
import { Chance } from 'chance'

const faker = new Chance();


function generateFakeCustomers(num: number) {
    const customers: Array<object> = [];

    for (let i = 0; i < num; i++) {
        customers.push({
            balance: faker.integer({ min: 0, max: 400000 }),
            name: faker.name(),
            email: faker.email()
        })
    }

    return customers;
}


export default class CreateCustomers implements Seeder {
    public async run(factory: any, connection: Connection): Promise<any> {
        await connection.getRepository(Customer).insert(generateFakeCustomers(10))
    }
}