import express, { static as _static } from 'express'
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { env } from './utils/env';
import { homeAction, customersAction, transferAction, customerAction, notFoundAction } from './controllers/main.ctr';
import { join } from 'path'

// constructing express instance 
const app = express();

// destructure express edge engine 
const { config, engine } = require('express-edge');

// setting configs
config({ cache: env('NODE_ENV') === 'production' });
app.use(engine);
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'edge')

// SETTING MIDDLEWARES 
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(_static('public'))

// SETTING ROUTES
app.get('/', homeAction);
app.get('/customers', customersAction);
app.get('/customer/:id', customerAction);
app.post('/transfer', transferAction);

//  a route dispatched when a user dispatch a non exist route
app.use(notFoundAction)


// exporting app to be testable
export { app };