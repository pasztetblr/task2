import { TClientModel, TClient } from './client.type';
import Client from './client.model';

const CLIENTS: TClientModel[] = [];

const getAll = async (): Promise<TClientModel[]> => CLIENTS;

const getById = async (id: string): Promise<TClientModel | null> =>
CLIENTS.find((client) => client.id === id) || null;

const createClient = async ({ fullName, address, numberPhone, bonusCard }: TClient): Promise<TClientModel> => {
  const user = new Client({ fullName, address, numberPhone, bonusCard });
  CLIENTS.push(user);
  return user;
};

const deleteById = async (id: string): Promise<TClientModel | null> => {
  const clientPosition = CLIENTS.findIndex((user) => user.id === id);

  if (clientPosition === -1) return null;

  const clientDeletable = CLIENTS[clientPosition];

  CLIENTS.splice(clientPosition, 1);
  return clientDeletable!;
};

const updateById = async ({ id, fullName, address, numberPhone, bonusCard }: TClientModel): Promise<TClientModel | null> => {
  const clientPosition = CLIENTS.findIndex((user) => user.id === id);

  if (clientPosition === -1) return null;

  const oldclient = CLIENTS[clientPosition];
  const newclient = { ...oldclient, fullName, address, numberPhone, bonusCard, id };

  CLIENTS.splice(clientPosition, 1, newclient);
  return newclient!;
};

export default {
  CLIENTS,
  getAll,
  getById,
  createClient,
  deleteById,
  updateById,
};