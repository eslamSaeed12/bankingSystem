import express, { static as _static } from 'express'
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { homeAction, customersAction, transferAction, customerAction, notFoundAction } from './controllers/main.ctr';
import { join } from 'path'
import { env } from './utils/env';
import { useCheckCustomerBalanceMd } from './middlewares/checkCustomerBalanceMd';
import { useServerErrorMd } from './middlewares/ServerErrorMd';
import { useLocationHeader } from './middlewares/useLocationHeader';
import cookieParser from 'cookie-parser'
import csurf from 'csurf'
import timeout from 'connect-timeout'
import rateLimiter from 'express-rate-limit'

// constructing express instance 
const app = express();

app.set('trust proxy', 1)

// setting configs
const { config, engine } = require('express-edge');

config({ cahce: env('NODE_ENV') === 'production' })

app.set('views', `${join(process.cwd(), 'views')}`);

app.set('view engine', 'edge');


// REGISTER MIDDLEWARES
app.use(engine)
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(env('COOKIE_SEC')))
app.use(csurf({ cookie: true }))
app.use(helmet())
app.use(_static('public'))
app.use(useLocationHeader)
app.use(timeout('30s'));
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))

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