const  express  = require("express");
const bodyParser = require('body-parser');
const app = express();
const userRoute = require('./app/routes/userRoute');
const addressRoute = require('./app/routes/addressRoute');
const shopRoute = require('./app/routes/shopRoute');
const productRoute = require('./app/routes/productRoute');

require('dotenv').config();
require('./app/config/db.config');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



const port = process.env.PORT || 5000;

app.use('/api/user', userRoute);
app.use('/api/address', addressRoute);
app.use('/api/shop', shopRoute);
app.use('/api/product', productRoute);


app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});

