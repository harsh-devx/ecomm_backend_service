import type { DiscountType } from "../utils/constants";
import type { Cart } from "./Cart";

export interface DiscountCodeType {
    id: string;
    expiresAt: Date;
    used: boolean;
    code: DiscountType
    eval: (cart: Cart) => number;
}
