import Order from './order.model';
import { TOrder, TOrderModel } from './order.type';

const ORDERS: TOrderModel[] = [];

const getAll = async (): Promise<TOrderModel[]> => ORDERS;

const getById = async (id: string): Promise<TOrderModel | null> =>
  ORDERS.find((order) => order.id === id) || null;

const createOrder = async ({
  orderNumber,
  numbers,
  clientId,
  productsId,
}: TOrder): Promise<TOrderModel> => {
  const order = new Order({
    orderNumber,
    numbers,
    clientId,
    productsId,
  });
  ORDERS.push(order);
  return order;
};

const deleteById = async (id: string): Promise<TOrderModel | null> => {
  const boardPosition = ORDERS.findIndex((order) => order.id === id);

  if (boardPosition === -1) return null;

  const orderDeletable = ORDERS[boardPosition]!;

  ORDERS.splice(boardPosition, 1);
  return orderDeletable;
};

const updateById = async ({
  id,
  ...payload
}: Partial<TOrderModel>): Promise<TOrderModel | null> => {
  const orderPosition = ORDERS.findIndex((order) => order.id === id);

  if (orderPosition === -1) return null;

  const oldOrder = ORDERS[orderPosition]!;
  const newOrder = { ...oldOrder, ...payload };

  ORDERS.splice(orderPosition, 1, newOrder);
  return newOrder;
};

const removeByClientId = async (id: string) => {
  const clientOrders = ORDERS.filter((order) => order.clientId === id);
  await Promise.allSettled(clientOrders.map(async (order) => deleteById(order.id)));
};

const removeByProductId = async (id: string) => {
  const productOrders = ORDERS.filter((order) => order.productsId === id);
  await Promise.allSettled(productOrders.map(async (order) => deleteById(order.id)));
};

export default {
  ORDERS,
  getAll,
  getById,
  createOrder,
  deleteById,
  updateById,
  removeByClientId,
  removeByProductId,
};
