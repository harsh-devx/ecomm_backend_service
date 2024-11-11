
import { v4 as uuidV4 } from "uuid";
import type { DiscountCodeType } from "../models/DiscountCode";
import { discountMapper, type DiscountType } from "../utils/constants";
import type { Cart } from "../models/Cart";
import { DiscountExpiredError, DiscountUsedError, InvalidDiscountError } from "../error/DiscountError";

class DiscountService {
    private discountCodes: { [code: string]: DiscountCodeType } = {};

    async generateDiscountCode(code: DiscountType) {
        const discountId = uuidV4();
        this.discountCodes[discountId] = {
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
            used: false,
            id: discountId,
            code: code,
            eval: discountMapper[code],
        }
        return discountId;
    }

    async validateDiscountCode(discountId: string) {
        const discountCode = this.discountCodes[discountId];

        if (!discountCode) {
            throw new InvalidDiscountError();
        }
        if (discountCode.used) {
            throw new DiscountUsedError();
        }
        if (discountCode.expiresAt < new Date()) {
            throw new DiscountExpiredError();
        }

        return true;
    }

    async evaluateDiscountCode(code: string, cart: Cart) {

        const discountCode = this.discountCodes[code];

        const discountValue = discountCode.eval(cart);
        return discountValue;
    }

    useDiscountCode(code: string) {
        if (this.discountCodes[code]) {
            this.discountCodes[code] = {
                ...this.discountCodes[code],
                used: true,
            }
        }
    }

    getDiscountCodes() {
        return this.discountCodes;
    }

    getDiscountDetails(code: string) {
        return this.discountCodes[code];
    }

    getTotalDiscounts() {
        return Object.keys(this.discountCodes).filter((code) => !this.discountCodes[code]).length;
    }
}

export const discountService = new DiscountService();
