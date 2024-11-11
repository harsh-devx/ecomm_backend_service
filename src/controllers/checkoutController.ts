import type { Request, Response } from "express";
import { orderService } from "../services/OrderService";
import { getCorrelationId } from "../middlewares/correlationIdMiddleware";

export async function checkout(req: Request, res: Response) {
    const correlationId = getCorrelationId(req);
    try {
        const { discountId } = req.body;

        const order = await orderService.createOrder(discountId);
        console.info("Checkout successful", { correlationId, order });
        res.status(200).json({ correlationId, order });
    } catch (error: any) {
        console.error("Error during checkout", { correlationId });
        res.status(500).json({ correlationId, error: error.message });
    }
}