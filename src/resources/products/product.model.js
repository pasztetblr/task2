const { v4: uuid } = require('uuid');

class Product {
  constructor({ id = uuid(), name = 'Сырная пицца с сыром', price = 199.9, ageOfIssue = 0, lifeTime = 15  } = {}) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.ageOfIssue = ageOfIssue;
    this.lifeTime = lifeTime;
  }

  static toResponse(product) {
    const { id, name, price, ageOfIssue, lifeTime } = product;
    return { id, name, price, ageOfIssue, lifeTime };
  }
}

module.exports = Product;
