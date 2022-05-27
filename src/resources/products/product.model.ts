/**
 * @file   This file defines a product class
 * @author Alamega
 * @since  1.0.0
 *
 * @namespace Product
 */

import { v4 as uuid } from 'uuid';
import { TProductModel } from './product.type';

/** Class representing a Client model */
class Product {
  /**
   * Creates a user instance
   * @param {TProductModel} product - product Object
   */
  id: string;
  name: string;
  price: number;
  ageOfIssue: number;
  lifeTime: number;
  constructor({
    id = uuid(),
    name = 'Сырная пицца с сыром',
    price = 199.9,
    ageOfIssue = 0,
    lifeTime = 15,
  } = {}) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.ageOfIssue = ageOfIssue;
    this.lifeTime = lifeTime;
  }

  /**
   * Return static data for product
   * @param {TProductModel} product passing the product object
   * @returns {TProductModel} product parameters
   */
  static toResponse(product: TProductModel) {
    const { id, name, price, ageOfIssue, lifeTime } = product;
    return { id, name, price, ageOfIssue, lifeTime };
  }
}

export default Product;
