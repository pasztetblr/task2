const { v4: uuid } = require('uuid');

class Client {
  constructor({ id = uuid(), fullName = 'Alamega', address = 'Minsk', numberPhone = 375251234567, bonusCard = false } = {}) {
    this.id = id;
    this.fullName = fullName;
    this.address = address;
    this.numberPhone = numberPhone;
    this.bonusCard = bonusCard;
  }

  static toResponse(client) {
    const { id, fullName, address, numberPhone, bonusCard } = client;
    return { id, fullName, address, numberPhone, bonusCard };
  }
}

module.exports = Client;
