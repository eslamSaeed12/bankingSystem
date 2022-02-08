import { Chance } from 'chance'
import { connection } from '../connection';

const faker = new Chance();

function generateFakeCustomers(num: number) {
    const customers: Array<object> = [];

    for (let i = 0; i < num; i++) {
        customers.push({
            amount: faker.integer({ min: 0 }),
            name: faker.name(),
            email: faker.email()
        })
    }

    return customers;
}

try {
    connection('customers').insert(generateFakeCustomers(10));
} catch (err) {
    console.error(err)
}