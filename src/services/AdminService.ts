
import type { Orders } from "../models/Order";
import { DiscountType } from "../utils/constants";
import { discountService } from "./DiscountService";
import { orderService } from "./OrderService";

class AdminService {
    private nthOrder = 3;

    async getOrders(): Promise<Orders> {
        return orderService.getAllOrders();
    }

    async generateDiscountCodeIfEligible(): Promise<string | null> {

        const orderCount = orderService.getAllOrders().length;

        if (orderCount && orderCount % (this.nthOrder - 1) === 0) {

            const discountId = await discountService.generateDiscountCode(DiscountType.TEN_PERCENT);
            return discountId;
        }

        return null;
    }
}

export const adminService = new AdminService();
