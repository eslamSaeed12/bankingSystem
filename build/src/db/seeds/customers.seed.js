"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = require("../models/customer");
const chance_1 = require("chance");
const faker = new chance_1.Chance();
function generateFakeCustomers(num) {
    const customers = [];
    for (let i = 0; i < num; i++) {
        customers.push({
            balance: faker.integer({ min: 0, max: 400000 }),
            name: faker.name(),
            email: faker.email()
        });
    }
    return customers;
}
class CreateCustomers {
    async run(factory, connection) {
        await connection.getRepository(customer_1.Customer).insert(generateFakeCustomers(10));
    }
}
exports.default = CreateCustomers;
