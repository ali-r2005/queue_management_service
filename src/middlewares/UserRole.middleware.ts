import { Request, Response, NextFunction } from "express";
import { Role } from "../types/jwt";

export default function userRoleMiddleware (req: Request, res: Response, next: NextFunction, roles: Role[]) {
    const role = req.user?.role;
    if (!role) {
        return res.status(401).json({ message: "Unauthorized" });
    }   
    if (roles.includes(role)) {
        next();
    }
}
