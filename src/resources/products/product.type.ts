export interface TProduct {
    name: string;
    price: number;
    ageOfIssue: number;
    lifeTime: number;
}
  
export interface TProductModel extends TProduct {
    id: string;
}