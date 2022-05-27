const { v4: uuid } = require('uuid');

class Order {
  constructor({ id = uuid(), orderNumber = 0, numbers = 0, clientId = 'clientId', productsId = 'productsId' } = {}) {
    this.id = id;
    this.orderNumber = orderNumber;
    this.numbers = numbers;
    this.clientId = clientId;
    this.productsId = productsId;
  }

  static toResponse(order) {
    const { id, orderNumber, numbers, clientId, productsId } = order;
    return { id, orderNumber, numbers, clientId, productsId };
  }
}

module.exports = Order;
