import express from "express";
import { v4 as uuidV4 } from "uuid";
import { addToContext, getFromContext } from "../utils/request-context";

export function getCorrelationId(req: express.Request): string {
    const correlationId = getFromContext(req, "$.context.correlationId");
    if (!correlationId) {
        addToContext(req, "$.context.correlationId", uuidV4());
        return getFromContext(req, "$.context.correlationId");
    }
    return correlationId;
}