const express = require('express');
const app = express();
const knex = require('./database/db');
const bodyparser = require('body-parser');
const router = express.Router();
app.use(bodyparser.json());


// // router for departments
app.use('/department',router);
require('./routers/department')(router,knex)

// //  router for catagory
app.use('/catagories',router);
require('./routers/catagory')(router,knex)

// // router for attributes
app.use('/attributes',router)
require('./routers/attributes')(router,knex)

// // router for products
app.use('/products',router)
require('./routers/products')(router,knex)

// // router for customers
app.use('/customer',router)
require('./routers/customers')(router,knex)

// //router for shopping cart
app.use('/shoppingcart',router)
require('./routers/shoppingcart')(router,knex)

// // router for orders
app.use('/orders',router)
require('./routers/orders')(router,knex)

// // router for tax
app.use('/tax',router)
require('./routers/tax')(router,knex)


// // router for tax
app.use('/shipping',router)
require('./routers/shipping')(router,knex)

app.listen(1440,()=>{
    console.log("port is working!!");
});