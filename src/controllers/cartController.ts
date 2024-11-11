import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { cartService } from "../services/CartService";
import { getCorrelationId } from "../middlewares/correlationIdMiddleware";

export async function addItem(req: Request, res: Response) {
    const correlationId = getCorrelationId(req);

    try {
        const { productId, quantity } = req.body;
        await cartService.addItem(productId, quantity);
        logger.info("Item added to cart", { correlationId });
        res.status(200).json({ correlationId, message: "Item added to cart" });
    } catch (error: any) {
        logger.error("Error adding item to cart", { correlationId });
        res.status(500).json({ correlationId, error: error.message });
    }
}
