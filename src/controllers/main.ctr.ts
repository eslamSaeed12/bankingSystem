import { NextFunction, Request, Response } from "express";
import { connection } from "../db/connection";
import { Customer } from "../db/models/customer";
import { Trasnfer } from "../db/models/transfer";


function homeAction(req: Request, res: Response, next: NextFunction) {
    try {
        res.render('pages.home');
    } catch (err) {
        next(err)
    }
}

async function customersAction(req: Request, res: Response, next: NextFunction) {
    try {

        const customers = await (await connection).getRepository(Customer).find();
        res.render('pages.customers', { customers });
    } catch (err) {
        next(err)
    }
}

async function transferAction(req: Request, res: Response, next: NextFunction) {
    try {
        const { senderId, receiverId, amount } = req.body;

      
        const sender = await (await connection).getRepository(Customer).findOneOrFail(senderId);

        const receiver = await (await connection).getRepository(Customer).findOneOrFail(receiverId);

        await (await connection).getRepository(Customer).update(sender.id, {
            balance: (sender.balance) - parseFloat(amount)
        });

        await (await connection).getRepository(Customer).update(receiver.id, {
            balance: (sender.balance) + parseFloat(amount)
        });

        await (await connection).getRepository(Trasnfer).insert({
            amount: parseFloat(amount), senderId: parseInt(senderId), receiverId: parseInt(receiverId)
        })
        const customers = await (await connection).getRepository(Customer).find();
        res.render('pages.customers', { customers });
    } catch (err) {
        next(err)
    }
}


async function customerAction(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { message } = req.query;

        const customer = await (await connection).getRepository(Customer).findOneOrFail(parseInt(id));

        const customres = await (await connection).getRepository(Customer).find();
        res.render('pages.customer', { customer, customres, message, csrf_token: req.csrfToken() });
    } catch (err) {
        next(err)
    }
}


async function notFoundAction(req: Request, res: Response, next: NextFunction) {
    try {
        res.render('pages/404', { location: req.url });
    } catch (err) {
        next(err)
    }
}

export { homeAction, customersAction, transferAction, customerAction, notFoundAction };