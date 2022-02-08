import { connection } from "../connection";

try {
    connection.schema.dropTable('customers').dropTable('transfers');
    console.log('done dropped')
} catch (err) {
    console.error(err)
}

