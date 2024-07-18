import cors, { CorsOptionsDelegate } from 'cors';

import env from '@/env';

export default () => {
  const whitelist = env.CORS_WHITELIST.split(',');
  const corsOptionsDelegate: CorsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (req.headers.origin && whitelist.indexOf(req.headers.origin) !== -1) {
      corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
  };
  return cors(corsOptionsDelegate);
};
