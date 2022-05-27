const Order = require('./order.model');

const Orders = [new Order()];

const getAll = async () => Orders;

const getById = async (id) => Orders.find((order) => order.id === id);

const createOrder = async ({ id, orderNumber, numbers, clientId, productsId }) => {
  const order = new Order({ id, orderNumber, numbers, clientId, productsId });
  Orders.push(order);
  return order;
};

const deleteById = async (id) => {
  const orderPosition = Orders.findIndex((order) => order.id === id);

  if (orderPosition === -1) return null;

  const orderDeletable = Orders[orderPosition];

  Orders.splice(orderPosition, 1);
  return orderDeletable;
};

const updateById = async ({ id, orderNumber, numbers, clientId, productsId }) => {
  const orderPosition = Orders.findIndex((order) => order.id === id);

  if (orderPosition === -1) return null;

  const oldOrder = Orders[orderPosition];
  const newOrder = { ...oldOrder, orderNumber, numbers, clientId, productsId };

  Orders.splice(orderPosition, 1, newOrder);
  return newOrder;
};

const removeByClientId = async (id) => {
  const clientOrders = Orders.filter((order) => order.clientId === id);
  await Promise.allSettled(clientOrders.map(async (order) => deleteById(order.id)));
};

const removeByProductId = async (id) => {
  const productOrders = Orders.filter((order) => order.productsId === id);
  await Promise.allSettled(productOrders.map(async (order) => deleteById(order.id)));
};

module.exports = {
  Orders,
  getAll,
  getById,
  createOrder,
  deleteById,
  updateById,
  removeByClientId,
  removeByProductId
};