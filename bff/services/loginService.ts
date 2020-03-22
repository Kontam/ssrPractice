import axios from '../modules/axiosConfig';
import { UserInfo } from '../../src/shared/redux/modules/userInfo';
import BFFConst from '../const';

export default {
  name: BFFConst.LOGIN_SERVICE,
  create: async (req: Express.Request, resource: any, params: any, body: UserInfo, config: any, callback: any) => {
    const meta = {
      headers: {},
      statusCode: 200,
    };

    callback(null, "request succeed", meta); 
  }
}
