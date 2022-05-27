const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const Product = require('./product.model');

const productsService = require('./product.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const products = await productsService.getAll();
    res.json(products.map(Product.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { name, price, ageOfIssue, lifeTime } = req.body;
    const product = await productsService.createProduct({ name, price, ageOfIssue, lifeTime });

    if (product) {
      res.status(StatusCodes.CREATED).json(Product.toResponse(product));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'PRODUCT_NOT_CREATE', msg: 'Product not create' });
    }
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const product = await productsService.getById(id);

    if (product) {
      res.json(Product.toResponse(product));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'PRODUCT_NOT_FOUND', msg: 'Product not found' });
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { fullName, address, numberPhone, bonusCard } = req.body;

    const product = await productsService.updateById({ id, fullName, address, numberPhone, bonusCard });

    if (product) {
      res.status(StatusCodes.OK).json(Product.toResponse(product));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'PRODUCT_NOT_FOUND', msg: 'Product not found' });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const product = await productsService.deleteById(id);

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'PRODUCT_NOT_FOUND', msg: 'Product not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'PRODUCT_DELETED', msg: 'The product has been deleted' });
  })
);

module.exports = router;