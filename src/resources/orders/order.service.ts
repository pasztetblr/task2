/**
 * @file   This file defines a task service
 * @author Alamega
 * @since  1.0.0
 *
 * @namespace Orders
 */

import ordersRepo from './order.memory.repository';
import { TOrder, TOrderModel } from './order.type';

/**
 * Get all tasks
 * @returns {Promise<TOrder>} - return order
 */
const getAll = async (): Promise<TOrderModel[]> => ordersRepo.getAll();

/**
 * Task return by id
 * @param id - id task
 * @returns {Promise<?TOrder>} - return order object or null
 */
const getById = async (id: string): Promise<TOrderModel | null> => ordersRepo.getById(id);

/**
 * Create orders
 * @param {TOrder} order - new order parameters
 * @returns {Promise<TOrder>} - return new order object
 */
const createOrder = async ({
  orderNumber,
  numbers,
  clientId,
  productsId,
}: TOrder): Promise<TOrderModel> =>
  ordersRepo.createOrder({
    orderNumber,
    numbers,
    clientId,
    productsId,
  });

/**
 * Delete order
 * @param id - TOrder id
 * @returns {Promise<?TOrder>} - return order object or null
 */
const deleteById = async (id: string): Promise<TOrderModel | null> => ordersRepo.deleteById(id);

/**
 * Update order
 * @param {TOrder} newBoard - params for order update
 * @returns {Promise<?TOrder>} - return order object or null
 */
const updateById = async (order: TOrderModel): Promise<TOrderModel | null> =>
  ordersRepo.updateById(order);

export default { getAll, getById, createOrder, deleteById, updateById };
