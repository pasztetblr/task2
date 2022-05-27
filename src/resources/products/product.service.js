const productsRepo = require('./product.memory.repository');
const ordersRepo = require('../orders/order.memory.repository');

const getAll = () => productsRepo.getAll();

const getById = (id) => productsRepo.getById(id);

const createProduct = ({ name, price, ageOfIssue, lifeTime }) => productsRepo.createProduct({ name, price, ageOfIssue, lifeTime });

const deleteById = async (id) => {
  const userDeletable = await getById(id);
  productsRepo.deleteById(id);
  ordersRepo.removeByProductId(id);
  return userDeletable; 
};

const updateById = ({ id, name, price, ageOfIssue, lifeTime }) => productsRepo.updateById({ id, name, price, ageOfIssue, lifeTime });

module.exports = { getAll, getById, createProduct, deleteById, updateById };