import { NextFunction, Request, Response } from "express";
import { getCustomersQuery, transferQuery } from "../db/queries";


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
        res.render('customers.pages', customers);
    } catch (err) {
        next(err)
    }
}

async function transferAction(req: Request, res: Response, next: NextFunction) {
    try {
        const { senderId, receiverId, amount } = req.body;
        const transfer = await transferQuery({ amount, senderId, receiverId });
        res.render('/customers', { state: transfer });
    } catch (err) {
        next(err)
    }
}

export { homeAction, customersAction, transferAction };