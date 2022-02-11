import { connection } from './connection'


interface ITransferQueryParams {

    amount: number;

    senderId: number;

    receiverId: number;

}

function getCustomersQuery() {
    return connection('customers').select('*').orderBy('balance', 'desc');
}


async function getCustomerBalance(customerId: number) {
    return await connection('customers').select('*').where({ id: customerId }).first();
}


function setTransferOperation({ amount, receiverId, senderId }: ITransferQueryParams) {
    return connection('transfers').insert({ amount, senderId, receiverId });
}


async function transferQuery({ amount, receiverId, senderId }: ITransferQueryParams) {
    // getting sender balance 
    const senderBalance = await getCustomerBalance(senderId);

    // getting receiver balance
    const receiverBalance = await getCustomerBalance(receiverId);

    // first reduce the amount from sender 
    const updateSenderStmt = await connection
        .from('customers')
        .where('id', senderId)
        .update({
            balance: senderBalance?.balance - amount
        }, '*', { includeTriggerModifications: true });



    // second increase balance from recevier

    const updateReceiverStmt = await connection('customers')
        .update({
            balance: amount + receiverBalance?.balance
        }, '*', { includeTriggerModifications: true }).where({ id: receiverId });

    // adding transfer operation
    const transferOperation = await setTransferOperation({ amount, senderId, receiverId });

    return {
        updateSenderStmt,
        updateReceiverStmt,
        transferOperation
    }

}

function getCustomerQuery(id: number) {
    return connection('customers').select('*').where({ id: id }).first();
}

export { getCustomersQuery, transferQuery, getCustomerQuery, getCustomerBalance }