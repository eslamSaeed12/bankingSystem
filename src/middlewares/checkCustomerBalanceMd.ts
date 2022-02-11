import { NextFunction, Request, Response } from "express";
import { getCustomerBalance } from "../db/queries";



// if sender balance less than amount he want to transfer redirect him to the page with error msg
export const useCheckCustomerBalanceMd = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { amount, senderId } = req.body;

        const { balance } = await getCustomerBalance(senderId);

        const referer = req.headers.referer ?? '/customer/' + senderId;

        console.log(referer)
        
        if (!amount) {
            return res.redirect(referer.concat("?message=Transfer amount is missed !"))
        }


        if (!balance || parseFloat(balance) < parseFloat(amount)) {
            return res.redirect(referer.concat("?message=Transfer amount is greater than your balance !"))

        }


        return next();

    } catch (err) {
        next(err);
    }
}