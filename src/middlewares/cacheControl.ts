import { NextFunction, Request, Response } from 'express';

/**
 * This sets the Cache-Control in Response header
 * @param {Number} age - Age of the Cache in minutes
 * @param {Boolean} noCache - Determines if Cache should be set or not
 */

export default (age: number, noCache = false) =>
  (_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Cache-Control', noCache ? `no-cache` : `max-age=${age * 60}`);
    next();
  };
