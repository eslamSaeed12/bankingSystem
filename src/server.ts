import { app } from './main'
import { env } from './utils/env'


app.listen(env('PORT'), () => {
    console.log('app is run at ', env('PORT'));
});