import { Request, Response } from 'express';
import { UserInfo } from '../../src/shared/redux/modules/userInfo';
import BFFConst from '../const';
import { Login } from '../../src/shared/redux/modules/login';


/**
 * ログインリクエストでcookieのTokenが使用できなかった時に動作する
 * トークンを削除する
 * */
const loginResponseFormatter = (req: Request, res: Response, data:Login) => {
  if (!data.loggedIn) {
    //res.clearCookie(BFFConst.TOKEN_COOKIE);
  }
};

export default loginResponseFormatter;
