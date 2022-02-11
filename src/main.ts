import express, { static as _static } from 'express'
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { homeAction, customersAction, transferAction, customerAction, notFoundAction } from './controllers/main.ctr';
import { join } from 'path'
import edge from 'edge.js'
import { env } from './utils/env';



// constructing express instance 
const app = express();

// setting configs
const { config, engine } = require('express-edge');

config({ cahce: env('NODE_ENV') === 'production' })

app.set('views', `${join(__dirname, 'views')}`);

app.set('view engine', 'edge');


// SETTING MIDDLEWARES
app.use(engine)
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