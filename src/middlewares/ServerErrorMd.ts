import { Request, Response, NextFunction } from 'express'

export function useServerErrorMd(err: any, req: Request, res: Response, next: NextFunction) {
    if (err) {
        res.setHeader('Error', err.message);
        return res.render('pages.500', { message: err.message });
    }

    return next()
}