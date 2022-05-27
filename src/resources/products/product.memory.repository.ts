import { TProductModel, TProduct } from './product.type';
import Product from './product.model';

const PRODUCTS: TProductModel[] = [];

const getAll = async (): Promise<TProductModel[]> => PRODUCTS;

const getById = async (id: string): Promise<TProductModel | null> =>
  PRODUCTS.find((product) => product.id === id) || null;

const createProduct = async ({
  name,
  price,
  ageOfIssue,
  lifeTime,
}: TProduct): Promise<TProductModel> => {
  const product = new Product({ name, price, ageOfIssue, lifeTime });
  PRODUCTS.push(product);
  return product;
};

const deleteById = async (id: string): Promise<TProductModel | null> => {
  const productPosition = PRODUCTS.findIndex((user) => user.id === id);

  if (productPosition === -1) return null;

  const productDeletable = PRODUCTS[productPosition];

  PRODUCTS.splice(productPosition, 1);
  return productDeletable!;
};

const updateById = async ({
  id,
  name,
  price,
  ageOfIssue,
  lifeTime,
}: TProductModel): Promise<TProductModel | null> => {
  const productPosition = PRODUCTS.findIndex((product) => product.id === id);

  if (productPosition === -1) return null;

  const oldProduct = PRODUCTS[productPosition];
  const newProduct = { ...oldProduct, name, price, ageOfIssue, lifeTime, id };

  PRODUCTS.splice(productPosition, 1, newProduct);
  return newProduct!;
};

export default {
  PRODUCTS,
  getAll,
  getById,
  createProduct,
  deleteById,
  updateById,
};
