import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    console.log("ssrLoger", req);
    console.log("res", res)
    next();
}
