/**
 * @file   This file defines a task model
 * @author Alamega
 * @since  1.0.0
 *
 * @namespace Orders
 */

import { v4 as uuid } from 'uuid';

import { TOrderModel, TOrder } from './order.type';

/** Class representing a Order model */
class Order {
  /**
   * Creates a task instance
   * @param {TOrder} order - order Object
   */
  id: string;
  orderNumber: number;
  numbers: number;
  clientId: string | null;
  productsId: string | null;

  constructor({
    orderNumber = 0,
    numbers = 0,
    clientId = 'clientId',
    productsId = 'productsId',
  }: Partial<TOrder> = {}) {
    this.id = uuid();
    this.orderNumber = orderNumber;
    this.numbers = numbers;
    this.clientId = clientId;
    this.productsId = productsId;
  }

  /**
   * Return static data for order
   * @param {TOrder} order passing the order object
   * @returns {TOrder} - Order parameters
   */
  static toResponse(order: TOrderModel): TOrderModel {
    const { id, orderNumber, numbers, clientId, productsId } = order;
    return { id, orderNumber, numbers, clientId, productsId };
  }
}

export default Order;
