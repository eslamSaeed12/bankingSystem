import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
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
        const customers = await getRepository(Customer).find();
        res.render('pages.customers', { customers });
    } catch (err) {
        next(err)
    }
}

async function transferAction(req: Request, res: Response, next: NextFunction) {
    try {
        const { senderId, receiverId, amount } = req.body;

        const sender = await getRepository(Customer).findOneOrFail(senderId);

        const receiver = await getRepository(Customer).findOneOrFail(receiverId);

        await getRepository(Customer).update(sender.id, {
            balance: (sender.balance) - parseFloat(amount)
        });

        await getRepository(Customer).update(receiver.id, {
            balance: (sender.balance) + parseFloat(amount)
        });

        await getRepository(Trasnfer).insert({
            amount: parseFloat(amount), senderId: parseInt(senderId), receiverId: parseInt(receiverId)
        })
        res.redirect('/customers', 200);
    } catch (err) {
        next(err)
    }
}


async function customerAction(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { message } = req.query;

        const customer = await getRepository(Customer).findOneOrFail(parseInt(id));

        const customres = await getRepository(Customer).find();
        res.render('pages.customer', { customer, customres, message });
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