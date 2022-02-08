import { config } from 'dotenv'
import { app } from './main'
import { env } from './utils/env'
config()
app.listen(env('PORT'), () => {
    console.log('app is run at ', env('PORT'));
});