import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import Product from './product.model';

import productsService from './product.service';
import catchErrors from '../../common/catchErrors';

const router = Router();

router.route('/').get(
  catchErrors(async (_req: Request, res: Response) => {
    const users = await productsService.getAll();

    res.json(users.map(Product.toResponse));
  }),
);

router.route('/').post(
  catchErrors(async (req: Request, res: Response) => {
    const { name, price, ageOfIssue, lifeTime } = req.body;
    const product = await productsService.createProduct({ name, price, ageOfIssue, lifeTime });

    if (product) {
      res.status(StatusCodes.CREATED).json(Product.toResponse(product));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'PRODUCT_NOT_CREATE', msg: 'Product not create' });
    }
  }),
);

router.route('/:id').get(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await productsService.getById(id || '');

    if (product) {
      res.json(Product.toResponse(product));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'PRODUCT_NOT_FOUND', msg: 'Product not found' });
    }
  }),
);

router.route('/:id').put(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price, ageOfIssue, lifeTime } = req.body;

    const product = await productsService.updateById({
      id: id || '',
      name,
      price,
      ageOfIssue,
      lifeTime,
    });

    if (product) {
      res.status(StatusCodes.OK).json(Product.toResponse(product));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'PRODUCT_NOT_FOUND', msg: 'Product not found' });
    }
  }),
);

router.route('/:id').delete(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await productsService.deleteById(id || '');

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'PRODUCT_NOT_FOUND', msg: 'Product not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'PRODUCT_DELETED', msg: 'The product has been deleted' });
  }),
);

export default router;
