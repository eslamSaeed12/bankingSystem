import { NextFunction, Request, Response } from "express";

export function useLocationHeader(req: Request, res: Response, next: NextFunction) {
    res.setHeader('location', req.url);
    next();
}