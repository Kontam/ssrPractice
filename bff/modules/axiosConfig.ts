import axiosFactory from 'axios';
import jwt from 'jsonwebtoken';

import BFFConst from '../../src/shared/modules/const';

if (!BFFConst.API_KEY) console.error("you must provide environment variable API_KEY");
if (!BFFConst.API_SECRET) console.error("you must provide environment variable API_SECRET");

const apiKey = jwt.sign(BFFConst.API_KEY || "", BFFConst.API_SECRET || ""); 

const axios = axiosFactory.create({
    baseURL: BFFConst.BACKEND_BASE_URL,
    timeout: 20000,
    headers: {
      'X-Api-Key': apiKey, 
    },
});

export default axios;
