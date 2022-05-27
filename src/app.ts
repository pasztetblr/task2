import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import clientRouter from './resources/clients/client.router';
import productRouter from './resources/products/product.router';
import orderRouter from './resources/orders/order.router';

import { logging, errorHandling } from './middlewares';

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

app.use(logging);
app.use('/clients', clientRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use(errorHandling);

export default app;
