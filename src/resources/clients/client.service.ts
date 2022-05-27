/**
 * @file   This file defines a client class
 * @author Alamega
 * @since  1.0.0
 *
 * @namespace Client
 */

import clientsRepo from './client.memory.repository';
import ordersRepo from '../orders/order.memory.repository';
import { TClientModel, TClient } from './client.type';

/**
 * Get all clients
 * @returns {Promise<TClientModel[]>} - array of clients
 */
const getAll = async (): Promise<TClientModel[]> => clientsRepo.getAll();

/**
 * Client return by id
 * @param id - id client
 * @returns {Promise<?TClientModel>} - return client object or null
 */
const getById = async (id: string): Promise<TClientModel | null> => clientsRepo.getById(id);

/**
 * Create clients
 * @param {TUser} client - new client parameters
 * @returns {Promise<TClientModel>} - return new client object
 */
const createClient = async (client: TClient): Promise<TClientModel> =>
  clientsRepo.createClient(client);

/**
 * Delete user; Removing clients orders
 * @param id - user id
 * @returns {Promise<?TClientModel>} - return user object or null
 */
const deleteById = async (id: string): Promise<TClientModel | null> => {
  const clientDeletable = await getById(id);
  clientsRepo.deleteById(id);
  ordersRepo.removeByClientId(id);
  return clientDeletable;
};

/**
 * Update client by id
 * @param {TClientModel} client - params for client update
 * @returns {Promise<?TClientModel>} - return client object or null
 */
const updateById = async (client: TClientModel): Promise<TClientModel | null> =>
  clientsRepo.updateById(client);

export default { getAll, getById, createClient, deleteById, updateById };
