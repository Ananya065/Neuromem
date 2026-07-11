import { Request, Response } from "express";

export const healthCheck = (req: Request, res: Response): void => {
    res.status(200).json({
        success: true,
        message: "Neuromem Backend Running 🚀",
        version: "1.0.0"
    });
};