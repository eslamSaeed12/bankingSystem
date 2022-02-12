import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Customer } from "../db/models/customer";

// if sender balance less than amount he want to transfer redirect him to the page with error msg
export const useCheckCustomerBalanceMd = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { amount, senderId } = req.body;

        const { balance } = await getRepository(Customer).findOneOrFail(senderId);

        const referer = req.headers.referer ?? '/customer/' + senderId;


        if (!amount) {
            return res.redirect(301, referer.concat("?message=Transfer amount is missed !"))
        }


        if (!balance || balance < parseFloat(amount)) {
            return res.redirect(301, referer.concat("?message=Transfer amount is greater than your balance !"))

        }


        return next();

    } catch (err) {
        next(err);
    }
}