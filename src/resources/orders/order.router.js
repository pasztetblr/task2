const { StatusCodes } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const Order = require('./order.model');

const ordersService = require('./order.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const tasks = await ordersService.getAll();
    res.json(tasks.map(Order.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { id, orderNumber, numbers, clientId, productsId } = req.body;
    const order = await ordersService.createOrder({ id, orderNumber, numbers, clientId, productsId });

    if (order) {
      res.status(StatusCodes.CREATED).json(Order.toResponse(order));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'BAD_REQUEST', msg: 'Bad request' });
    }
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const order = await ordersService.getById(id);

    if (order) {
      res.json(Order.toResponse(order));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'ORDER_NOT_FOUND', msg: 'Order not found' });
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { orderNumber, numbers, clientId, productsId } = req.body;

    const order = await ordersService.updateById({ id, orderNumber, numbers, clientId, productsId });

    if (order) {
      res.status(StatusCodes.OK).json(Order.toResponse(order));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'ORDER_NOT_FOUND', msg: 'Order not found' });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const order = await ordersService.deleteById(id);

    if (order) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'ORDER_DELETED', msg: 'The order has been deleted' });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'ORDER_NOT_FOUND', msg: 'Order not found' });
    }
  })
);

module.exports = router;