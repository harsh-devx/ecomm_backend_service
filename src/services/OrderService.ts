
import { EmptyCartError } from "../error/CartError";
import type { Order, Orders } from "../models/Order";
import { cartService } from "./CartService";

class OrderService {
    private orders: Orders = []

    async createOrder(discountId?: string): Promise<Order> {
        const orderId = `order-${Date.now()}`;
        const cart = cartService.getCart();

        if (cart.items.length === 0) {
            throw new EmptyCartError();
        }


        const order: Order = {
            cart: cart,
            orderId,
            orderValue: cart.totalCartValue,
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
