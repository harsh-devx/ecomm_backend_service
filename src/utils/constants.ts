import type { Cart } from "../models/Cart";


export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
}

export const STORE: { [key: string]: Product } = {
    "prod-001": { id: "prod-001", name: "Laptop", price: 1000, stock: 10 },
    "prod-002": { id: "prod-002", name: "Smartphone", price: 500, stock: 20 },
    "prod-003": { id: "prod-003", name: "Headphones", price: 100, stock: 50 },
    "prod-004": { id: "prod-004", name: "Smartwatch", price: 150, stock: 30 },
    "prod-005": { id: "prod-005", name: "Tablet", price: 300, stock: 15 },
};

export enum DiscountType {
    TEN_PERCENT = "10_PERCENT",
    TWENTY_PERCENT = "20_PERCENT",
}


export const discountMapper: { [key in DiscountType]: (cart: Cart) => number } = {
    [DiscountType.TEN_PERCENT]: (cart: Cart) => {
        const total = cart.totalCartValue;
        return total * 0.1;
    },
    [DiscountType.TWENTY_PERCENT]: (cart: Cart) => {
        const total = cart.totalCartValue;
        return total * 0.2;
    },
};

