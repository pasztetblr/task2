/**
 * @file   This file defines a client class
 * @author Alamega
 * @since  1.0.0
 *
 * @namespace Product
 */

import productsRepo from './product.memory.repository';
import ordersRepo from '../orders/order.memory.repository';
import { TProductModel, TProduct } from './product.type';

/**
 * Get all products
 * @returns {Promise<TProductModel[]>} - array of products
 */
const getAll = async (): Promise<TProductModel[]> => productsRepo.getAll();

/**
 * Product return by id
 * @param id - id product
 * @returns {Promise<?TProductModel>} - return product object or null
 */
const getById = async (id: string): Promise<TProductModel | null> => productsRepo.getById(id);

/**
 * Create products
 * @param {TProduct} product - new product parameters
 * @returns {Promise<TProductModel>} - return new product object
 */
const createProduct = async (product: TProduct): Promise<TProductModel> =>
  productsRepo.createProduct(product);

/**
 * Delete product; Removing orders with this product
 * @param id - product id
 * @returns {Promise<?TProductModel>} - return product object or null
 */
const deleteById = async (id: string): Promise<TProductModel | null> => {
  const productDeletable = await getById(id);
  productsRepo.deleteById(id);
  ordersRepo.removeByProductId(id);
  return productDeletable;
};

/**
 * Update product by id
 * @param {TClientModel} product - params for product update
 * @returns {Promise<?TClientModel>} - return product object or null
 */
const updateById = async (client: TProductModel): Promise<TProductModel | null> =>
  productsRepo.updateById(client);

export default { getAll, getById, createProduct, deleteById, updateById };
