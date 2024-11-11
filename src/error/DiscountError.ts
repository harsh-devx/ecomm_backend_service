import { BaseError } from "./BaseError";

export class DiscountError extends BaseError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class InvalidDiscountError extends DiscountError {
    constructor() {
        super("Invalid discount code provided.");
    }
}

export class DiscountUsedError extends DiscountError {
    constructor() {
        super("The discount code has already been used.");
    }
}

export class DiscountExpiredError extends DiscountError {
    constructor() {
        super("The discount code has expired.");
    }
}
