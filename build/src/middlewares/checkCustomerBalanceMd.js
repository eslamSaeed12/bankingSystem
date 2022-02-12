"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCheckCustomerBalanceMd = void 0;
const typeorm_1 = require("typeorm");
const customer_1 = require("../db/models/customer");
// if sender balance less than amount he want to transfer redirect him to the page with error msg
const useCheckCustomerBalanceMd = async (req, res, next) => {
    try {
        const { amount, senderId } = req.body;
        const { balance } = await (0, typeorm_1.getRepository)(customer_1.Customer).findOneOrFail(senderId);
        const referer = req.headers.referer ?? '/customer/' + senderId;
        if (!amount) {
            return res.redirect(301, referer.concat("?message=Transfer amount is missed !"));
        }
        if (!balance || balance < parseFloat(amount)) {
            return res.redirect(301, referer.concat("?message=Transfer amount is greater than your balance !"));
        }
        return next();
    }
    catch (err) {
        next(err);
    }
};
exports.useCheckCustomerBalanceMd = useCheckCustomerBalanceMd;
