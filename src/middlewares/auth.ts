
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
    user?: string;
    exp: number;
};

export function adminAuthMiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Access denied. No token provided." });
        return;
    }

    try {
        const decoded = jwt.verify(token, (process.env.JWT_SECRET ?? "uniblox-jwt-secret") as string) as JwtPayload;
        const user = decoded.user;
        if (!user) {
            res.status(401).json({ message: "Access denied. Invalid token." });
            return;
        }

        res.locals.user = user;

        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token." });
    }
}
