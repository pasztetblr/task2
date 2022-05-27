export interface TOrder {
  orderNumber: number;
  numbers: number;
  clientId: string | null;
  productsId: string | null;
}

export interface TOrderModel extends TOrder {
  id: string;
}
