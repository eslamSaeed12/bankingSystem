import { Connection } from "typeorm";
import { Seeder } from "typeorm-seeding";
import { generateFakeCustomers } from "../../utils/fakeCustomers";
import { Customer } from "../models/customer";

export default class CreateCustomers implements Seeder {
    public async run(factory: any, connection: Connection): Promise<any> {
        await connection.getRepository(Customer).insert(generateFakeCustomers(10))
    }
}