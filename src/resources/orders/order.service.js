const ordersRepo = require('./order.memory.repository');

const getAll = () => ordersRepo.getAll();
const getById = (id) => ordersRepo.getById(id);
const createOrder = ({ id, orderNumber, numbers, clientId, productsId }) => ordersRepo.createOrder({ id, orderNumber, numbers, clientId, productsId });
const deleteById = (id) => ordersRepo.deleteById(id);
const updateById = ({ id, orderNumber, numbers, clientId, productsId }) => ordersRepo.updateById({ id, orderNumber, numbers, clientId, productsId });

module.exports = { getAll, getById, createOrder, deleteById, updateById };