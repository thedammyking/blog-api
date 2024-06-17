import { Response } from 'express';

/**
 * This sets the Cache-Control in Response header
 * @param {Response} res - Express Response
 * @param {Number} age - Age of the Cache in minutes
 * @param {Boolean} noCache - Determines if Cache should be set or not
 */

export const setCacheHeader = (res: Response, age: number, noCache = false) => {
  res.setHeader('Cache-Control', noCache ? `no-cache` : `max-age=${age * 60}`);
};
