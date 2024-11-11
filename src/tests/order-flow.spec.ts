import { cartService } from "../services/CartService";
import { orderService } from "../services/OrderService";
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
});