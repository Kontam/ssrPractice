import axios from '../modules/axiosConfig';
import { Request } from 'express';
import { UserInfo } from '../../src/shared/redux/modules/userInfo';
import BFFConst from '../../src/shared/modules/const';
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
    const Auth = firebaseAdmin.auth();
    if (!body) { console.log("loginService", "nobody"); return callback(null, "request without payload", errorMeta);}
    if (!body.idToken && !body.cookieToken) callback(null, "invalid request", errorMeta);
    if (body.idToken) { // CSR
      const decodedToken = await Auth.verifyIdToken(body.idToken);
    } else if (body.cookieToken) { // SSR
      try {
        const decodedToken = await Auth.verifySessionCookie(body.cookieToken);
      } catch (error) {
        console.log("Cookie token expired"); 
        return callback(null, {loggledIn: false, authority: "none"}, meta);
      }
    }
    
    const axiosParams: AxiosRequestConfig = { params: {
      email: body.email,
    } };
    const result = await axios.get(BFFConst.API_AUTHORITY, axiosParams);
    callback(null, result.data, meta); 
  }
}
