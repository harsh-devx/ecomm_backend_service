
import { EmptyCartError } from "../error/CartError";
import type { Order, Orders } from "../models/Order";
import { cartService } from "./CartService";
import { discountService } from "./DiscountService";

class OrderService {
    private orders: Orders = []

    async createOrder(discountId?: string): Promise<Order> {
        const orderId = `order-${Date.now()}`;
        const cart = cartService.getCart();

        if (cart.items.length === 0) {
            throw new EmptyCartError();
        }

        let discountDetails;
        let discountValue = 0;

        if (discountId) {
            const isValidDiscount = await discountService.validateDiscountCode(discountId);

            if (isValidDiscount) {
                discountValue = await discountService.evaluateDiscountCode(discountId, cart);
                discountService.useDiscountCode(discountId);
                discountDetails = await discountService.getDiscountDetails(discountId);
            }
        }

        const order: Order = {
            cart: cart,
            discountDetails,
            discountValue,
            orderId,
            orderValue: cart.totalCartValue - discountValue,
        };

        this.orders.push(order);
        await cartService.checkout();
        return order;
    }

    getOrderById(orderId: string): Order | undefined {
        return this.orders.find(order => order.orderId === orderId);
    }

    getAllOrders(): Orders {
        return this.orders;
    }
}

export const orderService = new OrderService();
