import { cartService } from "../services/CartService";

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
});