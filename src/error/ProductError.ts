
import { BaseError } from "./BaseError";

export class ProductNotFoundError extends BaseError {
    constructor(productId: string) {
        super(`Product with ID ${productId} not found`, 404);
        this.name = "ProductNotFoundError";
    }
}

export class ProductOutOfStockError extends BaseError {
    constructor(productId: string, availableStock: number) {
        super(`Product with ID ${productId} is out of stock. Available stock: ${availableStock}`, 400);
        this.name = "ProductOutOfStockError";
    }
}

