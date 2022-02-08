import { connection } from "../connection";

try {
    connection.schema.createTable('customers', (table) => {
        table.increments('id');
        table.string('name');
        table.string('email');
        table.decimal('amount');
    }).createTable('transfers', (table) => {
        table.increments('id');
        table.integer('senderId');
        table.integer('receiverId');
        table.decimal('amount');
    });

    console.log('synecd syccessfully')
} catch (error) {
    console.error(error)
}