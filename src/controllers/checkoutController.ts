import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { orderService } from "../services/OrderService";

export async function checkout(req: Request, res: Response) {
    const correlationId = req.headers['x-correlation-id'] as string;
    try {
        const { discountId } = req.body;

        const order = await orderService.createOrder(discountId);
        logger.info("Checkout successful", { correlationId, order });
        res.status(200).json({ correlationId, order });
    } catch (error: any) {
        logger.error("Error during checkout", { correlationId });
        res.status(500).json({ correlationId, error: error.message });
    }
}