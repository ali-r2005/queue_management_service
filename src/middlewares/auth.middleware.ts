import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { MyUserPayload } from "@/types/jwt";
import { userStaff } from "@/types/user";

export default function authMiddleware (req: Request, res: Response, next: NextFunction) {
    // const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }
    // const token = authHeader.split(" ")[1];
    // if (!token) {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }
    
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error("JWT_SECRET is not defined in environment variables");
        return res.status(500).json({ message: "Server configuration error" });
    }
    
    try {
        // const decoded = jwt.verify(token, jwtSecret) as MyUserPayload;
        //add dummy data for testing
        const decoded: MyUserPayload = userStaff;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
