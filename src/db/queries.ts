import { connection } from './connection'


interface ITransferQueryParams {

    amount: number;

    senderId: number;

    receiverId: number;

}

function getCustomersQuery() {
    return connection('customers').select('*');
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

    console.log(senderBalance?.balance, '-', senderBalance?.balance - amount)
    console.log(receiverBalance?.balance, '+', receiverBalance?.balance + amount)
    // first reduce the amount from sender 

    const updateSenderStmt = await connection
        .from('customers')
        .where('id', senderId)
        .update({
            balance: senderBalance?.balance - amount
        }, '*', { includeTriggerModifications: true });


    console.log('after ', updateSenderStmt)

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

export { getCustomersQuery, transferQuery, getCustomerQuery }