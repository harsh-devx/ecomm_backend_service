
import express from "express";
import { adminAuthMiddleware } from "../middlewares/auth";
import { adminService } from "../services/AdminService";
import { getCorrelationId } from "../middlewares/correlationIdMiddleware";

const router = express.Router();


router.post("/generate-discount-code", adminAuthMiddleware, async (req, res) => {
    const correlationId = getCorrelationId(req);

    try {
        const discountCode = await adminService.generateDiscountCodeIfEligible();
        if (discountCode) {
            res.status(201).json({ message: "Discount code generated", discountCode, correlationId });
            return;
        } else {
            res.status(200).json({ message: "Discount code generation condition not met", correlationId });
            return;
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message, correlationId });
    }
});

router.get("/orders-analytics", adminAuthMiddleware, async (req, res) => {

    const correlationId = getCorrelationId(req);

    try {

        const orders = await adminService.getOrders();
        const itemCount = orders.reduce((acc, order) => {
            return acc + order.cart.items.reduce((itemAcc, item) => itemAcc + item.quantity, 0);
        }, 0);
        const totalAmount = orders.reduce((acc, order) => acc + order.orderValue, 0);
        const discountCodes = orders.map(order => order.discountDetails?.code).filter(code => code !== undefined);
        const totalDiscountAmount = orders.reduce((acc, order) => acc + (order.discountValue || 0), 0);

        const summary = {
            totalOrders: orders.length,
            itemCount,
            totalAmount,
            discountCodes,
            totalDiscountAmount
        };

        res.status(200).json({ summary, correlationId });
    } catch (error: any) {
        res.status(500).json({ message: error.message, correlationId });
    }
});

export default router;
