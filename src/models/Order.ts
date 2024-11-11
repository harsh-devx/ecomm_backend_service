import type { Cart } from "./Cart";
import type { DiscountCodeType } from "./DiscountCode";

export interface Order {
    cart: Cart;
    discountDetails?: DiscountCodeType,
    discountValue?: number,
    orderValue: number,
    orderId: string,
}

export type Orders = Order[];
