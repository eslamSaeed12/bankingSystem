import { Chance } from 'chance'
import { connection } from '../connection';

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


async function main() {
    //console.log(generateFakeCustomers(10))
    await connection('customers').insert(generateFakeCustomers(10));
}

main().catch(console.error).finally(() => {
    console.log('db sedded succsessfully !');
    process.exit()
})