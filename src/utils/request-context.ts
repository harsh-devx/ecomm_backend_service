import express from "express";
import jp from "jsonpath";


class ContextAlreadySetError extends Error {
    constructor(path: string) {
        super(`context value already set for path: ${path}`);
    }
}

export function getFromContext(req: express.Request, path: string): any {
    if (!path.startsWith("$")) {
        path = `$.context.${path}`;
    }

    return jp.value(req, path);
}

export function addToContext(req: express.Request, path: string, value: any) {
    if (!path.startsWith("$")) {
        path = `$.context.${path}`;
    }

    const existingValue = getFromContext(req, path);
    if (existingValue) {
        throw new ContextAlreadySetError(path);
    }

    jp.value(req, path, value);
}
