export interface ShoppingItem {
  id: string;
  name: string;
  shop: string;
  shopId: string;
  quantity: number;
  completed: boolean;
  createdAt: Date;
}

export interface Shop {
  id: string;
  name: string;
}