import { Chance } from 'chance'

const faker = new Chance();


export function generateFakeCustomers(num: number) {
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