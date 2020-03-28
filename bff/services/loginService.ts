import axios from '../modules/axiosConfig';
import { Request } from 'express';
import { UserInfo } from '../../src/shared/redux/modules/userInfo';
import BFFConst from '../const';
import firebaseAdmin from '../modules/firebaseAdmin';
import { AxiosRequestConfig } from 'axios';
import { SMCCookies } from '../index';
import adminApp from '../modules/firebaseAdmin';


export default {
  name: BFFConst.LOGIN_SERVICE,
  create: async (req: Request, resource: any, params: any, body: UserInfo, config: any, callback: any) => {
    const meta = {
      headers: {},
      statusCode: 200,
    };
    const errorMeta = {
      headers: {},
      statusCode: 403,
    }
    if (!body) { console.log("loginService", "nobody"); return callback(null, "request without payload", errorMeta);}
    if (!body.idToken && !body.cookieToken) callback(null, "invalid request", errorMeta);
    if (body.idToken) { // CSR
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(body.idToken);
    } else if (body.cookieToken) { // SSR
      const decodedToken = await firebaseAdmin.auth().verifySessionCookie(body.cookieToken);
    }
    
    const axiosParams: AxiosRequestConfig = { params: {
      email: body.email,
    } };
    const result = await axios.get(BFFConst.API_AUTHORITY, axiosParams);
    console.log("loginService", result.data);
    callback(null, result.data, meta); 
  }
}
