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
        res.render('pages.customers', {
            customers
        });
    } catch (err) {
        next(err)
    }
}

async function transferAction(req: Request, res: Response, next: NextFunction) {
    try {
        const { senderId, receiverId, amount } = req.body;
        const transfer = await transferQuery({ amount, senderId, receiverId });
        res.render('pages.customers', { state: transfer });
    } catch (err) {
        next(err)
    }
}


async function customerAction(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const customer = await getCustomerQuery(parseInt(id));
        res.render('pages.customer', { customer });
    } catch (err) {
        next(err)
    }
}

export { homeAction, customersAction, transferAction, customerAction };