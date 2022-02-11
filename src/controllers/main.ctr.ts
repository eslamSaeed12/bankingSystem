import { NextFunction, Request, Response } from "express";
import { getCustomerQuery, getCustomersQuery, transferQuery } from "../db/queries";

function homeAction(req: Request, res: Response, next: NextFunction) {
    try {
        res.render('pages.home');
    } catch (err) {
        next(err)
    }
}

async function customersAction(req: Request, res: Response, next: NextFunction) {
    try {
        const customers = await getCustomersQuery();
        res.render('pages.customers', { customers });
    } catch (err) {
        next(err)
    }
}

async function transferAction(req: Request, res: Response, next: NextFunction) {
    try {
        const { senderId, receiverId, amount } = req.body;
        await transferQuery({ amount: parseFloat(amount), senderId: parseInt(senderId), receiverId: parseInt(receiverId) });
        res.redirect('/customers');
    } catch (err) {
        next(err)
    }
}


async function customerAction(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { message } = req.query;

        const customer = await getCustomerQuery(parseInt(id));

        if (!customer) {
            res.redirect('/404');
            return;
        }

        const customres = await getCustomersQuery();
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