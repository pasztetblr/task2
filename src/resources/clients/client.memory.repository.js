const Client = require('./client.model');

const Clients = [
  new Client({ fullName: 'Alamega', address: 'Minsk', numberPhone: 375251234567, bonusCard: false }),
];

const getAll = async () => Clients;

const getById = async (id) => Clients.find((client) => client.id === id);

const createClient = async ({ id, fullName, address, numberPhone, bonusCard }) => {
  const client = new Client({ id, fullName, address, numberPhone, bonusCard });
  Clients.push(client);
  return client;
};

const deleteById = async (id) => {
  const clientPosition = Clients.findIndex((client) => client.id === id);

  if (clientPosition === -1) return null;

  const clientDeletable = Clients[clientPosition];

  Clients.splice(clientPosition, 1);
  return clientDeletable;
};

const updateById = async ({ id, fullName, address, numberPhone, bonusCard }) => {
  const clientPosition = Clients.findIndex((client) => client.id === id);

  if (clientPosition === -1) return null;

  const oldclient = Clients[clientPosition];
  const newclient = { ...oldclient, fullName, address, numberPhone, bonusCard };

  Clients.splice(clientPosition, 1, newclient);
  return newclient;
};

module.exports = {
  Clients,
  getAll,
  getById,
  createClient,
  deleteById,
  updateById,
};