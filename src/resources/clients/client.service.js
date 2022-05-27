const clientsRepo = require('./client.memory.repository');
const ordersRepo = require('../orders/order.memory.repository');

const getAll = () => clientsRepo.getAll();

const getById = (id) => clientsRepo.getById(id);

const createClient = ({ fullName, address, numberPhone, bonusCard }) => clientsRepo.createClient({ fullName, address, numberPhone, bonusCard });

const deleteById = async (id) => {
  const userDeletable = await getById(id);
  clientsRepo.deleteById(id);
  ordersRepo.removeByClientId(id);
  return userDeletable;
};

const updateById = ({ id, fullName, address, numberPhone, bonusCard }) => clientsRepo.updateById({ id, fullName, address, numberPhone, bonusCard });

module.exports = { getAll, getById, createClient, deleteById, updateById };