import { Request, Response, NextFunction } from "express";

import { UserInfo } from '../../src/shared/redux/modules/userInfo';
import adminApp from '../modules/firebaseAdmin';
import { FetchrRequestBody } from '../'
import BFFConst from "../../src/shared/modules/const";

/**
 * ログイン要求の場合はクッキーを挿入する
 * */
const storeTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const body: FetchrRequestBody<UserInfo> = req.body;
  if (body.requests.g0.resource !== BFFConst.LOGIN_SERVICE) { return next(); }
  const expiresIn = 60 * 6 * 1000;
  const cookieOption = {
    maxAge: expiresIn,
    httpOnly: true,
  };

  const idToken = body.requests.g0.body.idToken;
  if (!idToken) return next();
  const serviceName = body.requests.g0.resource;
  const sessionCookie = await adminApp.auth().createSessionCookie(idToken, { expiresIn });
  res.cookie(BFFConst.TOKEN_COOKIE, sessionCookie);
  next();
}

export default storeTokenMiddleware;
