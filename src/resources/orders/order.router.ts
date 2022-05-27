import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';

import Order from './order.model';
import ordersService from './order.service';
import catchErrors from '../../common/catchErrors';

const router = Router({ mergeParams: true });

router.route('/').get(
  catchErrors(async (_req: Request, res: Response) => {
    const orders = await ordersService.getAll();

    res.json(orders.map(Order.toResponse));
  }),
);

router.route('/').post(
  catchErrors(async (req: Request, res: Response) => {
    const { orderNumber, numbers, clientId, productsId } = req.body;
    const order = await ordersService.createOrder({
      orderNumber,
      numbers,
      clientId,
      productsId,
    });
    if (order) {
      res.status(StatusCodes.CREATED).json(Order.toResponse(order));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'BAD_REQUEST', msg: 'Bad request' });
    }
  }),
);

router.route('/:id').get(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const order = await ordersService.getById(id || '');

    if (order) {
      res.json(Order.toResponse(order));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'ORDER_NOT_FOUND', msg: 'Order not found' });
    }
  }),
);

router.route('/:id').put(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { orderNumber, numbers, clientId, productsId } = req.body;

    const order = await ordersService.updateById({
      id: id || '',
      orderNumber,
      numbers,
      clientId,
      productsId,
    });

    if (order) {
      res.status(StatusCodes.OK).json(Order.toResponse(order));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'ORDER_NOT_FOUND', msg: 'Order not found' });
    }
  }),
);

router.route('/:id').delete(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const order = await ordersService.deleteById(id || '');

    if (order) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'ORDER_DELETED', msg: 'The order has been deleted' });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'ORDER_NOT_FOUND', msg: 'Order not found' });
    }
  }),
);

export default router;
