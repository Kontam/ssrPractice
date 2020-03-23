import axios from '../modules/axiosConfig';
import { UserInfo } from '../../src/shared/redux/modules/userInfo';
import BFFConst from '../const';
import firebaseAdmin from '../modules/firebaseAdmin';
import { AxiosRequestConfig } from 'axios';


export default {
  name: BFFConst.LOGIN_SERVICE,
  create: async (req: Express.Request, resource: any, params: any, body: UserInfo, config: any, callback: any) => {
    const meta = {
      headers: {},
      statusCode: 200,
    };
    const errorMeta = {
      headers: {},
      statusCode: 403,
    }
    if (!body.idToken) callback(null, "invalid request", errorMeta);
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(body.idToken);
    if (decodedToken.uid !== body.uid) callback(null, "invalid params", errorMeta);
    
    const axiosParams: AxiosRequestConfig = { params: {
      email: body.email,
    } };
    const result = await axios.get(BFFConst.API_AUTHORITY, axiosParams);

    callback(null, result.data, meta); 
  }
}
