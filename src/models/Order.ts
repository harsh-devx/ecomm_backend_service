import type { Cart } from "./Cart";

export interface Order {
    cart: Cart;
    orderValue: number,
    orderId: string,
}

export type Orders = Order[];
