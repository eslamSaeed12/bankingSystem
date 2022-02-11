import express, { static as _static } from 'express'
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { homeAction, customersAction, transferAction, customerAction, notFoundAction } from './controllers/main.ctr';
import { join } from 'path'
import { env } from './utils/env';
import { useCheckCustomerBalanceMd } from './middlewares/checkCustomerBalanceMD';
import { useServerErrorMd } from './middlewares/ServerErrorMd';



// constructing express instance 
const app = express();

// setting configs
const { config, engine } = require('express-edge');

config({ cahce: env('NODE_ENV') === 'production' })

app.set('views', `${join(__dirname, 'views')}`);

app.set('view engine', 'edge');


// REGISTER MIDDLEWARES
app.use(engine)
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(_static('public'))

// REGISTER ROUTES
app.get('/', homeAction);
app.get('/customers', customersAction);
app.get('/customer/:id', customerAction);
app.post('/transfer', useCheckCustomerBalanceMd, transferAction);
//  a route dispatched when a user dispatch a non exist route
app.use(useServerErrorMd);
app.use(notFoundAction);

// error route dispatched when there is an error happend



// exporting app to be testable
export { app };