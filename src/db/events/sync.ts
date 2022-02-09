import { connection } from "../connection";

async function main() {

    if (!(await connection.schema.hasTable('customers'))) {
        await connection.schema.createTable('customers', (table) => {
            table.increments('id');
            table.string('name');
            table.string('email');
            table.double('balance');
        })
    }

    if (!(await connection.schema.hasTable('transfers'))) {
        await connection.schema.createTable('transfers', (table) => {
            table.increments('id');
            table.integer('senderId');
            table.integer('receiverId');
            table.double('amount');
        });
    }
}


main().catch(console.error).finally(() => {
    console.log('synecd syccessfully')
    process.exit()
});

