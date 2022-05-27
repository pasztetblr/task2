export interface TClient {
  fullName: string;
  address: string;
  numberPhone: number;
  bonusCard: boolean;
}

export interface TClientModel extends TClient {
  id: string;
}
