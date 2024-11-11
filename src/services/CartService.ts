
import { ProductNotFoundError, ProductOutOfStockError } from "../error/ProductError";
import type { Cart } from "../models/Cart";
import { STORE } from "../utils/constants";



export class CartService {
    private cart: Cart = {
        items: [],
        totalCartValue: 0
    }
    private orderCount = 0;

    addItem(productId: string, quantity: number) {
        const product = STORE[productId];

        if (!product) {
            throw new ProductNotFoundError(productId);
        }

        if (product.stock < quantity) {
            throw new ProductOutOfStockError(productId, product.stock);
        }

        const existingItem = this.cart.items.find((item) => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
            this.cart.totalCartValue += product.price * quantity;
        } else {
            this.cart.items.push({ productId, quantity, price: product.price });
            this.cart.totalCartValue += product.price * quantity;
        }

        product.stock -= quantity;

        return this.cart;
    }
    async checkout() {
        this.orderCount++;

        this.cart = {
            items: [],
            totalCartValue: 0
        };
    }

    getCartItems() {
        return this.cart.items;
    }

    getTotalCartValue() {
        return this.cart.totalCartValue;
    }

    getCart() {
        return this.cart;
    }
}

export const cartService = new CartService();
