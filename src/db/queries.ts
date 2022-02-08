import { connection } from './connection'


interface ITransferQueryParams {

    amount: number;

    senderId: number;

    receiverId: number;

}

function getCustomersQuery() {
    return connection.select('*').from('customers');
}


function getCustomerBalance(customerId: number) {
    return connection.select('balance').from('customer').where('id', customerId);
}


function setTransferOperation({ amount, receiverId, senderId }: ITransferQueryParams) {
    return connection('transfers').insert({ amount, senderId, receiverId });
}


async function transferQuery({ amount, receiverId, senderId }: ITransferQueryParams) {
    // getting sender balance 
    const senderBalance = await getCustomerBalance(senderId).first();

    // getting receiver balance
    const receiverBalance = await getCustomerBalance(receiverId).first();

    // first reduce the amount from sender 

    const updateSenderStmt = await connection
        .table('customers')
        .update({
            amount: amount - senderBalance?.balance
        }).where('id', senderId).first();


    // second increase balance from recevier

    const updateReceiverStmt = await connection
        .table('customers')
        .update({
            amount: amount + receiverBalance?.balance
        }).where('id', senderId).first();



    // adding transfer operation
    const transferOperation = await setTransferOperation({ amount, senderId, receiverId });

    return {
        updateSenderStmt,
        updateReceiverStmt,
        transferOperation
    }

}

export { getCustomersQuery, transferQuery }