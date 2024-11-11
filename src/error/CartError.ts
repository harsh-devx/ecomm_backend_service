import { BaseError } from "./BaseError";

export class CartError extends BaseError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class EmptyCartError extends CartError {
    constructor() {
        super("Cart is empty. Cannot create an order.");
    }
}


