"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundAction = exports.customerAction = exports.transferAction = exports.customersAction = exports.homeAction = void 0;
const typeorm_1 = require("typeorm");
const customer_1 = require("../db/models/customer");
const transfer_1 = require("../db/models/transfer");
function homeAction(req, res, next) {
    try {
        res.render('pages.home');
    }
    catch (err) {
        next(err);
    }
}
exports.homeAction = homeAction;
async function customersAction(req, res, next) {
    try {
        const customers = await (0, typeorm_1.getRepository)(customer_1.Customer).find();
        res.render('pages.customers', { customers });
    }
    catch (err) {
        next(err);
    }
}
exports.customersAction = customersAction;
async function transferAction(req, res, next) {
    try {
        const { senderId, receiverId, amount } = req.body;
        const sender = await (0, typeorm_1.getRepository)(customer_1.Customer).findOneOrFail(senderId);
        const receiver = await (0, typeorm_1.getRepository)(customer_1.Customer).findOneOrFail(receiverId);
        await (0, typeorm_1.getRepository)(customer_1.Customer).update(sender.id, {
            balance: (sender.balance) - parseFloat(amount)
        });
        await (0, typeorm_1.getRepository)(customer_1.Customer).update(receiver.id, {
            balance: (sender.balance) + parseFloat(amount)
        });
        await (0, typeorm_1.getRepository)(transfer_1.Trasnfer).insert({
            amount: parseFloat(amount), senderId: parseInt(senderId), receiverId: parseInt(receiverId)
        });
        res.redirect('/customers', 200);
    }
    catch (err) {
        next(err);
    }
}
exports.transferAction = transferAction;
async function customerAction(req, res, next) {
    try {
        const { id } = req.params;
        const { message } = req.query;
        const customer = await (0, typeorm_1.getRepository)(customer_1.Customer).findOneOrFail(parseInt(id));
        if (!customer) {
            res.redirect('/404', 404);
            return;
        }
        const customres = await (0, typeorm_1.getRepository)(customer_1.Customer).find();
        res.render('pages.customer', { customer, customres, message });
    }
    catch (err) {
        next(err);
    }
}
exports.customerAction = customerAction;
async function notFoundAction(req, res, next) {
    try {
        res.render('pages/404', { location: req.url });
    }
    catch (err) {
        next(err);
    }
}
exports.notFoundAction = notFoundAction;
