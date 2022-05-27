const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const clientRouter = require('./resources/clients/client.router');
const productRouter = require('./resources/products/product.router');
const orderRouter = require('./resources/orders/order.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/clients', clientRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

module.exports = app;
