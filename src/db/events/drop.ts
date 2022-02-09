import { connection } from "../connection";

async function main() {
    await connection.schema.dropTable('customers').dropTable('transfers');
}

main().catch(console.error).finally(() => {
    console.log('tables dropped succesfully !');
    process.exit();
})