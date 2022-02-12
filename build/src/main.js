"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importStar(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const main_ctr_1 = require("./controllers/main.ctr");
const path_1 = require("path");
const env_1 = require("./utils/env");
const checkCustomerBalanceMd_1 = require("./middlewares/checkCustomerBalanceMd");
const ServerErrorMd_1 = require("./middlewares/ServerErrorMd");
// constructing express instance 
const app = (0, express_1.default)();
exports.app = app;
app.set('trust proxy', 1);
// setting configs
const { config, engine } = require('express-edge');
config({ cahce: (0, env_1.env)('NODE_ENV') === 'production' });
app.set('views', `${(0, path_1.join)(__dirname, 'views')}`);
app.set('view engine', 'edge');
// REGISTER MIDDLEWARES
app.use(engine);
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use((0, express_1.static)('public'));
// REGISTER ROUTES
app.get('/', main_ctr_1.homeAction);
app.get('/customers', main_ctr_1.customersAction);
app.get('/customer/:id', main_ctr_1.customerAction);
app.post('/transfer', checkCustomerBalanceMd_1.useCheckCustomerBalanceMd, main_ctr_1.transferAction);
//  a route dispatched when a user dispatch a non exist route
app.use(ServerErrorMd_1.useServerErrorMd);
app.use(main_ctr_1.notFoundAction);
