import adminApp from '../modules/firebaseAdmin';
import { Middleware } from 'redux';

/**
 * 
 * */
const storeTokenMiddleware = (req: any, res: any, next: Function) => {
  // TODO: req.bodyからデータサービス名を引っこ抜いてログインの時はcookieを作る
  console.log(req.body.requests.g0.resource);
  console.log(req.body.requests.g0.body);
  res.cookie("test","testvalue");
  next();

}

export default storeTokenMiddleware;
