import { cartService } from "../services/CartService";
import { discountService } from "../services/DiscountService";
import { orderService } from "../services/OrderService";
import { DiscountType } from "../utils/constants";
import { logDetailedObject } from "../utils/tools";

describe('Order Flow Test', () => {

    let productId: string;
    let quantity: number;

    beforeAll(() => {
        productId = 'prod-001';
        quantity = 1;
    });


    test('Add item to cart', () => {

        cartService.addItem(productId, quantity);

        console.log('Updated Cart:', cartService.getCart());
        expect(cartService.getCart()).toHaveProperty('items');
        expect(cartService.getCart().items).toHaveLength(1);

        console.log('Item successfully added to cart.');

    });

    test('Checkout from cart', async () => {

        cartService.addItem(productId, quantity);

        const order = await orderService.createOrder();

        expect(order).toHaveProperty('orderId');
        expect(order).toHaveProperty('orderValue');

        logDetailedObject('Order successfully created:', order);
    });

    test('Generate discount and apply to cart', async () => {
        const discountId = await discountService.generateDiscountCode(DiscountType.TEN_PERCENT);

        console.log('Discount Id:', discountId);

        cartService.addItem(productId, quantity);

        const order3 = await orderService.createOrder(discountId!);

        console.log("Discount successfully applied to the order.");

        const totalBeforeDiscount = order3.cart.totalCartValue;
        const totalAfterDiscount = order3.orderValue;

        logDetailedObject('Order with discount:', order3);

        expect(totalAfterDiscount).toBeLessThan(totalBeforeDiscount);
    });
});